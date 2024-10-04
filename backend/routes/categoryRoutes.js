import express from 'express';
import { addCategory, editCategory, deleteCategory } from '../controllers/categoryController.js';
const router = express.Router();

router.post('/add', addCategory);
router.put('/edit/:id', editCategory);
router.delete('/delete/:id', deleteCategory);

export default router;