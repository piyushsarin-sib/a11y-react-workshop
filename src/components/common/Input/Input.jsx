import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  id,
  name,
  type = 'text',
  label,
  value,
  onChange,
  placeholder = '',
  className = '',
  error = '',
  disabled = false,
  required = false,
  ariaDescribedBy,
  ...props
}) => {
  const inputId = id || `input-${name}`;
  const errorId = `${inputId}-error`;
  const hasError = error !== '';

  return (
    <div className="mb-4">
      <label 
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-900 mb-1"
      >
        {label}
        {required && <span aria-hidden="true" className="text-red-600 ml-1">*</span>}
      </label>
      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          hasError ? 'border-red-600' : 'border-gray-400'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${className}`}
        disabled={disabled}
        aria-invalid={hasError}
        aria-required={required}
        aria-describedby={`${hasError ? errorId : ''} ${ariaDescribedBy || ''}`}
        {...props}
      />
      {hasError && (
        <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  ariaDescribedBy: PropTypes.string,
};

export default Input;
