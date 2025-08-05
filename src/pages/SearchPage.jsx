// src/pages/SearchPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../css/CategoryPage.css'; // Reuse styles from category page
import '../css/Homepage.css';   // Reuse product card styles

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { addToCart } = useCart();

  useEffect(() => {
    if (keyword && keyword.trim() !== '') {
      const fetchSearchResults = async () => {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:5005/api/products/search?keyword=${keyword}`);
          if (!response.ok) {
            throw new Error('Search request failed');
          }
          const data = await response.json();
          setSearchResults(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchSearchResults();
    } else {
      setLoading(false);
      setSearchResults([]);
    }
  }, [keyword]);

  const handleAddToCart = (product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="category-page-container">
      <div className="category-page-header">
        <h1>Search Results for "{keyword}"</h1>
        <p>{searchResults.length} product(s) found</p>
      </div>

      {loading && <p style={{ textAlign: 'center' }}>Searching...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>Error: {error}</p>}

      {!loading && !error && (
        <div className="product-grid">
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <div key={product._id} className="product-card">
                <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img src={`http://localhost:5005${product.image}`} alt={product.name} />
                  <h3>{product.name}</h3>
                </Link>
                <p>Rs. {product.price.toLocaleString()}</p>
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            ))
          ) : (
            <p className="no-products-message">No products match your search. Try another keyword.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
