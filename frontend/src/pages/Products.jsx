import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/product/category/your-category-id', {
          withCredentials: true,
        });
        setProducts(response.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id} className="p-4 bg-white shadow mb-2">
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
