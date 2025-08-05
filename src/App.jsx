// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
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
=======
import { useAuth } from './context/AuthContext';
import AdminRoute from './components/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import EsewaPaymentPage from './pages/EsewaPaymentPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import PaymentFailurePage from './pages/PaymentFailurePage';
import MyOrdersPage from './pages/MyOrdersPage';
import WishlistPage from './pages/WishlistPage'; // <-- 1. IMPORT
import AdminDashboard from './pages/AdminDashboard';
import ManageProducts from './pages/ManageProducts';
import ManageUsers from './pages/ManageUsers';
import ManageOrders from './pages/ManageOrders';
import OrderDetailPage from './pages/OrderDetailPage';

function App() {
  const { loading } = useAuth();
  if (loading) { return <div>Loading...</div>; }

  return (
    <Router>
      <Routes>
        {/* --- Public Routes --- */}
>>>>>>> sprint2
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<CartPage />} />
<<<<<<< HEAD
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment-esewa" element={<EsewaPaymentPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        {/* Add a category route later if needed: <Route path="/category/:categoryName" element={<CategoryPage />} /> */}
=======
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/payment-failure" element={<PaymentFailurePage />} />
        <Route path="/wishlist" element={<WishlistPage />} /> {/* <-- 2. ADD ROUTE */}

        {/* --- Protected User Routes --- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment-esewa" element={<EsewaPaymentPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
        </Route>
        
        {/* --- Admin Protected Routes --- */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="orders" element={<ManageOrders />} />
          <Route path="order/:orderId" element={<OrderDetailPage />} />
        </Route>

>>>>>>> sprint2
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> sprint2
