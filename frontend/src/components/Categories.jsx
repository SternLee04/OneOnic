import React, { useState, useEffect } from 'react';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('http://localhost:3000/api/category', { credentials: 'include' });
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Categories</h2>
      <ul className="space-y-4">
        {categories.map((category) => (
          <li key={category._id} className="bg-white p-4 rounded shadow-sm">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
