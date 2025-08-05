// src/pages/EsewaPaymentPage.jsx
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
      </div>
    );
  }

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
        </button>
        <Link to="/checkout" className="btn btn-secondary">Back to Checkout</Link>
      </footer>
    </div>
  );
};

export default EsewaPaymentPage;
