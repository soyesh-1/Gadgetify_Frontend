// src/pages/WishlistPage.jsx
import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import '../css/WishlistPage.css'; // We'll create this CSS file next
import '../css/Homepage.css';   // Reuse product card styles

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, loading } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    // Automatically remove from wishlist after adding to cart
    removeFromWishlist(product._id);
    alert(`${product.name} moved to cart!`);
  };

  if (loading) {
    return <div className="loading-message">Loading your wishlist...</div>;
  }

  return (
    <div className="wishlist-container">
      <h1>My Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <p>Your wishlist is empty.</p>
          <p>Click the heart icon on any product to save it for later.</p>
          <Link to="/" className="btn-shop">Continue Shopping</Link>
        </div>
      ) : (
        <div className="product-grid">
          {wishlist.map((product) => (
            <div key={product._id} className="product-card wishlist-card">
              <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={`http://localhost:5005${product.image}`} alt={product.name} />
                <h3>{product.name}</h3>
              </Link>
              <p>Rs. {product.price.toLocaleString()}</p>
              <div className="wishlist-card-actions">
                <button onClick={() => handleMoveToCart(product)} className="btn-add-to-cart">Move to Cart</button>
                <button onClick={() => removeFromWishlist(product._id)} className="btn-remove-wishlist">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
