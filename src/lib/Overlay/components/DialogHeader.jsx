import React from 'react';
import PropTypes from 'prop-types';

/**
 * DialogHeader - Header with optional title and close button for dialogs
 */
const DialogHeader = ({ title, titleId, showCloseButton, onClose }) => {
  if (!title && !showCloseButton) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: title ? '16px' : '0',
      }}
    >
      {title && (
        <h2
          id={titleId}
          style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: '600',
            color: '#1a1a1a',
          }}
        >
          {title}
        </h2>
      )}
      {showCloseButton && (
        <button
          onClick={onClose}
          aria-label="Close dialog"
          style={{
            marginLeft: 'auto',
            padding: '4px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            lineHeight: '1',
            color: '#666',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f0f0f0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          &times;
        </button>
      )}
    </div>
  );
};

DialogHeader.propTypes = {
  title: PropTypes.string,
  titleId: PropTypes.string,
  showCloseButton: PropTypes.bool,
  onClose: PropTypes.func,
};

export default DialogHeader;
