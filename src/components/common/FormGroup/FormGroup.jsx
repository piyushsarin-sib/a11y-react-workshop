import React from 'react';
import PropTypes from 'prop-types';

/**
 * FormGroup component for consistent form layout and accessibility features
 */
const FormGroup = ({
  children,
  label,
  htmlFor,
  helpText,
  error,
  required = false,
  className = '',
  labelClassName = '',
}) => {
  const errorId = htmlFor ? `${htmlFor}-error` : undefined;
  const helpTextId = htmlFor ? `${htmlFor}-help` : undefined;
  const hasError = !!error;

  // Collect any descriptive IDs to associate with the input
  const getDescribedBy = () => {
    const ids = [];
    if (helpTextId && helpText) ids.push(helpTextId);
    if (errorId && hasError) ids.push(errorId);
    return ids.length ? ids.join(' ') : undefined;
  };

  // Clone the child element to add aria attributes if it's a single React element
  const enhancedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      // Only add props if it's a direct input/form element
      const describedBy = getDescribedBy();
      
      return React.cloneElement(child, {
        id: htmlFor,
        'aria-invalid': hasError ? 'true' : undefined,
        'aria-required': required ? 'true' : undefined,
        'aria-describedby': describedBy,
      });
    }
    return child;
  });

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={htmlFor} 
          className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
        >
          {label}
          {required && <span aria-hidden="true" className="text-red-600 ml-1">*</span>}
        </label>
      )}
      
      {enhancedChildren}
      
      {helpText && (
        <p id={helpTextId} className="mt-1 text-sm text-gray-700">
          {helpText}
        </p>
      )}
      
      {hasError && (
        <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  htmlFor: PropTypes.string,
  helpText: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
};

export default FormGroup;
