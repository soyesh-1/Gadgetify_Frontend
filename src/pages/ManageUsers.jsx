// src/pages/ManageUsers.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../css/AdminPages.css'; // We can reuse the same CSS file

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth(); // Get the logged-in admin's auth token

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user.token) {
        setError('Authorization token not found.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5005/api/users', {
          headers: {
            'x-auth-token': user.token, // Send token for admin authorization
          },
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.msg || 'Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user.token]); // Dependency array ensures this runs if the token changes

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h1>Manage Users</h1>
        {/* We can add a "Add New User" button here later if needed */}
      </div>

      {loading && <p className="loading-message">Loading users...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      {!loading && !error && (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Date Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u._id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{new Date(u.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
