import React, { useState, useContext } from 'react';
import { CartContext } from '../../../context/CartContextCore';
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import Input from '../../common/Input';

/**
 * CartModal component with form functionality for customer information
 * Uses common components like Modal, Button, and Input
 */
const CartModalWithForm = () => {
  const context = useContext(CartContext);
  const [formErrors, setFormErrors] = useState({});
  
  // If context is undefined, don't render anything
  if (!context) {
    console.warn('CartContext is undefined in CartModal');
    return null;
  }
  
  const { 
    cart, 
    totalItems, 
    totalPrice = cart.reduce((sum, item) => {
      // Extract the numeric part from the price string
      const priceText = typeof item.price === 'string' ? item.price.replace(/[^\d.-]/g, '') : item.price;
      const priceValue = parseFloat(priceText);
      return sum + (priceValue * item.quantity);
    }, 0), 
    isCartModalOpen, 
    closeCartModal, 
    updateCartItemQuantity, 
    removeFromCart,
    customerInfo = { name: '', phone: '' },
    updateCustomerInfo = () => {},
    placeOrder
  } = context;

  const handleQuantityChange = (productId, newQuantity) => {
    updateCartItemQuantity(productId, Math.max(1, newQuantity));
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateCustomerInfo({ [name]: value });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!customerInfo.name?.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!customerInfo.phone?.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(customerInfo.phone.trim())) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (validateForm()) {
      placeOrder();
    }
  };

  return (
    <Modal
      isOpen={isCartModalOpen}
      onClose={closeCartModal}
      title={`Your Cart (${totalItems || cart.length} items)`}
      className="w-full max-w-4xl"
    >
      {cart.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-700 mb-4">Your cart is empty</p>
          <Button
            onClick={closeCartModal}
            variant="primary"
          >
            Continue Shopping
          </Button>
        </div>
      ) : (
        <>
          <div className="divide-y">
            {cart.map((item) => (
              <div key={item.id} className="py-4 flex items-center">
                <div className="h-20 w-20 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover rounded"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="flex justify-between mt-1">
                    <p className="text-gray-700">{item.price}</p>
                    <div className="flex items-center">
                      <Button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="px-2 border rounded-l"
                        ariaLabel={`Decrease quantity of ${item.name}`}
                        variant="ghost"
                        size="small"
                      >
                        -
                      </Button>
                      <span 
                        className="px-3 py-1 border-t border-b"
                        aria-live="polite"
                        aria-atomic="true"
                      >
                        {item.quantity}
                      </span>
                      <Button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-2 border rounded-r"
                        ariaLabel={`Increase quantity of ${item.name}`}
                        variant="ghost"
                        size="small"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => handleRemoveItem(item.id)}
                  className="ml-4 text-red-600 p-1"
                  ariaLabel={`Remove ${item.name} from cart`}
                  variant="ghost"
                  size="small"
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
                </Button>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total:</span>
              <span className="font-bold">Rs {totalPrice.toFixed(2)}</span>
            </div>
            
            {/* Customer Information Form */}
            <div className="border-t pt-4 mt-4">
              <h3 className="font-semibold mb-4">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  name="name"
                  label="Name"
                  value={customerInfo.name || ''}
                  onChange={handleInputChange}
                  error={formErrors.name || ''}
                  required={true}
                />
                <Input
                  type="tel"
                  name="phone"
                  label="Phone Number"
                  value={customerInfo.phone || ''}
                  onChange={handleInputChange}
                  error={formErrors.phone || ''}
                  required={true}
                  ariaDescribedBy="phone-hint"
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                />
                <div id="phone-hint" className="col-span-2 -mt-2 text-sm text-gray-700">
                  Please enter a 10-digit phone number
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button
                onClick={closeCartModal}
                variant="secondary"
                ariaLabel="Close cart"
              >
                Close
              </Button>
              <Button
                onClick={handlePlaceOrder}
                variant="primary"
                ariaLabel="Place your order"
              >
                Place Order
              </Button>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

export default CartModalWithForm;
