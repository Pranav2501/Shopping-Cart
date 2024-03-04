import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from '../Firebase/firebase.js'; // import your firebase config

// display products and add, delete, update products

function Products() {
    const [products, setProducts] = useState([]);
    // get products from firebase
    useEffect(() => {
        const fetchData = async () => {
            const data = await getDocs(collection(db, "products"));
            setProducts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        fetchData();
    }, []);

    // add product to firebase
    const addProduct = async (product) => {
        const docRef = await addDoc(collection(db, "products"), product);
        setProducts([...products, { ...product, id: docRef.id }]);
    };

    // delete product from firebase
    const deleteProduct = async (name) => {
        const q = query(collection(db, "products"), where("name", "==", name));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });
        setProducts(products.filter(product => product.name !== name));
    };

    // update product in firebase
    const updateProduct = async (updatedProduct) => {
        const productRef = doc(db, "products", updatedProduct.id);
        await updateDoc(productRef, updatedProduct);
        setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
    };

    return { products, addProduct, deleteProduct, updateProduct };
}

export default Products;