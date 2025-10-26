import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

const Link = ({
  children,
  to,
  external = false,
  className = '',
  ariaLabel,
  onClick,
  ...props
}) => {
  const baseStyles = 'focus:outline-none focus:ring-2 focus:ring-blue-500';
  const styles = `${baseStyles} ${className}`;

  if (external) {
    return (
      <a 
        href={to}
        className={styles}
        aria-label={ariaLabel}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <RouterLink
      to={to}
      className={styles}
      aria-label={ariaLabel}
      onClick={onClick}
      {...props}
    >
      {children}
    </RouterLink>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  external: PropTypes.bool,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  onClick: PropTypes.func,
};

export default Link;
