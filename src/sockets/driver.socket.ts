import { Socket } from 'socket.io';
import { verifyToken } from '../services/token.service';
import { updateLocation } from '../services/driver.service';
import { publish } from '../services/pubsub.service';
import { CONFIG } from '../config';

export function handleDriverSocket(socket: Socket) {
  let token = socket.handshake.auth?.token;
  let driverId = verifyToken(token);
  if (!driverId) return socket.disconnect(true);

  // Re-validate token every 5 minutes
  const tokenCheckInterval = setInterval(() => {
    const isValid = verifyToken(token);
    if (!isValid) {
      socket.emit('error', {
        errorCode: 'TOKEN_EXPIRED',
        errorMessage: 'Session expired. Please reconnect with a new token.',
      });
      socket.disconnect(true);
    }
  }, CONFIG.ACCESS_TOKEN_EXPIRY_MS);

  socket.on('disconnect', () => {
    clearInterval(tokenCheckInterval);
  });

  socket.on('location', (data) => {
    const { lat, long } = data;
    updateLocation(driverId, { lat, long, timestamp: Date.now() });
    publish(driverId, { lat, long });
  });
}