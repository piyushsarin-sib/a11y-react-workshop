import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

/**
 * Accessible quantity selector component with increment and decrement buttons
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
  const handleDecrease = () => {
    if (quantity > minQuantity && !disabled) {
      onDecrease();
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity && !disabled) {
      onIncrease();
    }
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
    <div 
      className={`flex items-center border-2 border-gray-400 rounded-md shadow overflow-hidden ${currentSize.container} ${className}`}
      aria-label={ariaLabel}
    >
      <Button
        onClick={handleDecrease}
        variant="ghost"
        className={`${currentSize.button} bg-gray-200 hover:bg-gray-300 text-black font-bold rounded-none focus:ring-offset-2 focus:z-10 ${isDecreaseDisabled ? 'opacity-50' : ''}`}
        ariaLabel="Decrease quantity"
        disabled={isDecreaseDisabled}
      >
        −
      </Button>
      <span 
        className={`${currentSize.value} bg-white font-semibold border-l border-r border-gray-400 text-center`} 
        aria-live="polite"
        style={{ minWidth: "40px" }}
      >
        {quantity}
      </span>
      <Button
        onClick={handleIncrease}
        variant="ghost"
        className={`${currentSize.button} bg-gray-200 hover:bg-gray-300 text-black font-bold rounded-none focus:ring-offset-2 focus:z-10 ${isIncreaseDisabled ? 'opacity-50' : ''}`}
        ariaLabel="Increase quantity"
        disabled={isIncreaseDisabled}
      >
        +
      </Button>
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
