// src/main.jsx
<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Assuming you have a global index.css
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'; // Import CartProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider> {/* Wrap App with CartProvider */}
      <App />
    </CartProvider>
  </StrictMode>,
)
=======
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ProductProvider } from './context/ProductContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx'; // <-- 1. IMPORT

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ProductProvider>
        <WishlistProvider> { /* <-- 2. WRAP CartProvider */ }
          <CartProvider>
            <App />
          </CartProvider>
        </WishlistProvider> { /* <-- 3. CLOSE WishlistProvider */ }
      </ProductProvider>
    </AuthProvider>
  </StrictMode>,
);
>>>>>>> sprint2
