// Import the Product model
import Product from '../models/productModel.js';

// Add Product
export const addProduct = async (req, res) => {
  const { name, price, category } = req.body;
  try {
    const product = new Product({ name, price, category });
    await product.save();
    res.status(201).json({ message: 'Product added successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Edit Product
export const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, category } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(id, { name, price, category }, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Products by Category
export const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params; // Get category ID from the request params
  try {
    const products = await Product.find({ category: categoryId }).populate('category');
    if (!products) {
      return res.status(404).json({ message: 'No products found for this category' });
    }
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
