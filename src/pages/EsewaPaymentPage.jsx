// src/pages/EsewaPaymentPage.jsx
<<<<<<< HEAD
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import '../css/EsewaPaymentPage.css';
import esewaQrImageFile from '../assets/esewa.png'; 


const EsewaPaymentPage = () => {
  const { getCartTotal, cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const totalAmount = getCartTotal();

  // Use the imported image
  const esewaQrCodeImageUrl = esewaQrImageFile; // <--- ASSIGN THE IMPORTED IMAGE

  if (cartItems.length === 0 && totalAmount === 0) {
    return (
      <div className="esewa-payment-page empty-payment">
        <h2>No Order to Pay For</h2>
        <p>Your cart is empty. Please add items to your cart before proceeding to payment.</p>
        <Link to="/" className="btn btn-primary">Go to Homepage</Link>
=======
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../css/EsewaPaymentPage.css';

// This helper function creates and submits a form to redirect the user to eSewa
const postToEsewa = (params) => {
  const form = document.createElement('form');
  form.setAttribute('method', 'POST');
  // Use the new v2 API form URL
  form.setAttribute('action', 'https://rc-epay.esewa.com.np/api/epay/main/v2/form');

  for (const key in params) {
    const hiddenField = document.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', key);
    hiddenField.setAttribute('value', params[key]);
    form.appendChild(hiddenField);
  }
  document.body.appendChild(form);
  form.submit();
};


const EsewaPaymentPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { shippingInfo } = location.state || {};
  const totalAmount = getCartTotal();
  const API_URL_BASE = 'http://localhost:5005';

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      // Step 1: Create the order in our database first to get a unique Order ID
      const orderData = {
        orderItems: cartItems.map(item => ({ name: item.name, qty: item.quantity, image: item.image, price: item.price, id: item.id })),
        shippingInfo: shippingInfo,
        totalPrice: totalAmount,
      };

      const orderResponse = await fetch(`${API_URL_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-auth-token': user.token },
        body: JSON.stringify(orderData),
      });

      const createdOrder = await orderResponse.json();
      if (!orderResponse.ok) {
        throw new Error(createdOrder.message || 'Failed to create order');
      }

      // Step 2: Initiate the eSewa payment with our new order ID
      const esewaResponse = await fetch(`${API_URL_BASE}/api/esewa/initiate-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-auth-token': user.token },
        body: JSON.stringify({ orderId: createdOrder._id, amount: totalAmount }),
      });

      const esewaData = await esewaResponse.json();
      if (!esewaResponse.ok) {
        throw new Error(esewaData.message || 'Failed to initiate eSewa payment');
      }

      // Step 3: Redirect the user to the eSewa payment page using the helper
      clearCart();
      postToEsewa(esewaData);

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (!shippingInfo || cartItems.length === 0) {
    return (
      <div className="esewa-payment-page empty-payment">
        <h2>Something went wrong</h2>
        <p>Please start the checkout process again from your cart.</p>
        <Link to="/cart" className="btn btn-primary">Go to Cart</Link>
>>>>>>> sprint2
      </div>
    );
  }

<<<<<<< HEAD
  const handlePaymentConfirmed = () => {
    alert(
      `Payment Instructions:\n1. Scan the QR code with your eSewa app.\n2. Pay Rs. ${totalAmount.toLocaleString()}.\n3. After payment, please note your eSewa Transaction ID.\n4. Contact support@gadgetify.com with your Order ID and Transaction ID to confirm your order.\n\n(This is a simulation. Clicking OK will clear your cart and redirect you.)`
    );
    clearCart();
    navigate('/order-success');
  };

  return (
    <div className="esewa-payment-page">
      <header className="payment-header">
        <h1>eSewa Payment</h1>
        <p className="payment-subheader">Complete your purchase by scanning the QR code.</p>
      </header>

      <div className="payment-details-container">
        <div className="qr-code-section">
          <h2>Scan to Pay with eSewa</h2>
          <div className="qr-image-wrapper">
            {/* Use the esewaQrCodeImageUrl variable for the src attribute */}
            <img src={esewaQrCodeImageUrl} alt="eSewa QR Code" />
          </div>
          <div className="amount-to-pay">
            <h3>Total Amount:</h3>
            <p className="total-amount-value">Rs. {totalAmount.toLocaleString()}</p>
          </div>
        </div>

        <div className="payment-instructions-section">
          <h2>Payment Instructions</h2>
          <ol className="instructions-list">
            <li>Open your eSewa mobile application.</li>
            <li>Tap on the 'Scan & Pay' or QR icon.</li>
            <li>Align your camera to scan the QR code displayed on this page.</li>
            <li>
              Verify the merchant name is "Gadgetify" (or your registered merchant name).
            </li>
            <li>
              Enter the exact amount: <strong>Rs. {totalAmount.toLocaleString()}</strong>
            </li>
            <li>Complete the payment using your eSewa MPIN or fingerprint.</li>
          </ol>

          <div className="after-payment-info">
            <h3><i className="fas fa-exclamation-circle"></i> After Successful Payment:</h3>
            <p>
              Please take a screenshot of your payment confirmation or note down the
              <strong> eSewa Transaction ID</strong>.
            </p>
            <p>
              To confirm your order, please email your <strong>Order ID</strong> (you would typically generate this on the checkout page or backend) and your <strong>eSewa Transaction ID</strong> to:
            </p>
            <p className="contact-email">support@gadgetify.com</p>
            <p className="processing-note">
              Your order will be processed once payment is manually verified.
            </p>
          </div>
        </div>
      </div>

      <footer className="payment-actions-footer">
        <button onClick={handlePaymentConfirmed} className="btn btn-success btn-confirm-simulated">
          I Have Paid (Simulated Confirmation)
=======
  return (
    <div className="esewa-payment-page">
      <header className="payment-header">
        <h1>Confirm Your Order</h1>
        <p className="payment-subheader">You will be redirected to eSewa to complete your payment securely.</p>
      </header>
      <div className="payment-summary">
        <h3>Total Amount to Pay: <strong>Rs. {totalAmount.toLocaleString()}</strong></h3>
        {error && <p className="error-message">{error}</p>}
      </div>
      <footer className="payment-actions-footer">
        <button onClick={handlePayment} className="btn btn-success" disabled={loading}>
          {loading ? 'Processing...' : 'Pay with eSewa'}
>>>>>>> sprint2
        </button>
        <Link to="/checkout" className="btn btn-secondary">Back to Checkout</Link>
      </footer>
    </div>
  );
};

<<<<<<< HEAD
export default EsewaPaymentPage;
=======
export default EsewaPaymentPage;
>>>>>>> sprint2
