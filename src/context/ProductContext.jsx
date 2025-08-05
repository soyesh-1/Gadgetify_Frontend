// src/context/ProductContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const API_URL = 'http://localhost:5005/api/products';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      // We set loading to true at the beginning of the fetch
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch products. Status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      // Also log the error to the console for debugging
      console.error("Error fetching products:", err);
    } finally {
      // This will run whether the fetch succeeded or failed
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); // The empty array ensures this runs only once when the app loads

  const value = {
    products,
    loading,
    error,
    refetchProducts: fetchProducts, // This allows other components to trigger a refresh
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};