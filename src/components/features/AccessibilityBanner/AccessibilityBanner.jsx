import React from 'react';
import PropTypes from 'prop-types';

const AccessibilityBanner = () => {
  return (
    <section 
      className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg overflow-hidden"
      aria-labelledby="accessibility-banner-title"
    >
      <div className="px-6 py-8 md:px-12 md:py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <span 
              className="text-6xl md:text-7xl" 
              role="img" 
              aria-label="Accessibility symbol"
            >
              ♿
            </span>
          </div>
          
          {/* Title */}
          <h1 
            id="accessibility-banner-title" 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Building Inclusive Experiences
          </h1>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-blue-50 mb-6 max-w-2xl mx-auto">
            Our products are designed for everyone, including people with motor, visual, 
            hearing, and cognitive disabilities. Accessibility matters because it ensures 
            equal access to information and services for all users.
          </p>
          
          {/* Key Points */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-3xl mb-2" role="img" aria-label="Wheelchair">🦽</div>
              <h3 className="text-white font-semibold text-sm md:text-base">Motor</h3>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-3xl mb-2" role="img" aria-label="Eye">👁️</div>
              <h3 className="text-white font-semibold text-sm md:text-base">Visual</h3>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-3xl mb-2" role="img" aria-label="Ear">👂</div>
              <h3 className="text-white font-semibold text-sm md:text-base">Hearing</h3>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-3xl mb-2" role="img" aria-label="Brain">🧠</div>
              <h3 className="text-white font-semibold text-sm md:text-base">Cognitive</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

AccessibilityBanner.propTypes = {};

export default AccessibilityBanner;

