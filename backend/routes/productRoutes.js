import express from 'express';
import { addProduct, editProduct, deleteProduct, getProductsByCategory } from '../controllers/productController.js';
const router = express.Router();

router.post('/add', addProduct);
router.put('/edit/:id', editProduct);
router.delete('/delete/:id', deleteProduct);
router.get('/category/:categoryId', getProductsByCategory);

export default router;
