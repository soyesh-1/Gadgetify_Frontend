// src/pages/PaymentFailurePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PaymentFailurePage = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      textAlign: 'center',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <h1 style={{ color: '#dc3545', fontSize: '2.5rem' }}>Payment Failed</h1>
      <p style={{ fontSize: '1.1rem', color: '#333' }}>
        There was an issue with your payment, or the transaction was canceled.
      </p>
      <p style={{ fontSize: '1.1rem', color: '#333' }}>
        Your order was not placed. Please try again.
      </p>
      <Link to="/cart" style={{
        display: 'inline-block',
        marginTop: '2rem',
        padding: '0.8rem 1.5rem',
        backgroundColor: '#007bff',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        fontWeight: '500',
        fontSize: '1rem'
      }}>
        Return to Cart
      </Link>
    </div>
  );
};

export default PaymentFailurePage;
