import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyles = 'flex items-center justify-center rounded-full text-xs font-bold';
  
  const variantStyles = {
    primary: 'bg-blue-600 text-white',
    secondary: 'bg-gray-600 text-white',
    danger: 'bg-red-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
  };
  
  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <span className={styles} {...props}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'warning']),
  className: PropTypes.string,
};

export default Badge;
