import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import { CartProvider } from '../../../context/CartContext.jsx';

const Layout = ({ children }) => {
  return (
    <CartProvider>
      <div className="bg-gray-50">
        <Header />
        <main>{children}</main>
        <Footer />
        {/* We'll handle CartModal in the specific route */}
      </div>
    </CartProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
