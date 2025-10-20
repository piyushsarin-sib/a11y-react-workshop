import React from 'react';
import PropTypes from 'prop-types';

const Button = React.forwardRef(({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  ariaLabel,
  className = '',
  disabled = false,
  type = 'button',
  ...props
}, ref) => {
  const baseStyles = 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded';

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    ghost: 'bg-transparent hover:bg-gray-100',
  };

  const sizeStyles = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };

  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={styles}
      aria-label={ariaLabel}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;
