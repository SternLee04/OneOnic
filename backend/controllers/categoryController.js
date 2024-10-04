import Category from '../models/categoryModel.js';

// Add Category
export const addCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = new Category({ name });
    await category.save();
    res.status(201).json({ message: 'Category added successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Edit Category
export const editCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category updated successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.findByIdAndDelete(id);
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
