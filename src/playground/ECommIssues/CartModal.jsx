/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from "prop-types";
import Button from "@common/Button";
import QuantitySelector from "@common/QuantitySelector";
import Modal from "./Modal";

const CartModal = ({
  cart,
  isOpen,
  onClose,
  removeFromCart,
  updateCartItemQuantity,
  onCheckout,
}) => {
  const totalPrice = cart.reduce((sum, item) => {
    const priceText =
      typeof item.price === "string" ? item.price.replace(/[^\d.-]/g, "") : item.price;
    const priceValue = parseFloat(priceText);
    return sum + priceValue * item.quantity;
  }, 0);

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Your Cart"
      style={{ width: "90%", maxWidth: "900px" }}
    >
      {cart.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Button onClick={onClose} variant="primary">
            Continue Shopping
          </Button>
        </div>
      ) : (
        <>
          <div className="divide-y">
            {cart.map((item) => (
              <div key={item.id} className="py-4 flex items-center">
                <div className="h-20 w-20 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="flex justify-between mt-1">
                    <p className="text-gray-600">{item.price}</p>
                    <QuantitySelector
                      quantity={item.quantity}
                      onIncrease={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                      onDecrease={() =>
                        updateCartItemQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      minQuantity={1}
                      size="small"
                      ariaLabel={`Quantity selector for ${item.name}`}
                    />
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-500 p-1"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total:</span>
              <span className="font-bold">Rs {totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <Button
                onClick={() => cart.forEach((item) => removeFromCart(item.id))}
                variant="secondary"
                ariaLabel="Clear cart"
              >
                Clear Cart
              </Button>
              <div
                onClick={onCheckout}
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 cursor-pointer"
                ariaLabel="Proceed to checkout"
              >
                Checkout
              </div>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

CartModal.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateCartItemQuantity: PropTypes.func.isRequired,
  onCheckout: PropTypes.func.isRequired,
};

export default CartModal;

