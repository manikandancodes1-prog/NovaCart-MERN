import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        }
    ],
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    status: { type: String, default: 'Processing' }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;