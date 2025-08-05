// src/data/products.js

// Step 1: Import all your product images from src/assets at the top of the file.
// Make sure the filenames here exactly match your files in src/assets/
import iphone15proImg from '../assets/iphone15pro.jpg';
import samsungS24Img from '../assets/SamsungS24.jpg';
import sonyWH1000XM5Img from '../assets/Sony WH-1000XM5.jpg';
import macbookAirM3Img from '../assets/Apple MacBook Air M3.jpg';

// If you add detail images later, you would import them here too.
// For example: import iphoneDetail1 from '../assets/iphone_detail1.jpg';

// Step 2: Define and export your product data.
// Use the imported image variables for the 'image' property.
export const productsData = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    price: 170000,
    image: iphone15proImg, // Use the imported variable
    description: "The iPhone 15 Pro Max features a stunning ProMotion XDR display, the powerful A17 Bionic chip, an advanced triple-camera system for pro-level photography and videography, and incredible battery life. Experience the pinnacle of smartphone technology.",
    specifications: [
      { name: "Display", value: "6.7-inch Super Retina XDR display with ProMotion" },
      { name: "Chip", value: "A17 Bionic chip with Neural Engine" },
      { name: "Camera", value: "Pro 48MP Main, Ultra Wide, and Telephoto cameras" },
      { name: "Storage Options", value: "256GB, 512GB, 1TB" },
      { name: "Operating System", value: "iOS 17" }
    ],
    category: "Mobiles",
    // If you add a gallery later, it would look like this:
    // images: [iphoneDetail1, iphoneDetail2],
  },
  {
    id: "2",
    name: "Samsung Galaxy S24",
    price: 150000,
    image: samsungS24Img, // Use the imported variable
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
    image: sonyWH1000XM5Img, // Use the imported variable
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
    image: macbookAirM3Img, // Use the imported variable
    description: "The new MacBook Air with the M3 chip delivers even more performance and capability. With its incredibly thin and light design, it offers up to 18 hours of battery life.",
    specifications: [
      { name: "Chip", value: "Apple M3 chip" },
      { name: "Display", value: "13.6-inch Liquid Retina display" },
      { name: "Memory", value: "8GB unified memory (configurable up to 24GB)" },
      { name: "Storage", value: "256GB SSD (configurable up to 2TB)" },
    ],
    category: "Laptops"
  },
];