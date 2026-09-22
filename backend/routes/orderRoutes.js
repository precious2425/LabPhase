import { Router } from 'express';
import { createOrder, myOrders, getOrder, allOrders, updateOrderStatus } from '../controllers/orderController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();
router.post('/', protect, createOrder);
router.get('/my', protect, myOrders);
router.get('/', protect, adminOnly, allOrders);
router.get('/:id', protect, getOrder);
router.put('/:id/status', protect, adminOnly, updateOrderStatus);
export default router;
