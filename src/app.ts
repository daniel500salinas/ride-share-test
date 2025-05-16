import express from 'express';
import authRoutes from './routes/auth.routes';
import driverRoutes from './routes/driver.routes';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use(driverRoutes);

export default app;