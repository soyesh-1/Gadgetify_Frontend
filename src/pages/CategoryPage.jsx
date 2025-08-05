// src/pages/CategoryPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import '../css/CategoryPage.css'; // We'll create this CSS file next
import '../css/Homepage.css'; // Reuse product card styles from homepage

const CategoryPage = () => {
  const { categoryName } = useParams(); // Gets the category name from the URL, e.g., "Mobiles"
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  // Filter the products to show only the ones from the current category
  // We compare them in lowercase to avoid any casing issues
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === categoryName.toLowerCase()
  );

  const handleAddToCart = (product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="category-page-container">
      <div className="category-page-header">
        {/* The breadcrumb helps users navigate back */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span> {categoryName}
        </nav>
        <h1>{categoryName}</h1>
      </div>

      {loading && <p className="loading-message">Loading products...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      {!loading && !error && (
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img src={`http://localhost:5005${product.image}`} alt={product.name} />
                  <h3>{product.name}</h3>
                </Link>
                <p>Rs. {product.price.toLocaleString()}</p>
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            ))
          ) : (
            <p className="no-products-message">No products found in this category.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
