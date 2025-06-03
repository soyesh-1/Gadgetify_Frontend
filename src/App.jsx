// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import EsewaPaymentPage from './pages/EsewaPaymentPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import ProductDetailPage from './pages/ProductDetailPage'; // Import ProductDetailPage

function App() {
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
        {/* Add a category route later if needed: <Route path="/category/:categoryName" element={<CategoryPage />} /> */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;