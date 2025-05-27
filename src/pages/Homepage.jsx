import React from "react";
import {Link} from 'react-router-dom';
import "../css/Homepage.css";
import { FaSearch, FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";

const Homepage = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: "Rs. 170,000",
      image: "../src/assets/iphone15pro.jpg",
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      price: "Rs 150,000",
      image: "../src/assets/SamsungS24.jpg",
    },
    {
      id: 3,
      name: "Sony WH-1000XM5",
      price: "Rs 45,000",
      image: "../src/assets/Sony WH-1000XM5.jpg",
    },
    {
      id: 4,
      name: "Apple MacBook Air M3",
      price: "Rs 210,000",
      image: "../src/assets/Apple MacBook Air M3.jpg",
    },
  ];

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
          <Link to="/login">
          <FaUser />
          </Link>
          <FaHeart />
          <div className="cart">
            <FaShoppingCart />
            <span className="badge">2</span>
          </div>
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
         <img src="../src/assets/Banner.jpg" alt="Hero" />
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
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
