<<<<<<< HEAD
import React from "react";
import "../css/Login.css";
import { Link } from "react-router-dom";

const Signup = () => {
=======
// src/pages/Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/Login.css';

const Signup = () => {
  const [name, setName] = useState(''); // <-- ADD STATE FOR NAME
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Pass the name to the signup function
    const success = await signup(name, email, password);

    setLoading(false);

    if (success) {
      alert('Account created successfully! You are now logged in.');
      navigate('/');
    }
  };

>>>>>>> sprint2
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Create a New Account</h2>
<<<<<<< HEAD
        <form>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your name" required />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Create a password" required />
          </div>
          <button type="submit" className="login-btn">Sign Up</button>
        </form>
        <p className="signup-link">
          Already have an account? <Link to="/">Login</Link>
=======
        <form onSubmit={handleSubmit}>
          {/* ADD THE NAME INPUT FIELD */}
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <p className="extra-link">
          Already have an account? <Link to="/login">Login</Link>
>>>>>>> sprint2
        </p>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Signup;
=======
export default Signup;
>>>>>>> sprint2
