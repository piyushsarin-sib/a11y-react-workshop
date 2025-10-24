import React from 'react';
import PropTypes from 'prop-types';

const Radio = ({
  id,
  name,
  label,
  value,
  checked,
  onChange,
  className = '',
  disabled = false,
  ...props
}) => {
  const radioId = id || `radio-${name}-${value}`;

  return (
    <div className="flex items-center mb-2">
      <input
        id={radioId}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : ''
        } ${className}`}
        disabled={disabled}
        {...props}
      />
      <label 
        htmlFor={radioId}
        className="ml-2 block text-sm text-gray-700"
      >
        {label}
      </label>
    </div>
  );
};

Radio.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

// RadioGroup component for grouping Radio components
const RadioGroup = ({
  name,
  legend,
  options,
  value,
  onChange,
  error = '',
  required = false,
  className = '',
  ...props
}) => {
  const groupId = `radio-group-${name}`;
  const errorId = `${groupId}-error`;
  const hasError = error !== '';

  return (
    <fieldset 
      className={`mb-4 ${className}`}
      aria-required={required}
      aria-invalid={hasError}
      aria-describedby={hasError ? errorId : undefined}
      {...props}
    >
      <legend className="text-sm font-medium text-gray-700 mb-2">
        {legend}
        {required && <span aria-hidden="true" className="text-red-500 ml-1">*</span>}
      </legend>
      <div>
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            label={option.label}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
            disabled={option.disabled}
          />
        ))}
      </div>
      {hasError && (
        <p id={errorId} className="mt-1 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
};

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  legend: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export { Radio, RadioGroup };
export default Radio;
