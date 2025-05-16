import jwt from 'jsonwebtoken';
import { CONFIG } from '../config';

export function generateToken(driverId: string): string {
  return jwt.sign({ driverId }, CONFIG.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
}

export function verifyToken(token: string): string | null {
  try {
    const payload = jwt.verify(token, CONFIG.ACCESS_TOKEN_SECRET) as any;
    return payload.driverId;
  } catch {
    return null;
  }
}