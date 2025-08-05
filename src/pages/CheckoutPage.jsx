// src/pages/CheckoutPage.jsx
<<<<<<< HEAD
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import '../css/CheckoutPage.css'; 

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
=======
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
>>>>>>> sprint2

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page empty-checkout">
        <h2>Your Cart is Empty</h2>
        <p>You need items in your cart to proceed to checkout.</p>
        <Link to="/" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

<<<<<<< HEAD
  const handlePlaceOrder = () => {
    // This is where you would typically handle order submission to a backend.
    // For now, we'll simulate an order placement and clear the cart.
    // Later, this will involve showing the eSewa QR code.
    console.log("Order placed with total:", getCartTotal());
    alert(`Order Placed (Simulated)!\nTotal: Rs. ${getCartTotal().toLocaleString()}\n\nNext step would be eSewa QR payment.`);
    // clearCart(); // You might want to clear cart after successful payment in a real scenario
    // navigate('/order-confirmation'); // Navigate to an order confirmation page
    // For now, let's keep the cart so we can see the eSewa QR part next
    navigate('/payment-esewa'); // We'll create this route for the eSewa QR
  };


=======
>>>>>>> sprint2
  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <h1>Checkout</h1>
      </header>

<<<<<<< HEAD
      <div className="checkout-content-wrapper">
        {/* Order Summary Section */}
=======
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

>>>>>>> sprint2
        <section className="order-summary-section">
          <h2>Order Summary</h2>
          <div className="order-items-list">
            {cartItems.map(item => (
              <div key={item.id} className="order-item">
                <div className="order-item-image">
<<<<<<< HEAD
                  <img src={item.image || `https://placehold.co/80x80/e2e8f0/4a5568?text=${item.name.substring(0,8)}`} alt={item.name} />
                </div>
                <div className="order-item-details">
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
=======
                  <img src={`${API_URL_BASE}${item.image}`} alt={item.name} />
                </div>
                <div className="order-item-details">
                  <h3>{item.name}</h3>
                  <p>Qty: {item.quantity}</p>
>>>>>>> sprint2
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
<<<<<<< HEAD

        {/* Shipping Information Section (Placeholder) */}
        <section className="shipping-info-section">
          <h2>Shipping Information</h2>
          <form className="shipping-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" name="fullName" placeholder="Enter your full name" required />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" placeholder="Enter your shipping address" required />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" placeholder="Enter your city" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" required />
            </div>
          </form>
        </section>
      </div>

      {/* Payment Section Placeholder & Action */}
      <footer className="checkout-actions-footer">
         {/* This button will eventually trigger the display of the eSewa QR */}
        <button onClick={handlePlaceOrder} className="btn btn-primary btn-place-order">
          Proceed to eSewa Payment
        </button>
        <Link to="/cart" className="btn btn-secondary">Back to Cart</Link>
=======
      </form>
      
      <footer className="checkout-actions-footer">
        <Link to="/cart" className="btn btn-secondary">Back to Cart</Link>
        <button type="submit" form="checkout-form" className="btn btn-primary btn-place-order">
          Proceed to eSewa Payment
        </button>
>>>>>>> sprint2
      </footer>
    </div>
  );
};

<<<<<<< HEAD
export default CheckoutPage;
=======
export default CheckoutPage;
>>>>>>> sprint2
