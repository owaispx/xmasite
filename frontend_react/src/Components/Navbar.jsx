// Navbar.js
import React from 'react';
import '../Styles/Navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div className="container">
        <div className="logo">
            <h2>Mr khan</h2>
        </div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/Createitems">Create</a></li>
          <li><a href="/Deleteuser">Delete</a></li>
          <li><a href="/Showitems">Showitems</a></li>
        </ul>
        <div className="auth-buttons">
        <Link to="/Register">Register</Link>
        <Link to="/Login"> Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
