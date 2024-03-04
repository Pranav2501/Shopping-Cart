// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsse7BfrnTNBXzzSsceVERfNH7BnENYOw",
  authDomain: "shopping-cart-b6bac.firebaseapp.com",
  projectId: "shopping-cart-b6bac",
  storageBucket: "shopping-cart-b6bac.appspot.com",
  messagingSenderId: "235938404280",
  appId: "1:235938404280:web:e9067210b09be1daa7a14d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };