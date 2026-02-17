import express from 'express';
const router = express.Router();
import { 
    addOrderItems, 
    getMyOrders, 
    getOrderById 
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js'; // Middleware to check if user is logged in

// 1. Create a new order (POST)
router.route('/').post(protect, addOrderItems);

// 2. Get logged-in user orders (GET)
// Note: This must be defined before the /:id route to avoid conflicts
router.route('/myorders').get(protect, getMyOrders);

// 3. Get specific order details by ID (GET)
router.route('/:id').get(protect, getOrderById);

export default router;