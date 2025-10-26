import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../common/Modal';
import Button from '../../common/Button';

/**
 * OrderConfirmationModal component for displaying order confirmation and feedback form
 * Uses common components for consistent UI and accessibility
 */
const OrderConfirmationModal = ({ onClose, isOpen = true }) => {
  const [showAnimation, setShowAnimation] = useState(true);
  
  // Automatically transition from animation to confirmation after 4 seconds
  useEffect(() => {
    if (isOpen && showAnimation) {
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, showAnimation]);

  // Content to display based on state
  const renderContent = () => {
    if (showAnimation) {
      return (
        <div className="flex flex-col items-center justify-center py-8" aria-live="polite">
          <div 
        className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4" 
        aria-hidden="true"
          ></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Processing Your Order...</h2>
          <p className="text-gray-600">Please wait while we process your order.</p>
        </div>
      );
    } else {
      return (
        <div aria-live="polite">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Order Confirmed!
          </h2>
          
          <div className="flex justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Just kidding!</strong> This is a dummy order. Your items won't actually be shipped because this is just a workshop demo.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      );
    }
  };
  
  // Get title based on state
  const getModalTitle = () => {
    if (showAnimation) return "Processing Your Order";
   return "Order Confirmed";
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={getModalTitle()}
      className="w-full max-w-2xl"
    >
      {renderContent()}
    </Modal>
  );
};

OrderConfirmationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool
};

export default OrderConfirmationModal;
