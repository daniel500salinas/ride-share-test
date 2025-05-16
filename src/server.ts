import { createServer } from 'http';
import app from './app';
import { CONFIG } from './config';
import { initSocket } from './sockets';

const httpServer = createServer(app);
initSocket(httpServer);

httpServer.listen(CONFIG.PORT, () => {
  console.log(`Server listening on http://localhost:${CONFIG.PORT}`);
});