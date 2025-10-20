import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../../../context/CartContextCore';
import Modal from '@lib/Modal';
import Button from '@common/Button';
import QuantitySelector from '@common/QuantitySelector';

const AddToCartModal = ({ product, onAddToCart, onClose, modalState }) => {
  const [quantity, setQuantity] = useState(0);
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

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleAddToCart = () => {
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
      return 'No items to add';
    } else {
      return 'Update Cart';
    }
  };

  const isGoToCartDisabled = quantity === 0 && !cart.some(item => item.id === product.id);
  const isAddToCartDisabled = quantity === 0 && !cart.some(item => item.id === product.id);

  return (
    <Modal
      {...modalState}
      close={handleClose}
      title={product.name}
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
        
        {/* Live region for quantity updates */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {quantity > 0 && `${product.name} quantity: ${quantity}`}
          {quantity === 0 && cart.some(item => item.id === product.id) && `${product.name} will be removed from cart`}
        </div>
        
        <div className="flex justify-between items-center mb-4">
          {quantity === 0 && (
            <p className="text-red-600 text-sm">Setting quantity to 0 will remove the item from cart</p>
          )}
        </div>
        <div className="flex justify-end mb-4">
          <Button
            onClick={handleAddToCart}
            variant={isAddToCartDisabled ? "secondary" : "primary"}
            className={isAddToCartDisabled ? "opacity-50" : ""}
            disabled={isAddToCartDisabled}
            ariaLabel={getButtonText()}
          >
            {getButtonText()}
          </Button>
        </div>
        <div className="text-center mt-4 border-t pt-3">
          <Button
            onClick={handleGoToCart}
            variant="ghost"
            className={`text-lg ${isGoToCartDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800 underline'}`}
            disabled={isGoToCartDisabled}
            ariaLabel="Go to Cart"
          >
            Go to Cart
          </Button>
        </div>
      </div>
    </Modal>
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
