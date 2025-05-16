import { RequestHandler } from 'express';
import { verifyToken } from '../services/token.service';

export const authenticate: RequestHandler = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Missing token' });
    return;
  }

  const driverId = verifyToken(token);
  if (!driverId) {
    res.status(403).json({ message: 'Invalid or expired token' });
    return;
  }

  (req as any).driverId = driverId;
  next();
};