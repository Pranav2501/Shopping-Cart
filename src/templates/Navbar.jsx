import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/table">Table</Link>
            <Link to="/card">Cart</Link>
        </nav>
    );
}

export default Navbar;