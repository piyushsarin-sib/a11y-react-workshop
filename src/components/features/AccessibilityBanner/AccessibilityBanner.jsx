import React from 'react';

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
            <img
              src="https://img.icons8.com/ios-filled/100/ffffff/wheelchair.png"
              alt="Accessibility symbol"
              className="text-6xl md:text-7xl w-16 h-16 md:w-20 md:h-20"
            />
          </div>
          
          {/* Title */}
          <h1 
            id="accessibility-banner-title" 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
             Accessible Shopping for Everyone
          </h1>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-blue-50 mb-6 max-w-2xl mx-auto">
            Our products are designed for everyone, including people with motor, visual, 
            hearing, and cognitive disabilities. Accessibility matters because it ensures 
            equal access to information and services for all users.
          </p>
          
          {/* Key Points */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="text-white font-medium text-sm md:text-base px-3 py-1 border border-white border-opacity-40 rounded-full">
              Motor
            </span>
            
            <span className="text-white font-medium text-sm md:text-base px-3 py-1 border border-white border-opacity-40 rounded-full">
              Visual
            </span>
            
            <span className="text-white font-medium text-sm md:text-base px-3 py-1 border border-white border-opacity-40 rounded-full">
              Hearing
            </span>
            
            <span className="text-white font-medium text-sm md:text-base px-3 py-1 border border-white border-opacity-40 rounded-full">
              Cognitive
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

AccessibilityBanner.propTypes = {};

export default AccessibilityBanner;

