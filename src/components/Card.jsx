import Header from '../templates/Header.jsx';
import Navbar from '../templates/Navbar.jsx';
import Footer from '../templates/Footer.jsx';

import React, { useState } from 'react';
import { collection, addDoc, deleteDoc, doc, query, where, getDocs, updateDoc } from "firebase/firestore";
import Products from './Products';
import CartTable from './CartTable';
import { db } from '../Firebase/firebase.js'; 

//display products and add to cart
function Card() {
    const { products } = Products();
    const [cart, setCart] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; 
    // firebase functions
    const addToCartFirebase = async (id, price) => {
        const q = query(collection(db, "cart"), where("id", "==", id));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0];
            const oldQuantity = docRef.data().quantity;
            await updateDoc(docRef.ref, { quantity: oldQuantity + 1 });
        } else {
            await addDoc(collection(db, "cart"), {
                id: id,
                price: price,
                quantity: 1
            });
        }
    };
    //firebase functions
    const removeFromCartFirebase = async (id) => {
        const q = query(collection(db, "cart"), where("id", "==", id));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0];
            const oldQuantity = docRef.data().quantity;
            if (oldQuantity > 1) {
                await updateDoc(docRef.ref, { quantity: oldQuantity - 1 });
            } else {
                await deleteDoc(docRef.ref);
            }
        }
    };
    //add to cart
    const addToCart = (id, price) => {
        setCart(prevCart => ({ ...prevCart, [id]: (prevCart[id] || 0) + 1 }));
        addToCartFirebase(id, price);
    };
    //remove from cart
    const removeFromCart = (id) => {
        setCart(prevCart => {
            const newCart = { ...prevCart };
            if (newCart[id] > 1) {
                newCart[id]--;
            } else {
                delete newCart[id];
            }
            return newCart;
        });
        removeFromCartFirebase(id);
    };
    //function to calculate total
    const calculateTotal = () => {
        return Object.entries(cart).reduce((total, [id, quantity]) => {
            const product = products.find(product => product.id === id);
            return total + product.price * quantity;
        }, 0);
    };
    //function to change page
    const changePage = (newPage) => {
        setCurrentPage(newPage);
    };
    //function to paginate products
    const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    //returning the products
    return (
        <div>
        <Header />
        <Navbar />
            {paginatedProducts.map((product) => (
                <div key={product.id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
                    <h2>Product Name: {product.name}</h2>
                    <p>Price:{product.price}</p>
                    <img src={product.image} alt={product.name} />
                    <button onClick={() => addToCart(product.id, product.price)}>Add to Cart</button>
                    <button onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
                </div>
            ))}
            <div>
                <button onClick={() => changePage(1)} disabled={currentPage === 1}>First</button>
                <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === Math.ceil(products.length / itemsPerPage)}>Next</button>
                <button onClick={() => changePage(Math.ceil(products.length / itemsPerPage))} disabled={currentPage === Math.ceil(products.length / itemsPerPage)}>Last</button>
            </div>
            <div>
                <h2>Total: {calculateTotal()}</h2>
            </div>
            <CartTable cart={cart} products={products} />
        <Footer />
        </div>
    );
}

export default Card;