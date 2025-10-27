import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

/**
 * Accessible quantity selector component with increment and decrement buttons
 * Uses aria-disabled instead of disabled for better accessibility
 */
const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
  minQuantity = 0,
  maxQuantity = 99,
  className = '',
  disabled = false,
  ariaLabel = 'Quantity selector',
  size = 'medium',
}) => {
  const [feedbackMessage, setFeedbackMessage] = React.useState('');

  const handleDecrease = () => {
    // Check if at minimum
    if (quantity <= minQuantity || disabled) {
      // Provide feedback instead of doing nothing
      setFeedbackMessage(`Minimum quantity is ${minQuantity}`);
      setTimeout(() => setFeedbackMessage(''), 2000);
      return;
    }
    onDecrease();
  };

  const handleIncrease = () => {
    // Check if at maximum
    if (quantity >= maxQuantity || disabled) {
      // Provide feedback instead of doing nothing
      setFeedbackMessage(`Maximum quantity is ${maxQuantity}`);
      setTimeout(() => setFeedbackMessage(''), 2000);
      return;
    }
    onIncrease();
  };

  const isDecreaseDisabled = quantity <= minQuantity || disabled;
  const isIncreaseDisabled = quantity >= maxQuantity || disabled;

  // Size variants for the component
  const sizeClasses = {
    small: {
      container: 'h-8',
      button: 'px-2 py-1 text-sm',
      value: 'px-3 py-1',
    },
    medium: {
      container: 'h-10',
      button: 'px-4 py-2',
      value: 'px-6 py-2',
    },
    large: {
      container: 'h-12',
      button: 'px-5 py-3 text-lg',
      value: 'px-8 py-3',
    },
  };

  const currentSize = sizeClasses[size] || sizeClasses.medium;

  return (
    <div className="relative inline-block">
      <fieldset 
        className={`flex items-center border-2 border-gray-400 rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md ${currentSize.container} ${className}`}
        aria-label={ariaLabel}
      >
        <legend className="sr-only">{ariaLabel}</legend>
        <Button
          onClick={handleDecrease}
          variant="ghost"
          className={`${currentSize.button} bg-gray-100 hover:bg-blue-50 active:bg-blue-100 text-gray-900 font-bold rounded-none border-r border-gray-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:z-10 transition-colors ${isDecreaseDisabled ? 'opacity-40 cursor-not-allowed hover:bg-gray-100' : ''}`}
          ariaLabel={isDecreaseDisabled ? `Decrease quantity (minimum reached: ${minQuantity})` : "Decrease quantity"}
          aria-disabled={isDecreaseDisabled}
        >
          −
        </Button>
        <output 
          className={`${currentSize.value} bg-white font-bold text-gray-900 text-center flex items-center justify-center border-r border-gray-300`} 
          aria-live="polite"
          aria-atomic="true"
          style={{ minWidth: "50px" }}
        >
          {quantity}
        </output>
        <Button
          onClick={handleIncrease}
          variant="ghost"
          className={`${currentSize.button} bg-gray-100 hover:bg-blue-50 active:bg-blue-100 text-gray-900 font-bold rounded-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:z-10 transition-colors ${isIncreaseDisabled ? 'opacity-40 cursor-not-allowed hover:bg-gray-100' : ''}`}
          ariaLabel={isIncreaseDisabled ? `Increase quantity (maximum reached: ${maxQuantity})` : "Increase quantity"}
          aria-disabled={isIncreaseDisabled}
        >
          +
        </Button>
      </fieldset>
      
      {/* Feedback tooltip for limit reached */}
      {feedbackMessage && (
        <div
          role="alert"
          aria-live="assertive"
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded shadow-lg whitespace-nowrap z-20 animate-fade-in"
        >
          {feedbackMessage}
        </div>
      )}
    </div>
  );
};

QuantitySelector.propTypes = {
  quantity: PropTypes.number.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  minQuantity: PropTypes.number,
  maxQuantity: PropTypes.number,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  ariaLabel: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default QuantitySelector;
