import Product from '../models/productModel.js';

// @desc    Get all products with Search functionality
export const getProducts = async (req, res) => {
    try {
        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            }
        } : {};

        const products = await Product.find({ ...keyword }).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Create a product (Admin Only) - Updated with all fields
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body; 
    const imageUrl = req.file ? req.file.path : req.body.image; 

    const product = new Product({
      name,
      description,
      price,
      category,
      stock: stock || 0, 
      image: imageUrl, 
      user: req.user._id 
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: "Product creation failed", error: error.message });
  }
};