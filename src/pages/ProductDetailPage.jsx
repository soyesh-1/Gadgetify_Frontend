// src/pages/ProductDetailPage.jsx
import React from 'react';
import { useParams, Link }
from 'react-router-dom';
import { useCart } from '../context/CartContext'; // To add to cart from detail page
// We'll need a data source for products. For now, let's assume we'll import it or define it here.
// import { featuredProducts } from './Homepage'; // Or a separate data file
import '../css/ProductDetailPage.css'; // We'll create this CSS file

// TEMPORARY: Define product data here or import from a shared file
// Ideally, this data would come from a context, API, or a shared data module.
const productsData = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    price: 170000,
    image: "/assets/iphone15pro.jpg", // Assuming images are in public/assets
    images: [ // Additional images for a gallery
      "/assets/iphone15pro_detail1.jpg",
      "/assets/iphone15pro_detail2.jpg",
      "/assets/iphone15pro_detail3.jpg",
    ],
    description: "The iPhone 15 Pro Max features a stunning ProMotion XDR display, the powerful A17 Bionic chip, an advanced triple-camera system for pro-level photography and videography, and incredible battery life. Experience the pinnacle of smartphone technology.",
    specifications: [
      { name: "Display", value: "6.7-inch Super Retina XDR display with ProMotion" },
      { name: "Chip", value: "A17 Bionic chip with Neural Engine" },
      { name: "Camera", value: "Pro 48MP Main, Ultra Wide, and Telephoto cameras" },
      { name: "Storage Options", value: "256GB, 512GB, 1TB" },
      { name: "Operating System", value: "iOS 17" }
    ],
    category: "Mobiles"
  },
  {
    id: "2",
    name: "Samsung Galaxy S24",
    price: 150000,
    image: "/assets/SamsungS24.jpg",
    images: ["/assets/SamsungS24_detail1.jpg", "/assets/SamsungS24_detail2.jpg"],
    description: "Discover the Samsung Galaxy S24, featuring cutting-edge AI capabilities, a brilliant Dynamic AMOLED 2X display, and a pro-grade camera system. Powered by the latest Snapdragon processor for unparalleled performance.",
    specifications: [
        { name: "Display", value: "6.2-inch Dynamic AMOLED 2X" },
        { name: "Processor", value: "Snapdragon 8 Gen 3 for Galaxy / Exynos 2400" },
        { name: "Camera", value: "50MP Wide, 12MP Ultra Wide, 10MP Telephoto" },
        { name: "RAM", value: "8GB / 12GB" },
    ],
    category: "Mobiles"
  },
  {
    id: "3",
    name: "Sony WH-1000XM5",
    price: 45000,
    image: "/assets/Sony WH-1000XM5.jpg",
    images: ["/assets/SonyWH1000XM5_detail1.jpg", "/assets/SonyWH1000XM5_detail2.jpg"],
    description: "Experience industry-leading noise cancellation with the Sony WH-1000XM5 wireless headphones. Enjoy exceptional sound quality, all-day comfort, and crystal-clear calls.",
    specifications: [
        { name: "Type", value: "Over-ear, Noise-cancelling" },
        { name: "Battery Life", value: "Up to 30 hours (NC on)" },
        { name: "Connectivity", value: "Bluetooth 5.2, Multipoint" },
    ],
    category: "Headphones"
  },
  {
    id: "4",
    name: "Apple MacBook Air M3",
    price: 210000,
    image: "/assets/Apple MacBook Air M3.jpg",
    images: ["/assets/MacBookAirM3_detail1.jpg", "/assets/MacBookAirM3_detail2.jpg"],
    description: "The new MacBook Air with the M3 chip delivers even more performance and capability. With its incredibly thin and light design, it offers up to 18 hours of battery life.",
    specifications: [
        { name: "Chip", value: "Apple M3 chip" },
        { name: "Display", value: "13.6-inch Liquid Retina display" },
        { name: "Memory", value: "8GB unified memory (configurable up to 24GB)" },
        { name: "Storage", value: "256GB SSD (configurable up to 2TB)" },
    ],
    category: "Laptops"
  },
  // Add more products if you like, or we can create a separate data file later
];


const ProductDetailPage = () => {
  const { productId } = useParams(); // Get productId from URL
  const { addToCart } = useCart();

  // Find the product by ID from our data source
  // Ensure productId from URL (string) is compared correctly with product.id (string in our data)
  const product = productsData.find(p => p.id === productId);

  // State for the main image shown
  const [mainImage, setMainImage] = React.useState('');

  React.useEffect(() => {
    if (product && product.image) {
      setMainImage(product.image); // Set initial main image
    }
  }, [product]);

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
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image // Pass the main image to the cart
    });
    // Optionally, add a toast notification here
    alert(`${product.name} added to cart!`);
  };

  const handleThumbnailClick = (imageSrc) => {
    setMainImage(imageSrc);
  };

  return (
    <div className="product-detail-page">
      <nav aria-label="breadcrumb" className="breadcrumb-nav">
        <ol>
          <li><Link to="/">Home</Link></li>
          <li><Link to={`/category/${product.category.toLowerCase()}`}>{product.category}</Link></li>
          <li aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <div className="product-layout">
        <div className="product-gallery">
          <div className="main-image-container">
            <img src={mainImage || `https://placehold.co/600x600/e2e8f0/4a5568?text=${product.name.substring(0,10)}`} alt={product.name} className="main-product-image" />
          </div>
          {product.images && product.images.length > 0 && (
            <div className="thumbnail-images">
              {/* Main product image as first thumbnail */}
              <img
                src={product.image || `https://placehold.co/100x100/e2e8f0/4a5568?text=Thumb`}
                alt={`${product.name} thumbnail main`}
                className={mainImage === product.image ? 'active' : ''}
                onClick={() => handleThumbnailClick(product.image)}
              />
              {product.images.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc || `https://placehold.co/100x100/e2e8f0/4a5568?text=Thumb`}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className={mainImage === imgSrc ? 'active' : ''}
                  onClick={() => handleThumbnailClick(imgSrc)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price">Rs. {product.price.toLocaleString()}</p>
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description || "No description available."}</p>
          </div>

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

      {/* We can add related products or reviews section later */}
    </div>
  );
};

export default ProductDetailPage;