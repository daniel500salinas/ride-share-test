import { RequestHandler } from 'express';
import { updateLocation } from '../services/driver.service';

export const updateDriverLocation: RequestHandler = (req, res): void => {
  const driverId = (req as any).driverId;
  const { lat, long } = req.body;

  if (!lat || !long) {
    res.status(400).json({ message: 'Missing coordinates' });
    return;
  }

  updateLocation(driverId, { lat, long, timestamp: Date.now() });
  res.status(200).json({ message: 'Location updated' });
};