import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ 
  name, 
  size = 6, 
  color = 'currentColor',
  className = '',
  ...props
}) => {
  // This is a simplified version that only has the cart icon for now
  const icons = {
    cart: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    ),
    // Add more icons as needed
  };

  if (!icons[name]) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-${size} w-${size} ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
      aria-hidden="true"
      {...props}
    >
      {icons[name]}
    </svg>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default Icon;
