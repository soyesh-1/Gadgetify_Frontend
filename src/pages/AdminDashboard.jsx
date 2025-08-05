// src/pages/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, Admin! Manage your site content here.</p>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Manage Products</h2>
          <p>Add, edit, or remove products from your store.</p>
          <Link to="/admin/products" className="card-button">Go to Products</Link>
        </div>

        <div className="dashboard-card">
          <h2>View Users</h2>
          <p>See a list of all registered users on your site.</p>
          <Link to="/admin/users" className="card-button">Go to Users</Link>
        </div>

        <div className="dashboard-card">
          <h2>Check Orders</h2>
          <p>Review and manage customer orders.</p>
          <Link to="/admin/orders" className="card-button">Go to Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
