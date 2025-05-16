import { Server } from 'socket.io';
import { handleDriverSocket } from './driver.socket';
import { handleClientSocket } from './client.socket';

export function initSocket(server: any) {
  const io = new Server(server, { cors: { origin: '*' } });

  io.of('/driver/update').on('connection', handleDriverSocket);
  io.of('/driver/dashboard').on('connection', handleClientSocket);
}
