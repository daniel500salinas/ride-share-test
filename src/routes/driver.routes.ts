import { Router } from 'express';
import { updateDriverLocation } from '../controllers/driver.controller';
import { authenticate } from '../middleware/auth.middleware';
const router = Router();
router.post('/driver/update', authenticate, updateDriverLocation);
export default router;