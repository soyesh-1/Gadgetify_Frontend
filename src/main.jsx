// src/main.jsx
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