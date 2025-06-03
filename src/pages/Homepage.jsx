// src/pages/Homepage.jsx
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
          </Link>
        </div>
      </header>

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
        <div className="hero-content">
          <h1>Latest Tech Deals</h1>
          <p>Save up to 40% on top brands</p>
          <button>Shop Now</button>
        </div>
      </section>

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
    </div>
  );
};

export default Homepage;