import { Socket } from 'socket.io';
import { getDriver } from '../services/driver.service';
import { subscribe, unsubscribe } from '../services/pubsub.service';
import { verifyToken } from '../services/token.service';
import { CONFIG } from '../config';

export function handleClientSocket(socket: Socket) {
  const token = socket.handshake.auth?.token;
  const clientId = verifyToken(token);
  if (!clientId) {
    socket.emit('error', { code: 'UNAUTHORIZED', message: 'Invalid or expired token' });
    return socket.disconnect(true);
  }

  let subscribedDriverId: string | null = null;
  let interval: NodeJS.Timeout | null = null;
  let pubsubCallback: ((location: any) => void) | null = null;
  let offlineErrorTimeout: NodeJS.Timeout | null = null;

  const clearSubscriptions = () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    if (offlineErrorTimeout) {
      clearInterval(offlineErrorTimeout);
      offlineErrorTimeout = null;
    }
    if (subscribedDriverId && pubsubCallback) {
      unsubscribe(subscribedDriverId, pubsubCallback);
      pubsubCallback = null;
      subscribedDriverId = null;
    }
  };

  socket.on('subscribe', (driverId: string) => {
    // Clean up old subscriptions and intervals
    clearSubscriptions();

    const driver = getDriver(driverId);
    if (!driver) {
      return socket.emit('error', { errorCode: 'INVALID_DRIVER', errorMessage: 'Driver not found' });
    }

    subscribedDriverId = driverId;

    // Define pubsub callback and subscribe
    pubsubCallback = (location) => {
      socket.emit('location', {
        username: driverId,
        name: driver.name,
        lat: location.lat,
        long: location.long,
      });
    };
    subscribe(driverId, pubsubCallback);

    // Emit last known location every 5 seconds if fresh
    interval = setInterval(() => {
      const now = Date.now();

      if (!driver.lastUpdatedAt || now - driver.lastUpdatedAt > CONFIG.LOCATION_TTL_MS) {
        // Do nothing here; offline errors handled separately every minute
        return;
      }

      socket.emit('location', {
        username: driverId,
        name: driver.name,
        lat: driver.lastLocation!.lat,
        long: driver.lastLocation!.long,
      });
    }, 5000);

    // Emit OFFLINE_DRIVER error every 60 seconds if driver is offline
    offlineErrorTimeout = setInterval(() => {
      const now = Date.now();
      if (!driver.lastUpdatedAt || now - driver.lastUpdatedAt > CONFIG.LOCATION_TTL_MS) {
        socket.emit('error', {
          errorCode: 'OFFLINE_DRIVER',
          errorMessage: 'Driver has been offline for a while now',
          lastUpdate: driver.lastUpdatedAt || null,
        });
      }
    }, 60000);
  });

  socket.on('disconnect', () => {
    clearSubscriptions();
  });
}
