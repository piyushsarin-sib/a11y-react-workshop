import React from "react";
import Link from "../../../components/common/Link";
import CartButton from "../../../components/features/Cart/CartButton";

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Skip links - should be first focusable elements */}
      <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-0 focus-within:left-0 focus-within:z-50 focus-within:bg-blue-600 focus-within:text-white focus-within:p-3 focus-within:rounded-br-md focus-within:shadow-lg">
        <a 
          href="#main-content" 
          className="skip-link inline-block whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-white rounded px-3 py-2"
        >
          Skip to main content
        </a>
        <a 
          href="#footer" 
          className="skip-link inline-block whitespace-nowrap ml-3 focus:outline-none focus:ring-2 focus:ring-white rounded px-3 py-2"
        >
          Skip to footer
        </a>
      </div>
      
      <nav
        className="container mx-auto px-10 py-4 flex justify-between items-center"
        aria-label="Main navigation"
      >
        <div className="flex items-center space-x-3">
          {/* Logo / Home link */}
          <Link
            to="/"
            className="text-2xl font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Accessible eCommerce, Link Go to homepage"
          >
            Accessible eCommerce
          </Link>
        </div>
        {/* Cart button */}
        <CartButton aria-label="View shopping cart" />
      </nav>
    </header>
  );
};

export default Header;
