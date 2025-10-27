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

  // Check if aria-disabled is passed (for better accessibility)
  const isAriaDisabled = props['aria-disabled'] === true || props['aria-disabled'] === 'true';

  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const handleClick = (e) => {
    // If aria-disabled is used, prevent action but allow focus
    if (isAriaDisabled) {
      e.preventDefault();
      return;
    }
    // Call onClick if provided and not disabled
    if (onClick && !disabled) {
      onClick(e);
    }
  };

  return (
    <button
      ref={ref}
      onClick={handleClick}
      className={styles}
      aria-label={ariaLabel}
      disabled={disabled && !isAriaDisabled} // Only use disabled if not using aria-disabled
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
  'aria-disabled': PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default Button;
