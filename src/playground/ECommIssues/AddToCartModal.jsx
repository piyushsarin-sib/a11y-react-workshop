import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@common/Button";
import QuantitySelector from "@common/QuantitySelector";
import Modal from "./Modal";

const AddToCartModal = ({ product, onAddToCart, onClose, isOpen, cart, openCartModal }) => {
  const [quantity, setQuantity] = useState(1);

  // Set quantity based on cart status when modal opens
  useEffect(() => {
    if (isOpen && product) {
      const existingItem = cart.find((item) => item.id === product.id);
      if (existingItem && existingItem.quantity > 0) {
        setQuantity(existingItem.quantity);
      } else {
        setQuantity(0); // Start with zero for new items
      }
    }
  }, [isOpen, product, cart]);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose(); // Close modal after adding to cart
  };

  const handleGoToCart = () => {
    onClose();
    openCartModal();
  };

  if (!isOpen || !product) {
    return null;
  }

  // Check if item is already in cart with quantity > 0
  const existingItem = cart.find((item) => item.id === product.id);
  const isInCart = !!existingItem && existingItem.quantity > 0;

  // Button text and aria label logic
  const getButtonText = () => {
    if (quantity === 0 && isInCart) return "Remove from Cart";
    if (quantity === 0) return "Select Quantity";
    if (isInCart) return `Update Cart`;
    return "Add to Cart";
  };

  const getAriaLabel = () => {
    if (quantity === 0 && isInCart) return "Remove from cart";
    if (quantity === 0) return "Select quantity to add to cart";
    if (isInCart) return "Update cart quantity";
    return "Add to Cart";
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product.name}
      style={{ width: "90%", maxWidth: "700px" }}
    >
      <div className="mb-4">
        <p className="mb-4">{product.description}</p>
        <div className="flex items-center justify-between mb-6">
          <span className="text-xl font-bold">{product.price}</span>

          <QuantitySelector
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            minQuantity={0}
            ariaLabel={`Quantity selector for ${product.name}`}
          />
        </div>

        <div className="flex justify-end mb-4">
          <Button
            onClick={handleAddToCart}
            variant={quantity === 0 && isInCart ? "secondary" : "primary"}
            disabled={quantity === 0 && !isInCart}
            ariaLabel={getAriaLabel()}
            className={`${quantity === 0 && !isInCart ? "opacity-50 cursor-not-allowed" : ""} ${
              quantity === 0 && isInCart
                ? "bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700"
                : ""
            }`}
          >
            {getButtonText()}
          </Button>
        </div>

        {/* Go to Cart Link */}
        <div className="text-center mt-4 pt-4 border-t">
          <button
            onClick={handleGoToCart}
            tabIndex="-1"
            className="text-blue-600 hover:text-blue-800 underline text-sm font-medium focus:outline-none rounded-md px-2 py-1"
            aria-label="Go to cart"
          >
            Go to Cart
          </button>
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
    price: PropTypes.string.isRequired,
  }),
  onAddToCart: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  cart: PropTypes.array.isRequired,
  openCartModal: PropTypes.func.isRequired,
};

export default AddToCartModal;

