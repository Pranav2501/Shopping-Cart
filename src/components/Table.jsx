// src/Table.jsx
import React, { useState } from 'react';
import Products from './Products';

import Header from '../templates/Header';
import Navbar from '../templates/Navbar';
import Footer from '../templates/Footer';
import '../components/Table.css';

function Table() {
    const { products, addProduct, deleteProduct, updateProduct } = Products();
    const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });

    const handleInputChange = (event) => {
        setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
    };

    const handleAddProduct = () => {
        addProduct(newProduct);
        setNewProduct({ name: '', price: '', image: '' });
    };

    const handleUpdateProduct = (product) => {
        setNewProduct(product);
    };

    const handleSaveUpdate = () => {
        updateProduct(newProduct);
        setNewProduct({ name: '', price: '', image: '' });
    };

    return (
        <div>
        <Header />
        <Navbar />
            <div className="scrollable-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td><img src={product.image} alt={product.name} /></td>
                                <td>
                                    <button onClick={() => deleteProduct(product.name)}>Delete</button>
                                    <button onClick={() => handleUpdateProduct(product)}>Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <input name="name" value={newProduct.name} onChange={handleInputChange} placeholder="Name" />
                <input name="price" value={newProduct.price} onChange={handleInputChange} placeholder="Price" />
                <input name="image" value={newProduct.image} onChange={handleInputChange} placeholder="Image" />
                <button onClick={handleAddProduct}>Add Product</button>
                <button onClick={handleSaveUpdate}>Save Update</button>
            </div>
        <Footer />
        </div>
    );
}

export default Table;