// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API_URL_BASE = 'http://localhost:5005'; // Base URL for the backend

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const handleAuthResponse = (data) => {
    if (data.token) {
      const decodedUser = jwtDecode(data.token);
      localStorage.setItem('token', data.token);
      setUser({
        token: data.token,
        id: decodedUser.user.id,
        name: decodedUser.user.name,
        email: decodedUser.user.email, // The email is now included in the token
        role: decodedUser.user.role,
      });
      return true;
    }
    return false;
  };

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(`${API_URL_BASE}/api/auth/me`, {
            method: 'GET',
            headers: { 'x-auth-token': token },
          });
          const data = await response.json();
          if (!response.ok) throw new Error('Token validation failed');
          // The /me route returns the full user object
          setUser({ token, id: data._id, name: data.name, email: data.email, role: data.role });
        } catch (err) {
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    setError('');
    try {
      const response = await fetch(`${API_URL_BASE}/api/auth/login`, {
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

  const signup = async (name, email, password) => {
    setError('');
    try {
      const response = await fetch(`${API_URL_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  // --- NEW FUNCTION TO UPDATE THE PROFILE ---
  const updateUserProfile = async (updateData) => {
    setError('');
    try {
      const response = await fetch(`${API_URL_BASE}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': user.token,
        },
        body: JSON.stringify(updateData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }
      // After updating, we get a new token with the updated info.
      // We call handleAuthResponse to update the user state and localStorage.
      return handleAuthResponse(data);
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const value = { user, error, loading, login, signup, logout, updateUserProfile };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
