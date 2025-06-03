// src/pages/CheckoutPage.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import '../css/CheckoutPage.css'; 

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page empty-checkout">
        <h2>Your Cart is Empty</h2>
        <p>You need items in your cart to proceed to checkout.</p>
        <Link to="/" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    // This is where you would typically handle order submission to a backend.
    // For now, we'll simulate an order placement and clear the cart.
    // Later, this will involve showing the eSewa QR code.
    console.log("Order placed with total:", getCartTotal());
    alert(`Order Placed (Simulated)!\nTotal: Rs. ${getCartTotal().toLocaleString()}\n\nNext step would be eSewa QR payment.`);
    // clearCart(); // You might want to clear cart after successful payment in a real scenario
    // navigate('/order-confirmation'); // Navigate to an order confirmation page
    // For now, let's keep the cart so we can see the eSewa QR part next
    navigate('/payment-esewa'); // We'll create this route for the eSewa QR
  };


  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <h1>Checkout</h1>
      </header>

      <div className="checkout-content-wrapper">
        {/* Order Summary Section */}
        <section className="order-summary-section">
          <h2>Order Summary</h2>
          <div className="order-items-list">
            {cartItems.map(item => (
              <div key={item.id} className="order-item">
                <div className="order-item-image">
                  <img src={item.image || `https://placehold.co/80x80/e2e8f0/4a5568?text=${item.name.substring(0,8)}`} alt={item.name} />
                </div>
                <div className="order-item-details">
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className="order-item-price">
                  <p>Rs. {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="order-total">
            <h3>Total Amount:</h3>
            <p>Rs. {getCartTotal().toLocaleString()}</p>
          </div>
        </section>

        {/* Shipping Information Section (Placeholder) */}
        <section className="shipping-info-section">
          <h2>Shipping Information</h2>
          <form className="shipping-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" name="fullName" placeholder="Enter your full name" required />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" placeholder="Enter your shipping address" required />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" placeholder="Enter your city" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" required />
            </div>
          </form>
        </section>
      </div>

      {/* Payment Section Placeholder & Action */}
      <footer className="checkout-actions-footer">
         {/* This button will eventually trigger the display of the eSewa QR */}
        <button onClick={handlePlaceOrder} className="btn btn-primary btn-place-order">
          Proceed to eSewa Payment
        </button>
        <Link to="/cart" className="btn btn-secondary">Back to Cart</Link>
      </footer>
    </div>
  );
};

export default CheckoutPage;