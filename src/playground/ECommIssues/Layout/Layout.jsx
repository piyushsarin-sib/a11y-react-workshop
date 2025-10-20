import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = ({ totalItems, openCartModal }) => {

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-10 py-4 flex justify-between items-center" aria-label="Main Navigation">
        <Link to="/" className="text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md">
          Accessible eCommerce
        </Link>
        <button
          onClick={openCartModal}
          className="relative p-2 bg-blue-600 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`Open cart with ${totalItems} items`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              ({totalItems})
            </span>
          )}
        </button>
      </nav>
    </header>
  );
};

Header.propTypes = {
  totalItems: PropTypes.number.isRequired,
  openCartModal: PropTypes.func.isRequired,
};

const Footer = () => (
  <footer className="bg-gray-800 text-white mt-12">
    <div className="container mx-auto px-4 py-6">
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

const Layout = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const addToCart = (product, quantity) => {
    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity = quantity;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      
      return prevCart.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const openCartModal = () => {
    setIsCartModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  const openCheckoutModal = () => {
    setIsCheckoutModalOpen(true);
    setIsCartModalOpen(false);
  };

  const closeCheckoutModal = () => {
    setIsCheckoutModalOpen(false);
    setOrderPlaced(false);
    setIsProcessing(false);
  };

  const handleCheckout = () => {
    // Start processing animation
    setIsProcessing(true);
    console.log('Processing order:', cart);
    
    // Simulate processing delay
    setTimeout(() => {
      setOrderPlaced(true);
      setIsProcessing(false);
      // Clear cart after successful order
      setCart([]);
    }, 2000); // 2 second processing animation
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Create cart context value to pass to children
  const cartContextValue = {
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    totalItems,
    isCartModalOpen,
    openCartModal,
    closeCartModal,
    isCheckoutModalOpen,
    openCheckoutModal,
    closeCheckoutModal,
    handleCheckout,
    orderPlaced,
    isProcessing,
    clearCart
  };

  // Debug logging
  console.log('Layout cartContextValue:', cartContextValue);
  console.log('Layout cart:', cart);
  console.log('Layout totalItems:', totalItems);

  return (
    <div className="bg-gray-50">
      <Header totalItems={totalItems} openCartModal={openCartModal} />
      <main>
        {React.cloneElement(children, { cartContext: cartContextValue })}
      </main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;