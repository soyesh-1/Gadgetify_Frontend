// src/pages/Homepage.jsx
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
          </Link>
        </div>
      </header>

      <nav className="category-nav">
        <ul>
          {categories.map((category) => (<li key={category}><Link to={`/category/${category}`}>{category}</Link></li>))}
        </ul>
      </nav>

      <section className="hero">
        <img src="/assets/Banner.jpg" alt="Hero Banner" />
        <div className="hero-content">
          <h1>Latest Tech Deals</h1>
          <p>Save up to 40% on top brands</p>
          <button>Shop Now</button>
        </div>
      </section>

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
    </div>
  );
};

export default Homepage;
