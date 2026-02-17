import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const app = express();

// Enable CORS for frontend-backend communication
app.use(cors());

// Body parser middleware
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Error Handling Middleware (Must be defined after all routes)
app.use(errorHandler);

// Initialize Database Connection
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}...`);
});