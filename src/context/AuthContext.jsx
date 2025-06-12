// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_URL = 'http://localhost:5005/api/auth'; // Using your working port

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const handleAuthResponse = (data) => {
    if (data.token) {
      const decodedUser = jwtDecode(data.token);
      localStorage.setItem('token', data.token);
      // The payload now includes the name from the backend
      setUser({
        token: data.token,
        id: decodedUser.user.id,
        name: decodedUser.user.name,
      });
      return true;
    }
    return false;
  };

  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch(`${API_URL}/me`, {
          method: 'GET',
          headers: { 'x-auth-token': token },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.msg || 'Token validation failed');
        }
        // The /me route returns the user object which now includes the name
        setUser({ token, id: data._id, name: data.name });
      } catch (err) {
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (email, password) => {
    // ... (login function remains the same)
    setError('');
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) { throw new Error(data.msg || 'Login failed'); }
      return handleAuthResponse(data);
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // UPDATE THE SIGNUP FUNCTION TO SEND THE NAME
  const signup = async (name, email, password) => {
    setError('');
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send name in the request body
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) { throw new Error(data.msg || 'Signup failed'); }
      return handleAuthResponse(data);
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = { user, error, loading, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};