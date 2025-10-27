import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../../../context/CartContextCore';
import { DialogOverlay } from '@lib/Overlay';
import Button from '@common/Button';
import QuantitySelector from '@common/QuantitySelector';

const AddToCartModal = ({ product, onAddToCart, onClose, modalState }) => {
  const [quantity, setQuantity] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const { openCartModal, cart, removeFromCart } = useContext(CartContext);
  
  // Check if product is already in cart and set initial quantity
  useEffect(() => {
    if (product && cart) {
      const existingItem = cart.find(item => item.id === product.id);
      if (existingItem) {
        setQuantity(existingItem.quantity);
      }
    }
  }, [product, cart]);

  // Clear error message when quantity changes
  useEffect(() => {
    if (quantity > 0 || cart.some(item => item.id === product.id)) {
      setErrorMessage('');
    }
  }, [quantity, cart, product]);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleClose = () => {
    setErrorMessage(''); // Clear error on close
    onClose();
  };

  const handleAddToCart = () => {
    // Check if action is valid
    const isInCart = cart.some(item => item.id === product.id);
    if (quantity === 0 && !isInCart) {
      // Show error message instead of disabling
      setErrorMessage('Please select a quantity before adding to cart');
      return;
    }

    if (quantity === 0) {
      // If quantity is zero, remove item from cart
      console.log('Removing product from cart:', product.id);
      removeFromCart(product.id);
    } else {
      // Pass the exact quantity to be set
      console.log('Adding/updating product in cart:', product.id, 'quantity:', quantity);
      onAddToCart(product, quantity);
    }
    handleClose();
  };

  const handleGoToCart = () => {
    // Check if action is valid
    const isInCart = cart.some(item => item.id === product.id);
    if (quantity === 0 && !isInCart) {
      // Show error message instead of disabling
      setErrorMessage('Please select a quantity before proceeding to cart');
      return;
    }

    if (quantity === 0) {
      // If quantity is zero, remove item from cart
      console.log('Removing product from cart in handleGoToCart:', product.id);
      removeFromCart(product.id);
    } else {
      // Pass the exact quantity to be set
      console.log('Adding/updating product in cart in handleGoToCart:', product.id, 'quantity:', quantity);
      onAddToCart(product, quantity);
    }
    handleClose();
    openCartModal();
  };

  if (!product) {
    return null;
  }

  const getButtonText = () => {
    if (quantity === 0 && cart.some(item => item.id === product.id)) {
      return 'Remove from Cart';
    } else if (quantity === 0 && !cart.some(item => item.id === product.id)) {
      return 'Add to Cart';
    } else {
      return quantity > 0 ? `Update Cart (${quantity})` : 'Update Cart';
    }
  };

  const isInCart = cart.some(item => item.id === product.id);

  return (
    <DialogOverlay
      {...modalState}
      close={handleClose}
      title={product.name}
      backdrop
      style={{ width: '600px' }}
    >
      <div className="mb-4">
        <p className="mb-4">{product.description}</p>
        <div className="flex items-center justify-between mb-6">
          <span className="text-xl font-bold">{product.price}</span>
          
          {/* Quantity Selector */}
          <QuantitySelector
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            minQuantity={0}
            ariaLabel={`Quantity selector for ${product.name}`}
          />
        </div>
        
        {/* Error message for accessibility (instead of disabled buttons) */}
        {errorMessage && (
          <div
            className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm"
            role="alert"
            aria-live="assertive"
          >
            {errorMessage}
          </div>
        )}
        
        {/* Live region for quantity updates */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {quantity > 0 && `${product.name} quantity: ${quantity}`}
          {quantity === 0 && isInCart && `${product.name} will be removed from cart`}
        </div>
        
        <div className="flex justify-end mb-4">
          <Button
            onClick={handleAddToCart}
            variant={quantity === 0 && !isInCart ? "secondary" : "primary"}
            className={quantity === 0 && isInCart ? "bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700" : ""}
            ariaLabel={getButtonText()}
          >
            {getButtonText()}
          </Button>
        </div>
        <div className="text-center mt-4 border-t pt-3">
          <Button
            onClick={handleGoToCart}
            variant="ghost"
            className="text-lg text-blue-600 hover:text-blue-800 underline"
            ariaLabel="Go to Cart"
          >
            Go to Cart
          </Button>
        </div>
      </div>
    </DialogOverlay>
  );
};

AddToCartModal.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }),
  onAddToCart: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  modalState: PropTypes.object.isRequired,
};

export default AddToCartModal;
