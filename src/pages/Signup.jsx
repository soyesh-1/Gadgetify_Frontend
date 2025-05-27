import React from "react";
import "../css/Login.css";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Create a New Account</h2>
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
        </p>
      </div>
    </div>
  );
};

export default Signup;
