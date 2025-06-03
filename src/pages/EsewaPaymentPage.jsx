// src/pages/EsewaPaymentPage.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import '../css/EsewaPaymentPage.css';
import esewaQrImageFile from '../assets/esewa.png'; 


const EsewaPaymentPage = () => {
  const { getCartTotal, cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const totalAmount = getCartTotal();

  // Use the imported image
  const esewaQrCodeImageUrl = esewaQrImageFile; // <--- ASSIGN THE IMPORTED IMAGE

  if (cartItems.length === 0 && totalAmount === 0) {
    return (
      <div className="esewa-payment-page empty-payment">
        <h2>No Order to Pay For</h2>
        <p>Your cart is empty. Please add items to your cart before proceeding to payment.</p>
        <Link to="/" className="btn btn-primary">Go to Homepage</Link>
      </div>
    );
  }

  const handlePaymentConfirmed = () => {
    alert(
      `Payment Instructions:\n1. Scan the QR code with your eSewa app.\n2. Pay Rs. ${totalAmount.toLocaleString()}.\n3. After payment, please note your eSewa Transaction ID.\n4. Contact support@gadgetify.com with your Order ID and Transaction ID to confirm your order.\n\n(This is a simulation. Clicking OK will clear your cart and redirect you.)`
    );
    clearCart();
    navigate('/order-success');
  };

  return (
    <div className="esewa-payment-page">
      <header className="payment-header">
        <h1>eSewa Payment</h1>
        <p className="payment-subheader">Complete your purchase by scanning the QR code.</p>
      </header>

      <div className="payment-details-container">
        <div className="qr-code-section">
          <h2>Scan to Pay with eSewa</h2>
          <div className="qr-image-wrapper">
            {/* Use the esewaQrCodeImageUrl variable for the src attribute */}
            <img src={esewaQrCodeImageUrl} alt="eSewa QR Code" />
          </div>
          <div className="amount-to-pay">
            <h3>Total Amount:</h3>
            <p className="total-amount-value">Rs. {totalAmount.toLocaleString()}</p>
          </div>
        </div>

        <div className="payment-instructions-section">
          <h2>Payment Instructions</h2>
          <ol className="instructions-list">
            <li>Open your eSewa mobile application.</li>
            <li>Tap on the 'Scan & Pay' or QR icon.</li>
            <li>Align your camera to scan the QR code displayed on this page.</li>
            <li>
              Verify the merchant name is "Gadgetify" (or your registered merchant name).
            </li>
            <li>
              Enter the exact amount: <strong>Rs. {totalAmount.toLocaleString()}</strong>
            </li>
            <li>Complete the payment using your eSewa MPIN or fingerprint.</li>
          </ol>

          <div className="after-payment-info">
            <h3><i className="fas fa-exclamation-circle"></i> After Successful Payment:</h3>
            <p>
              Please take a screenshot of your payment confirmation or note down the
              <strong> eSewa Transaction ID</strong>.
            </p>
            <p>
              To confirm your order, please email your <strong>Order ID</strong> (you would typically generate this on the checkout page or backend) and your <strong>eSewa Transaction ID</strong> to:
            </p>
            <p className="contact-email">support@gadgetify.com</p>
            <p className="processing-note">
              Your order will be processed once payment is manually verified.
            </p>
          </div>
        </div>
      </div>

      <footer className="payment-actions-footer">
        <button onClick={handlePaymentConfirmed} className="btn btn-success btn-confirm-simulated">
          I Have Paid (Simulated Confirmation)
        </button>
        <Link to="/checkout" className="btn btn-secondary">Back to Checkout</Link>
      </footer>
    </div>
  );
};

export default EsewaPaymentPage;