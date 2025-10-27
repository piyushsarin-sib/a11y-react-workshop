import React from 'react';
import PropTypes from 'prop-types';

/**
 * RadioGroup component for displaying a group of radio button options
 * with proper accessibility features
 */
const RadioGroup = ({
  legend,
  name,
  options,
  selectedValue,
  onChange,
  className = ''
}) => {
  return (
    <fieldset className={`mb-4 ${className}`}>
      <legend className="text-sm font-semibold text-gray-900 mb-2">{legend}</legend>
      <div className="space-y-2">
        {options.map(option => (
          <div key={option.id} className="flex items-center">
            <input
              id={`${name}-${option.id}`}
              name={name}
              type="radio"
              checked={selectedValue === option.id}
              onChange={() => onChange(option.id)}
              className="h-4 w-4 text-blue-600 border-gray-300 accessible-focus"
              aria-describedby={`${name}-${option.id}-description`}
            />
            <label htmlFor={`${name}-${option.id}`} className="ml-3 text-sm text-gray-900 font-medium">
              {option.name}
            </label>
            <span id={`${name}-${option.id}-description`} className="sr-only">
              {option.description || `Filter by ${option.name}`}
            </span>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

RadioGroup.propTypes = {
  /** Legend text for the fieldset */
  legend: PropTypes.string.isRequired,
  /** Name attribute for the radio group (must be unique per page) */
  name: PropTypes.string.isRequired,
  /** Array of options for the radio group */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      /** Unique identifier for the option */
      id: PropTypes.string.isRequired,
      /** Display name of the option */
      name: PropTypes.string.isRequired,
      /** Optional description for screen readers */
      description: PropTypes.string
    })
  ).isRequired,
  /** Currently selected option ID */
  selectedValue: PropTypes.string.isRequired,
  /** Change handler function that receives the selected option ID */
  onChange: PropTypes.func.isRequired,
  /** Additional CSS class names */
  className: PropTypes.string
};

export default RadioGroup;
