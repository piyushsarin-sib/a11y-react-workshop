import { useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@common/Button";
import Modal from "./Modal";

const CheckoutModal = ({ isOpen, onClose, orderPlaced, onCheckout, isProcessing }) => {
  // Automatically trigger checkout when modal opens and order is not placed yet
  useEffect(() => {
    if (isOpen && !orderPlaced && !isProcessing) {
      onCheckout();
    }
  }, [isOpen, orderPlaced, isProcessing, onCheckout]);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Checkout" style={{ width: "800px" }}>
      {isProcessing && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing Your Order...</h3>
          <p className="text-gray-600">Please wait while we process your order.</p>
        </div>
      )}
      {orderPlaced && !isProcessing && (
        <div className="text-center py-8">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h3>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. Your order has been processed.
          </p>

          {/* Dummy Order Banner */}
          <div className="mb-6 p-4 bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-300 rounded-lg shadow-md">
            <div className="flex items-center justify-center mb-2">
              <span className="text-2xl mr-2">🎭</span>
              <h4 className="text-lg font-bold text-orange-800">Workshop Demo Notice</h4>
            </div>
            <p className="text-orange-700 font-medium">
              Just kidding! This is a dummy order. Your items won't actually be shipped because this
              is just a workshop demo.
            </p>
          </div>

          <div className="mt-6">
            <Button onClick={onClose} variant="primary" ariaLabel="Close order confirmation">
              Close Modal
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

CheckoutModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  orderPlaced: PropTypes.bool.isRequired,
  onCheckout: PropTypes.func.isRequired,
  isProcessing: PropTypes.bool.isRequired,
};

export default CheckoutModal;

