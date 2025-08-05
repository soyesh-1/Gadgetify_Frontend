// src/pages/ManageProducts.jsx

import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import '../css/AdminPages.css';
import '../css/ProductForm.css';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const initialProductState = {
    name: '', description: '', price: '', category: '', stock: '', image: '', specifications: []
  };
  const [productFormData, setProductFormData] = useState(initialProductState);

  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();
  const API_URL_BASE = 'http://localhost:5005';

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL_BASE}/api/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductFormData(prevState => ({ ...prevState, [name]: value }));
  };
  
  const handleSpecChange = (index, e) => {
    const { name, value } = e.target;
    const newSpecs = [...productFormData.specifications];
    newSpecs[index][name] = value;
    setProductFormData(prevState => ({ ...prevState, specifications: newSpecs }));
  };

  const addSpecField = () => {
    setProductFormData(prevState => ({
      ...prevState,
      specifications: [...(prevState.specifications || []), { name: '', value: '' }],
    }));
  };

  const removeSpecField = (index) => {
    const newSpecs = [...productFormData.specifications];
    newSpecs.splice(index, 1);
    setProductFormData(prevState => ({ ...prevState, specifications: newSpecs }));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const response = await fetch(`${API_URL_BASE}/api/upload`, {
        method: 'POST',
        headers: { 'x-auth-token': user.token },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        // This will now catch the "Images Only!" message from the backend
        throw new Error(data.message || 'Image upload failed');
      }
      setProductFormData(prevData => ({ ...prevData, image: data.image }));
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setProductFormData(initialProductState);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setProductFormData({ ...product, specifications: product.specifications || [] });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (uploading) return alert("Please wait for image to finish uploading.");
    if (!productFormData.image) return alert("Please upload an image for the product.");

    const isEditing = !!editingProduct;
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `${API_URL_BASE}/api/products/${editingProduct._id}`
      : `${API_URL_BASE}/api/products`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json', 'x-auth-token': user.token },
        body: JSON.stringify(productFormData),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.msg || 'Request failed');
      }
      setIsModalOpen(false);
      fetchProducts();
      alert(`Product ${isEditing ? 'updated' : 'created'} successfully!`);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };
  
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure?')) {
      try {
        const response = await fetch(`${API_URL_BASE}/api/products/${productId}`, {
          method: 'DELETE',
          headers: { 'x-auth-token': user.token },
        });
        if (!response.ok) throw new Error('Failed to delete product');
        fetchProducts();
        alert('Product deleted successfully!');
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h1>Manage Products</h1>
        <button onClick={openAddModal} className="btn-primary-admin">Add New Product</button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingProduct ? 'Edit Product' : 'Add New Product'}>
        <form onSubmit={handleFormSubmit} className="product-form">
          <div className="form-group"><label>Product Name</label><input type="text" name="name" value={productFormData.name} onChange={handleInputChange} required /></div>
          <div className="form-group"><label>Product Image</label><input type="file" onChange={uploadFileHandler} required={!editingProduct && !productFormData.image} /><input type="text" name="image" placeholder="Image URL will appear here after upload" value={productFormData.image} readOnly/></div>
          <div className="form-group"><label>Description</label><textarea name="description" value={productFormData.description} onChange={handleInputChange} required /></div>
          <div className="form-group"><label>Price</label><input type="number" name="price" value={productFormData.price} onChange={handleInputChange} required /></div>
          <div className="form-group"><label>Category</label><select name="category" value={productFormData.category} onChange={handleInputChange} required><option value="">-- Select Category --</option><option value="Mobiles">Mobiles</option><option value="Laptops">Laptops</option><option value="Headphones">Headphones</option><option value="Gaming">Gaming</option><option value="Accessories">Accessories</option></select></div>
          <div className="form-group"><label>Stock</label><input type="number" name="stock" value={productFormData.stock} onChange={handleInputChange} required /></div>
          <div className="form-group">
            <label>Specifications</label>
            {productFormData.specifications && productFormData.specifications.map((spec, index) => (
              <div key={index} className="spec-field-group">
                <input type="text" name="name" placeholder="Spec Name (e.g., Display)" value={spec.name} onChange={(e) => handleSpecChange(index, e)} />
                <input type="text" name="value" placeholder="Spec Value (e.g., 6.7-inch OLED)" value={spec.value} onChange={(e) => handleSpecChange(index, e)} />
                <button type="button" onClick={() => removeSpecField(index)} className="btn-remove-spec">-</button>
              </div>
            ))}
            <button type="button" onClick={addSpecField} className="btn-add-spec">+ Add Specification</button>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary-admin" disabled={uploading}>{uploading ? 'Wait...' : (editingProduct ? 'Update Product' : 'Create Product')}</button>
          </div>
        </form>
      </Modal>

      {loading && <p className="loading-message">Loading products...</p>}
      {error && !loading && <p className="error-message">Error: {error}</p>}
      {!loading && !error && (
        <div className="admin-table-container">
          {products.length > 0 ? (
            <table className="admin-table">
              <thead><tr><th>Image</th><th>Name</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td><img src={`${API_URL_BASE}${product.image}`} alt={product.name} className="product-image-thumbnail"/></td>
                    <td>{product.name}</td>
                    <td>Rs. {product.price.toLocaleString()}</td>
                    <td>{product.stock}</td>
                    <td className="actions-cell">
                      <button onClick={() => openEditModal(product)} className="btn-edit">Edit</button>
                      <button onClick={() => handleDeleteProduct(product._id)} className="btn-delete">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-products-message">No products found. Add one to get started!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
