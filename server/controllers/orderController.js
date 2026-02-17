import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = async (req, res) => {
    try {
        const { orderItems, totalPrice } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items found' });
        } else {
            const order = new Order({
                user: req.user._id, 
                orderItems: orderItems.map((x) => ({
                    ...x,
                    product: x.product || x._id, 
                    image: x.image, 
                })),
                totalPrice,
            });

            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
    } catch (error) {
        console.error("Order Error:", error); 
        res.status(500).json({ message: 'Error placing order', error: error.message });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
  .populate('user', 'name email');

        if (order) {
            if (order.user._id.toString() === req.user._id.toString() || req.user.isAdmin) {
                res.json(order);
            } else {
                res.status(401).json({ message: 'Not authorized to view this order' });
            }
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order details', error: error.message });
    }
};