import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  closeOnEsc = true,
  closeOnOutsideClick = true,
}) => {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      
      // Focus the modal when it opens
      if (modalRef.current) {
        modalRef.current.focus();
      }
      
      // Prevent scrolling on the body
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scrolling when modal closes
      document.body.style.overflow = '';
      
      // Return focus to the previous element when modal closes
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
    
    // Handle ESC key press
    const handleKeyDown = (e) => {
      if (closeOnEsc && e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, closeOnEsc]);

  // Handle clicks outside the modal
  const handleOutsideClick = (e) => {
    if (closeOnOutsideClick && modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOutsideClick}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modal-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className={`bg-white rounded-lg shadow-xl overflow-auto max-h-[90vh] ${className}`}
        tabIndex={-1}
      >
        <div className="flex justify-between items-center border-b p-4">
          <h2 
            id={`modal-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
            className="text-lg font-semibold"
          >
            {title}
          </h2>
          <Button
            onClick={onClose}
            ariaLabel="Close modal"
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  closeOnEsc: PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool,
};

export default Modal;
