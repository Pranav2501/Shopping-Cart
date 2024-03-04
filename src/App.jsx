import React from 'react';

import Footer from './templates/Footer';
import Header from './templates/Header';
import Navbar from './templates/Navbar';


function App() {
  return (
    <div>
      <Header />
      <Navbar />
      <h1>Welcome to Shopping Cart App</h1>
      <p>Click on the links in the navbar, Table is used to add, delete, update items in the main database. Use the Cart link to add shopping items to the cart.</p>
      <Footer />
    </div>
  );
}

export default App;