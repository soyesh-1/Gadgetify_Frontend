// src/pages/Homepage.jsx
import React from "react";
import { Link, useNavigate } from 'react-router-dom'; // <-- 1. Import useNavigate
import "../css/Homepage.css";
import { FaSearch, FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { productsData } from '../data/products.js';

const Homepage = () => {
  const { addToCart, getCartItemCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // <-- 2. Initialize the navigate function

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    console.log(`${product.name} added to cart!`);
  };

  // 3. Create a new function to handle the complete logout process
  const handleLogout = () => {
    logout();      // This clears the user state
    navigate('/'); // This navigates the user back to the homepage, forcing a clean refresh
  };

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="logo">Gadgetify</div>
        <div className="search-box">
          <input type="text" placeholder="Search for products" />
          <button><FaSearch /></button>
        </div>
        <div className="icons">
          {user ? (
            <>
              <span style={{ fontSize: '14px', marginRight: '10px' }}>
                Hi, {user.name || 'User'}
              </span>
              {/* 4. Use the new handleLogout function here */}
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc3545', fontSize: '14px' }}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" title="Login/Register">
              <FaUser />
            </Link>
          )}
          <FaHeart />
          <Link to="/cart" className="cart">
            <FaShoppingCart />
            <span className="badge">{getCartItemCount()}</span>
          </Link>
        </div>
      </header>

      {/* ... (rest of your Homepage JSX remains the same) ... */}
      <nav className="category-nav">
         <ul>
          <li>Mobiles</li>
          <li>Laptops</li>
          <li>Headphones</li>
          <li>Gaming</li>
          <li>Appliances</li>
          <li>Accessories</li>
        </ul>
      </nav>

      <section className="hero">
        <img src="../src/assets/Banner.jpg" alt="Hero Banner" />
        <div className="hero-content">
          <h1>Latest Tech Deals</h1>
          <p>Save up to 40% on top brands</p>
          <button>Shop Now</button>
        </div>
      </section>

      <section className="featured">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {productsData.map(product => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
              </Link>
              <p>Rs. {product.price.toLocaleString()}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;