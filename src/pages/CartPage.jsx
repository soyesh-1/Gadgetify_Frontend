// src/pages/CartPage.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import '../css/CartPage.css';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const API_URL_BASE = 'http://localhost:5005';

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="btn btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <header className="cart-header">
        <h1>Your Shopping Cart</h1>
        <button onClick={clearCart} className="btn btn-danger btn-clear-cart">
          Clear Cart
        </button>
      </header>

      <div className="cart-items-list">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">
              {/* --- FIX: Correctly constructs the full URL for the image --- */}
              <img src={`${API_URL_BASE}${item.image}`} alt={item.name} />
            </div>
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p className="item-price">Price: Rs. {item.price.toLocaleString()}</p>
              <div className="item-quantity">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="quantity-btn">
                  <FaMinus />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="quantity-btn">
                  <FaPlus />
                </button>
              </div>
            </div>
            <div className="cart-item-subtotal">
              <p>Subtotal: Rs. {(item.price * item.quantity).toLocaleString()}</p>
            </div>
            <div className="cart-item-actions">
              <button onClick={() => removeFromCart(item.id)} className="btn-remove">
                <FaTrash /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer className="cart-footer">
        <div className="cart-summary">
          <h2>Total: Rs. {getCartTotal().toLocaleString()}</h2>
        </div>
        <div className="cart-actions">
          <Link to="/" className="btn btn-secondary">Continue Shopping</Link>
          <Link to="/checkout" className="btn btn-primary">Proceed to Checkout</Link>
        </div>
      </footer>
    </div>
  );
};

export default CartPage;
