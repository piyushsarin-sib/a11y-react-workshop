import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({
  id,
  name,
  label,
  checked,
  onChange,
  className = '',
  error = '',
  disabled = false,
  required = false,
  ...props
}) => {
  const checkboxId = id || `checkbox-${name}`;
  const errorId = `${checkboxId}-error`;
  const hasError = error !== '';

  return (
    <div className="mb-4">
      <div className="flex items-center">
        <input
          id={checkboxId}
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
            hasError ? 'border-red-500' : ''
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${className}`}
          disabled={disabled}
          aria-invalid={hasError}
          aria-required={required}
          aria-describedby={hasError ? errorId : undefined}
          {...props}
        />
        <label 
          htmlFor={checkboxId}
          className="ml-2 block text-sm text-gray-700"
        >
          {label}
          {required && <span aria-hidden="true" className="text-red-500 ml-1">*</span>}
        </label>
      </div>
      {hasError && (
        <p id={errorId} className="mt-1 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

export default Checkbox;
