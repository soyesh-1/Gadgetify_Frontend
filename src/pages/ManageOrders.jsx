// src/pages/ManageOrders.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/AdminPages.css';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const API_URL = 'http://localhost:5005/api/orders';

  const fetchOrders = async () => {
    if (!user || !user.token) {
      setError('You must be logged in as an admin to view orders.');
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(API_URL, {
        headers: { 'x-auth-token': user.token },
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.msg || 'Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const handleUpdateStatus = async (orderId, statusUpdate) => {
    try {
      const response = await fetch(`${API_URL}/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': user.token,
        },
        body: JSON.stringify(statusUpdate),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      fetchOrders();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to permanently delete this order?')) {
      try {
        const response = await fetch(`${API_URL}/${orderId}`, {
          method: 'DELETE',
          headers: {
            'x-auth-token': user.token,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to delete order');
        }
        alert('Order deleted successfully!');
        fetchOrders();
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h1>Manage Customer Orders</h1>
      </div>

      {loading && <p className="loading-message">Loading orders...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      {!loading && !error && (
        <div className="admin-table-container">
          {orders.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th>Date</th>
                  <th>Total Price</th>
                  <th>Payment Status</th>
                  <th>Order Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <Link to={`/admin/order/${order._id}`} className="detail-link">
                        {order._id}
                      </Link>
                    </td>
                    <td>{order.user ? order.user.name : 'N/A'}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>Rs. {order.totalPrice.toLocaleString()}</td>
                    <td style={{ color: order.paymentInfo.status === 'Paid' ? 'green' : 'orange' }}>
                      {order.paymentInfo.status}
                    </td>
                    <td>{order.orderStatus}</td>
                    <td className="actions-cell">
                      {order.paymentInfo.status !== 'Paid' && (
                        <button onClick={() => handleUpdateStatus(order._id, { paymentStatus: 'Paid' })} className="btn-edit">
                          Mark as Paid
                        </button>
                      )}
                      {order.orderStatus !== 'Shipped' && (
                        <button onClick={() => handleUpdateStatus(order._id, { orderStatus: 'Shipped' })} className="btn-secondary-admin">
                          Mark as Shipped
                        </button>
                      )}
                      <button onClick={() => handleDeleteOrder(order._id)} className="btn-delete">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-products-message">No orders have been placed yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
