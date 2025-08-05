// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../css/ProfilePage.css';

const ProfilePage = () => {
  const { user, updateUserProfile, error } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (password && password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const updateData = { name, email };
      if (password) {
        updateData.password = password;
      }

      const success = await updateUserProfile(updateData);
      
      if (success) {
        setMessage('Profile updated successfully!');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setMessage(err.message || 'Failed to update profile.');
    }
  };

  if (!user) {
    return <h2>Please log in to view your profile.</h2>;
  }

  return (
    <div className="profile-page-container">
      <div className="profile-form-container">
        <h1>Your Profile</h1>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep the same" />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Leave blank to keep the same" />
          </div>
          <button type="submit" className="btn-primary-profile">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
