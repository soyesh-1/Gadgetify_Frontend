// src/pages/ProductDetailPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import '../css/ProductDetailPage.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  // Find the product from the global list fetched by the context
  const product = products.find(p => p._id === productId);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading product details...</div>;
  }

  if (error) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>Error: {error}</div>;
  }

  if (!product) {
    return (
      <div className="product-detail-page not-found">
        <h2>Product Not Found</h2>
        <p>Sorry, we couldn't find the product you're looking for.</p>
        <Link to="/" className="btn btn-primary">Go to Homepage</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="product-detail-page">
      <nav aria-label="breadcrumb" className="breadcrumb-nav">
        <ol>
          <li><Link to="/">Home</Link></li>
          <li><Link to="#">{product.category}</Link></li>
          <li aria-current="page">{product.name}</li>
        </ol>
      </nav>
      <div className="product-layout">
        <div className="product-gallery">
          <div className="main-image-container">
            {/* --- FIX --- */}
            <img 
              src={`http://localhost:5005${product.image}`}
              alt={product.name} 
              className="main-product-image"
            />
          </div>
        </div>
        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price">Rs. {product.price.toLocaleString()}</p>
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
          
          {/* Restored Specifications Table */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="product-specifications">
              <h3>Specifications</h3>
              <table>
                <tbody>
                  {product.specifications.map((spec, index) => (
                    <tr key={index}>
                      <td>{spec.name}</td>
                      <td>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button onClick={handleAddToCart} className="btn btn-primary add-to-cart-detail">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
