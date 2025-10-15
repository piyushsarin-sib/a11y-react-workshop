import React from 'react';
import Link from '../../common/Link';

const Footer = () => (
  <footer className="bg-gray-800 text-white mt-12">
    <div className="container mx-auto px-4 py-6">
      <a 
        href="#top" 
        className="block text-center mb-4 underline focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Skip to top of page"
      >
        Back to top
      </a>
      <nav aria-label="Footer Navigation">
        <ul className="flex justify-center space-x-6">
          <li><Link to="/" className="hover:underline">Help</Link></li>
          <li><Link to="/" className="hover:underline">Contact Us</Link></li>
          <li><Link to="/" className="hover:underline">Shipping & Returns</Link></li>
        </ul>
      </nav>
      <p className="text-center mt-4 text-sm">&copy; 2025 Brevo. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
