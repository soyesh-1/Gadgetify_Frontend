// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import EsewaPaymentPage from './pages/EsewaPaymentPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  const { loading } = useAuth();

  // If the app is still checking for a token, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment-esewa" element={<EsewaPaymentPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;