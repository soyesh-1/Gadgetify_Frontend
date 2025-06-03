// src/pages/OrderSuccessPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/OrderSuccessPage.css'; // We'll create this CSS file next
import { FaCheckCircle } from 'react-icons/fa';

const OrderSuccessPage = () => {
  return (
    <div className="order-success-page">
      <div className="success-card">
        <div className="success-icon">
          <FaCheckCircle />
        </div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase with Gadgetify.</p>
        <p>
          Your order is being processed. If you paid via eSewa, please ensure you have
          sent your Order ID and eSewa Transaction ID to our support team as instructed.
        </p>
        <div className="success-actions">
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
          {/* Optionally, add a link to view order history if that feature exists */}
          {/* <Link to="/my-orders" className="btn btn-secondary">
            View My Orders
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;