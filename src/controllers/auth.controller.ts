import { RequestHandler } from 'express';
import { credentials, drivers } from '../models/driver.model';
import { generateToken } from '../services/token.service';

export const login: RequestHandler = (req, res): void => {
  const { username, password } = req.body;
  if (credentials[username] !== password) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }
  const driver = drivers[username];
  const token = generateToken(username);
  res.json({ token, driver });
};