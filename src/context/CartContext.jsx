import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { OrderConfirmationModal } from '../components/features/OrderConfirmation';
import { CartContext } from './CartContextCore';
import { useDialog } from '../lib/Overlay';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '' });
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const cartModalState = useDialog({
    bodyId: 'cart-modal',
  });

  const addToCart = useCallback((product, quantity) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        // Replace the quantity instead of adding to it
        updatedCart[existingProductIndex].quantity = quantity;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  }, []);

  const updateCartItemQuantity = useCallback((productId, newQuantity) => {
    setCart((prevCart) => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      
      return prevCart.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    console.log('Removing item from cart with ID:', productId);
    setCart((prevCart) => {
      const newCart = prevCart.filter(item => item.id !== productId);
      console.log('Cart after removal:', newCart);
      return newCart;
    });
  }, []);

  const openCartModal = useCallback(() => {
    console.log('Opening cart modal...');
    cartModalState.open();
  }, [cartModalState]);

  const closeCartModal = useCallback(() => {
    cartModalState.close();
  }, [cartModalState]);
  
  const closeConfirmationModal = useCallback(() => {
    setIsConfirmationOpen(false);
    // Clear cart and customer info after confirmation modal is closed
    setCart([]);
    setCustomerInfo({ name: '', phone: '' });
  }, []);

  const updateCustomerInfo = useCallback((info) => {
    setCustomerInfo(prevInfo => ({ ...prevInfo, ...info }));
  }, []);

  const placeOrder = useCallback(() => {
    // This would typically connect to a backend service
    console.log('Placing order:', { items: cart, customer: customerInfo });
    // Close the cart modal
    closeCartModal();
    // Show the confirmation modal
    setIsConfirmationOpen(true);
    // Don't clear the cart yet - we'll do that when the confirmation modal is closed
  }, [cart, customerInfo, closeCartModal]);

  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => {
      // Extract the numeric part from the price string
      const priceText = item.price.replace(/[^\d.-]/g, '');
      const priceValue = parseFloat(priceText);
      
      // If there's a range (e.g., "Rs 1000–3000"), use the lower value
      const finalPrice = isNaN(priceValue) ? 0 : priceValue;
      
      return total + (finalPrice * item.quantity);
    }, 0);
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      updateCartItemQuantity,
      removeFromCart,
      totalItems,
      totalPrice,
      cartModalState,
      openCartModal,
      closeCartModal,
      customerInfo,
      updateCustomerInfo,
      placeOrder,
      isConfirmationOpen,
      closeConfirmationModal
    }),
    [
      cart,
      addToCart,
      updateCartItemQuantity,
      removeFromCart,
      totalItems,
      totalPrice,
      cartModalState,
      openCartModal,
      closeCartModal,
      customerInfo,
      updateCustomerInfo,
      placeOrder,
      isConfirmationOpen,
      closeConfirmationModal
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      {isConfirmationOpen && <OrderConfirmationModal onClose={closeConfirmationModal} />}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
