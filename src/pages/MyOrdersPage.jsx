// src/pages/MyOrdersPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../css/MyOrdersPage.css'; // We'll create this CSS file next

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchMyOrders = async () => {
      if (!user || !user.token) {
        setError('Please log in to view your orders.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5005/api/orders/myorders', {
          headers: {
            'x-auth-token': user.token,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch your orders.');
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user]);

  if (loading) {
    return <div className="loading-message">Loading your orders...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="my-orders-container">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You have not placed any orders yet.</p>
          <Link to="/" className="btn-shop">Start Shopping</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-card-header">
                <div>
                  <p><strong>Order ID:</strong> {order._id}</p>
                  <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p><strong>Total:</strong> Rs. {order.totalPrice.toLocaleString()}</p>
                </div>
              </div>
              <div className="order-card-body">
                {order.orderItems.map((item) => (
                  <div key={item.product} className="order-item-summary">
                    <img src={`http://localhost:5005${item.image}`} alt={item.name} />
                    <span>{item.name} (x{item.qty})</span>
                  </div>
                ))}
              </div>
              <div className="order-card-footer">
                <p><strong>Payment Status:</strong> {order.paymentInfo.status}</p>
                <p><strong>Order Status:</strong> {order.orderStatus}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
