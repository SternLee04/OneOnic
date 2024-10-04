import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/category', { withCredentials: true });
        setCategories(response.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category._id} className="p-4 bg-white shadow mb-2">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
