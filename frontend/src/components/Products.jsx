import React, { useState, useEffect } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`http://localhost:3000/api/product/category/${selectedCategory}`, { credentials: 'include' });
      const data = await res.json();
      setProducts(data);
    };
    if (selectedCategory) fetchProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Products</h2>
      <select onChange={handleCategoryChange} className="mb-6 border px-4 py-2">
        <option value="">Select Category</option>
        {/* Loop through available categories */}
      </select>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product._id} className="bg-white p-4 rounded shadow-sm">
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
