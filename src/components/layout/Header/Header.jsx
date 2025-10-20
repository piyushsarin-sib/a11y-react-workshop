import React from "react";
import Link from "../../common/Link";
import CartButton from "../../features/Cart/CartButton";

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav
        className="container mx-auto px-10 py-4 flex justify-between items-center"
        aria-label="Main navigation"
      >
        <div className="flex items-center space-x-3">
          {/* Logo / Home link */}
          <Link
            to="/"
            className="text-2xl font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Go to homepage"
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
