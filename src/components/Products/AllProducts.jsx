import React, { useEffect, useState } from 'react';
import { allProducts } from "../utils/ApiFunctions.js";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await allProducts();
        if (response.status) {
          setProducts(response.data);
        } else {
          console.error('Error fetching products:', response.message);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>All Products</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {products.map(product => (
          <li
            key={product.productId}
            style={{
              border: '1px solid #ddd',
              borderRadius: '4px',
              margin: '10px 0',
              padding: '10px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            <h2 style={{ margin: '0 0 10px' }}>{product.productName}</h2>
            <p style={{ fontSize: '0.9em', color: '#555' }}>{product.productId}</p>
            {product.image && (
              <img src={`data:image/png;base64,${product.image}`} alt={product.productName} style={{ width: '100px', height: '100px' }} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllProducts;