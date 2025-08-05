// src/pages/OrderDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/OrderDetailPage.css'; // We'll create this CSS file next
import '../css/AdminPages.css';   // Reuse some styles

const OrderDetailPage = () => {
  const { orderId } = useParams(); // Get the order ID from the URL
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL_BASE = 'http://localhost:5005';

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!user || !user.token) {
        setError('Authorization token not found.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL_BASE}/api/orders/${orderId}`, {
          headers: {
            'x-auth-token': user.token,
          },
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || 'Failed to fetch order details');
        }

        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (orderId && user) {
        fetchOrderDetails();
    }
  }, [orderId, user]);

  if (loading) {
    return <div className="loading-message">Loading Order Details...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!order) {
    return <div className="loading-message">Order not found.</div>;
  }

  return (
    <div className="order-detail-container">
      <div className="order-detail-header">
        <h1>Order Details</h1>
        <p>Order ID: <span>{order._id}</span></p>
        <Link to="/admin/orders" className="back-link">&larr; Back to All Orders</Link>
      </div>

      <div className="order-detail-grid">
        <div className="order-info-card">
          <h2>Customer & Shipping Information</h2>
          <p><strong>Customer Name:</strong> {order.user.name}</p>
          <p><strong>Email:</strong> {order.user.email}</p>
          <hr />
          <p><strong>Shipping Address:</strong></p>
          <address>
            {order.shippingInfo.address}<br />
            {order.shippingInfo.city}<br />
            Phone: {order.shippingInfo.phoneNo}
          </address>
        </div>

        <div className="order-info-card">
          <h2>Order Summary</h2>
          <p><strong>Total Price:</strong> Rs. {order.totalPrice.toLocaleString()}</p>
          <p><strong>Payment Status:</strong> <span className={order.paymentInfo.status === 'Paid' ? 'status-paid' : 'status-pending'}>{order.paymentInfo.status}</span></p>
          <p><strong>Order Status:</strong> <span className="status-processing">{order.orderStatus}</span></p>
          <p><strong>Order Placed On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <div className="order-items-section">
        <h2>Order Items ({order.orderItems.length})</h2>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item) => (
                <tr key={item.product}>
                  <td><img src={`${API_URL_BASE}${item.image}`} alt={item.name} className="product-image-thumbnail" /></td>
                  <td>{item.name}</td>
                  <td>Rs. {item.price.toLocaleString()}</td>
                  <td>{item.qty}</td>
                  <td>Rs. {(item.qty * item.price).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
