import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

const Carousel = ({
  items,
  renderItem,
  autoPlay = false,
  interval = 5000,
  showDots = true,
  showArrows = true,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const totalItems = items.length;
  const carouselRef = useRef(null);
  const timeoutRef = useRef(null);

  // Handle automatic sliding
  useEffect(() => {
    if (isPlaying && totalItems > 1) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
      }, interval);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, isPlaying, interval, totalItems]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  const handlePausePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Set focus management
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      // Focus management is now handled by the hidden but accessible buttons
    }
  }, [currentIndex]);

  return (
    <section 
      className={`relative ${className}`}
      aria-roledescription="carousel"
      aria-label="Image carousel"
      ref={carouselRef}
    >
      {/* Live region for slide changes */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {currentIndex + 1} of {totalItems}
        {items[currentIndex]?.title ? `: ${items[currentIndex].title}` : ''}
      </div>
      
      <div 
        className="overflow-hidden"
      >
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <figure 
              key={`slide-${item.id || index}`} 
              className="w-full flex-shrink-0"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${totalItems}`}
            >
              {renderItem(item, index)}
            </figure>
          ))}
        </div>
      </div>
      
      {/* Navigation arrows */}
      {showArrows && totalItems > 1 && (
        <>
          <Button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow-md"
            ariaLabel="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
          <Button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow-md"
            ariaLabel="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </>
      )}
      
      {/* Dots navigation */}
      {showDots && totalItems > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {items.map((item, index) => (
            <button
              key={`dot-${item.id || index}`}
              onClick={() => goToIndex(index)}
              className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}
      
      {/* Play/Pause button */}
      {autoPlay && totalItems > 1 && (
        <Button
          onClick={handlePausePlay}
          className="absolute bottom-4 right-4 bg-white bg-opacity-70 rounded-full p-2 shadow-md"
          ariaLabel={isPlaying ? 'Pause carousel' : 'Play carousel'}
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </Button>
      )}
    </section>
  );
};

Carousel.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  autoPlay: PropTypes.bool,
  interval: PropTypes.number,
  showDots: PropTypes.bool,
  showArrows: PropTypes.bool,
  className: PropTypes.string,
};

export default Carousel;
