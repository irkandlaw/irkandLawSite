import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
    <ul className="flex justify-center space-x-4">
      <li>
        <Link to="/" className="text-white hover:text-gray-400">Home</Link>
      </li>
      <li>
        <Link to="/about" className="text-white hover:text-gray-400">About</Link>
      </li>
      <li>
        <Link to="/contact-us" className="text-white hover:text-gray-400">Contact Us</Link>
      </li>
      <li>
        <Link to="/offers" className="text-white hover:text-gray-400">Offers</Link>
      </li>
      <li>
        <Link to="/admin" className="text-white hover:text-gray-400">Admin</Link>
      </li>
    </ul>
  </nav>
  );
};

export default NavBar;
