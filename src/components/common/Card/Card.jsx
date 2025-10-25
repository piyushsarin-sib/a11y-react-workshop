import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  children,
  className = '',
  elevated = false,
  ...props
}) => {
  const baseStyles = 'bg-white rounded-lg overflow-hidden';
  const elevationStyles = elevated ? 'shadow-md hover:shadow-lg transition-shadow' : 'border border-gray-300';
  
  return (
    <div 
      className={`${baseStyles} ${elevationStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  elevated: PropTypes.bool,
};

export default Card;
