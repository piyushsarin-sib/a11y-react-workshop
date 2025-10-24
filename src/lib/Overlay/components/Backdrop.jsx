import React from 'react';
import PropTypes from 'prop-types';

/**
 * Backdrop component for overlays
 * Renders a semi-transparent backdrop behind modals/dialogs
 */
const Backdrop = ({ backdropRef, zIndex, children }) => {
  return (
    <div
      ref={backdropRef}
      className="overlay__backdrop"
      style={{ zIndex }}
      aria-hidden="true"
    >
      {children}
    </div>
  );
};

Backdrop.propTypes = {
  backdropRef: PropTypes.object,
  zIndex: PropTypes.number.isRequired,
  children: PropTypes.node,
};

export default Backdrop;
