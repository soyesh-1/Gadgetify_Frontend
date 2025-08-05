// src/pages/Homepage.jsx
<<<<<<< HEAD
import React from "react";
import { Link } from 'react-router-dom';
import "../css/Homepage.css";
import { FaSearch, FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useCart } from '../context/CartContext'; // Import useCart

const Homepage = () => {
  const { addToCart, getCartItemCount } = useCart(); // Get addToCart and getCartItemCount from context

  const featuredProducts = [
    {
      id: "1", // Ensure IDs are strings if used as keys directly in some scenarios, or ensure consistency
      name: "iPhone 15 Pro Max",
      price: 170000, // Use numbers for price for calculations
      image: "../src/assets/iphone15pro.jpg", // Adjust path if needed, or use placeholder
    },
    {
      id: "2",
      name: "Samsung Galaxy S24",
      price: 150000,
      image: "../src/assets/SamsungS24.jpg",
    },
    {
      id: "3",
      name: "Sony WH-1000XM5",
      price: 45000,
      image: "../src/assets/Sony WH-1000XM5.jpg",
    },
    {
      id: "4",
      name: "Apple MacBook Air M3",
      price: 210000,
      image: "../src/assets/Apple MacBook Air M3.jpg",
    },
  ];

  const handleAddToCart = (product) => {
    // The product object passed to addToCart should include id, name, price, and image (optional for cart logic but good for display)
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image // Pass image to cart context if you want to display it in cart
    });
    // Optionally, add a toast notification here
    console.log(`${product.name} added to cart!`);
  };

  return (
    <div className="Homepage">
      {/* Header */}
      <header className="header">
        <div className="logo">Gadgetify</div>
        <div className="search-box">
          <input type="text" placeholder="Search for products" />
          <button><FaSearch /></button>
        </div>
        <div className="icons">
          <Link to="/login">
            <FaUser />
          </Link>
          <FaHeart /> {/* Wishlist functionality not implemented yet */}
          <Link to="/cart" className="cart"> {/* Link cart icon to /cart */}
            <FaShoppingCart />
            <span className="badge">{getCartItemCount()}</span> {/* Dynamic cart item count */}
=======
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../css/Homepage.css";
import "../css/ProfileDropdown.css";
import { FaSearch, FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useWishlist } from '../context/WishlistContext';

const Homepage = () => {
  const { products, loading, error } = useProducts();
  const { addToCart, getCartItemCount } = useCart();
  const { user, logout } = useAuth();
  const { wishlist, addToWishlist, removeFromWishlist, isItemInWishlist } = useWishlist();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const categories = ["Mobiles", "Laptops", "Headphones", "Gaming", "Accessories"];

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  const handleAddToCart = (product) => {
    addToCart({ id: product._id, name: product.name, price: product.price, image: product.image });
    alert(`${product.name} added to cart!`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?keyword=${keyword}`);
      setKeyword('');
    }
  };

  const handleWishlistClick = (product) => {
    if (!user) {
      alert('Please log in to use the wishlist.');
      navigate('/login');
      return;
    }
    if (isItemInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  return (
    <div className="homepage">
      <header className="header">
        <div className="logo">Gadgetify</div>
        <form onSubmit={handleSearchSubmit} className="search-box">
          <input type="text" placeholder="Search for products" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          <button type="submit"><FaSearch /></button>
        </form>

        <div className="icons">
          {user ? (
            <div className="profile-menu-container" ref={dropdownRef}>
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="profile-icon-button"><FaUser /></button>
              {isProfileOpen && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <p>Signed in as</p>
                    <div className="dropdown-user-info">
                      <div className="user-avatar">{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</div>
                      <span className="user-name">{user.name || 'User'}</span>
                    </div>
                  </div>
                  <div className="dropdown-body">
                    {user.role === 'admin' && (<Link to="/admin/dashboard" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>Admin Dashboard</Link>)}
                    <Link to="/profile" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>View Profile</Link>
                    <Link to="/my-orders" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>My Orders</Link>
                    <button onClick={handleLogout} className="dropdown-item logout">Sign Out</button>
                  </div>
                </div>
              )}
            </div>
          ) : (<Link to="/login" title="Login/Register"><FaUser /></Link>)}

          <Link to="/wishlist" className={`wishlist-icon ${wishlist && wishlist.length > 0 ? 'active' : ''}`}><FaHeart /></Link>

          <Link to="/cart" className="cart">
            <FaShoppingCart />
            <span className="badge">{getCartItemCount()}</span>
>>>>>>> sprint2
          </Link>
        </div>
      </header>

<<<<<<< HEAD
      {/* Category Nav */}
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

      {/* Hero Banner */}
      <section className="hero">
         <img src="../src/assets/Banner.jpg" alt="Hero Banner" /> {/* Ensure this path is correct */}
=======
      <nav className="category-nav">
        <ul>
          {categories.map((category) => (<li key={category}><Link to={`/category/${category}`}>{category}</Link></li>))}
        </ul>
      </nav>

      <section className="hero">
        <img src="/assets/Banner.jpg" alt="Hero Banner" />
>>>>>>> sprint2
        <div className="hero-content">
          <h1>Latest Tech Deals</h1>
          <p>Save up to 40% on top brands</p>
          <button>Shop Now</button>
        </div>
      </section>

<<<<<<< HEAD
      {/* Featured Products */}
      <section className="featured">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image || `https://placehold.co/220x200/e2e8f0/4a5568?text=${product.name.substring(0,10)}`} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Rs. {product.price.toLocaleString()}</p> {/* Format price */}
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button> {/* Call handleAddToCart */}
            </div>
          ))}
        </div>
      </section>
      {/* You might want a footer here */}
=======
      <section className="featured">
        <h2>Featured Products</h2>
        {loading && <p style={{ textAlign: 'center' }}>Loading products...</p>}
        {error && <p style={{ textAlign: 'center', color: 'red' }}>Error: {error}</p>}
        {!loading && !error && (
          <div className="product-grid">
            {products.map(product => (
              <div key={product._id} className="product-card">
                <span
                  className={`wishlist-btn ${isItemInWishlist(product._id) ? 'active' : ''}`}
                  onClick={() => handleWishlistClick(product)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleWishlistClick(product)}
                >
                  <FaHeart />
                </span>

                <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img src={`http://localhost:5005${product.image}`} alt={product.name} />
                  <h3>{product.name}</h3>
                </Link>
                <p>Rs. {product.price.toLocaleString()}</p>
                <button onClick={() => handleAddToCart(product)} className="add-to-cart-btn">Add to Cart</button>
              </div>
            ))}
          </div>
        )}
      </section>
>>>>>>> sprint2
    </div>
  );
};

<<<<<<< HEAD
export default Homepage;
=======
export default Homepage;
>>>>>>> sprint2
