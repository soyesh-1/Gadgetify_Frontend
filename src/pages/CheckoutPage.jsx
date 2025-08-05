// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import '../css/CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, getCartTotal } = useCart();
  const navigate = useNavigate();
  const API_URL_BASE = 'http://localhost:5005';

  // --- STATE TO HOLD SHIPPING INFO ---
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    phoneNo: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setShippingInfo({ ...shippingInfo, [id]: value });
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    // Pass the shipping info to the next page using navigate state
    navigate('/payment-esewa', { state: { shippingInfo } });
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page empty-checkout">
        <h2>Your Cart is Empty</h2>
        <p>You need items in your cart to proceed to checkout.</p>
        <Link to="/" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <h1>Checkout</h1>
      </header>

      {/* We use one form to handle submission at the end */}
      <form onSubmit={handleProceedToPayment} id="checkout-form" className="checkout-layout">
        <section className="shipping-info-section">
          <h2>Shipping Information</h2>
          <div className="shipping-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" value={shippingInfo.fullName} onChange={handleInputChange} placeholder="Enter your full name" required />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" value={shippingInfo.address} onChange={handleInputChange} placeholder="Enter your shipping address" required />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" value={shippingInfo.city} onChange={handleInputChange} placeholder="Enter your city" required />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNo">Phone Number</label>
              <input type="tel" id="phoneNo" value={shippingInfo.phoneNo} onChange={handleInputChange} placeholder="Enter your phone number" required />
            </div>
          </div>
        </section>

        <section className="order-summary-section">
          <h2>Order Summary</h2>
          <div className="order-items-list">
            {cartItems.map(item => (
              <div key={item.id} className="order-item">
                <div className="order-item-image">
                  <img src={`${API_URL_BASE}${item.image}`} alt={item.name} />
                </div>
                <div className="order-item-details">
                  <h3>{item.name}</h3>
                  <p>Qty: {item.quantity}</p>
                </div>
                <div className="order-item-price">
                  <p>Rs. {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="order-total">
            <h3>Total Amount:</h3>
            <p>Rs. {getCartTotal().toLocaleString()}</p>
          </div>
        </section>
      </form>
      
      <footer className="checkout-actions-footer">
        <Link to="/cart" className="btn btn-secondary">Back to Cart</Link>
        <button type="submit" form="checkout-form" className="btn btn-primary btn-place-order">
          Proceed to eSewa Payment
        </button>
      </footer>
    </div>
  );
};

export default CheckoutPage;
