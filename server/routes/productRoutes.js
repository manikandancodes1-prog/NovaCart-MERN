// routes/productRoutes.js
import express from 'express';
const router = express.Router();
import { createProduct, getProducts } from '../controllers/productController.js'; // getProducts-ஐயும் இறக்குமதி செய்யவும்
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinary.js';


router.route('/')
    .get(getProducts) 
    .post(protect, admin, upload.single('image'), createProduct);

export default router;