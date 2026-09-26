import { Router } from 'express';
import { getProfile, updateProfile, getStats } from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/stats', protect, adminOnly, getStats);
export default router;