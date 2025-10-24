import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

/**
 * Accessible star rating component with custom hover effects
 */
const Rating = ({
  value,
  onChange,
  max = 5,
  size = 'medium',
  showText = true,
  disabled = false,
  className = '',
}) => {
  // Helper function to get rating text description
  const getRatingText = (rating) => {
    switch (rating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return 'Not Rated';
    }
  };

  // Size variations
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-8 w-8',
    large: 'h-10 w-10',
  };

  // Font size for the rating text
  const textSizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  };

  const handleRatingChange = (newRating) => {
    if (!disabled && onChange) {
      onChange(newRating);
    }
  };

  return (
    <div className={`flex items-center ${className}`} role="radiogroup" aria-label="Rating">
      <div className="flex">
        {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
          <Button
            key={star}
            onClick={() => handleRatingChange(star)}
            className={`p-0 ${sizeClasses[size]} ${value >= star ? 'text-yellow-400' : 'text-gray-300'} ${disabled ? 'cursor-not-allowed opacity-70' : 'hover:text-yellow-500'}`}
            ariaLabel={`${star} star${star !== 1 ? 's' : ''}, ${getRatingText(star)}`}
            aria-pressed={value === star}
            disabled={disabled}
            variant="ghost"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </Button>
        ))}
      </div>
      
      {showText && (
        <span className={`ml-2 font-medium text-gray-700 ${textSizeClasses[size]}`} aria-live="polite">
          {value ? getRatingText(value) : 'Not Rated'}
        </span>
      )}
      
      {/* Hidden input for form submission */}
      <input 
        type="hidden" 
        name="rating" 
        value={value || ''} 
      />
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  max: PropTypes.number,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  showText: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Rating;
