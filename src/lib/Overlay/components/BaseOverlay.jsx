import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Backdrop from './Backdrop';
import useEscapeKey from '../hooks/useEscapeKey';
import useClickOutside from '../hooks/useClickOutside';
import { useRestoreFocus } from '../hooks/useFocusManagement';
import { getPositionStyles } from '../helpers/positionHelpers';

/**
 * BaseOverlay - Pure primitives for overlay behavior
 *
 * Responsibilities:
 * - Portal rendering
 * - Focus restoration (back to trigger when closed)
 * - ESC key handler
 * - Outside click handler
 * - Positioning wrapper (applies position calculated by parent)
 *
 * @example
 * const position = usePosition(visible, placement, triggerRef, containerRef);
 *
 * <BaseOverlay
 *   visible={true}
 *   triggerRef={triggerRef}
 *   containerRef={containerRef}
 *   position={position}
 *   onClose={() => setVisible(false)}
 * >
 *   <div role="dialog">Your semantic content</div>
 * </BaseOverlay>
 */
const BaseOverlay = ({
  // Visibility
  visible = false,
  onClose,

  // Refs
  triggerRef,
  containerRef,
  backdropRef,

  // Position (calculated by DialogOverlay/PopupOverlay)
  position = { x: 0, y: 0 },

  // Behavior
  closeOnOutsideClick = true,  // Default: close on outside click
  closeOnEscape = true,
  hasBackdrop = false,

  // Backdrop rendering
  backdrop = false,
  backdropZIndex = 1000,

  // Portal target
  portalTarget,

  // Styling (no semantics)
  className = '',
  style = {},
  zIndex = 1000,

  // Children (semantic content provided by DialogOverlay/PopupOverlay)
  children,
}) => {
  // ✅ ESC key handler
  useEscapeKey({
    enabled: visible && closeOnEscape,
    onEscape: onClose,
  });

  // ✅ Outside click handler
  useClickOutside({
    ref: containerRef,
    triggerRef,
    backdropRef,
    enabled: visible && closeOnOutsideClick,
    hasBackdrop,
    setVisible: (isVisible) => {
      if (!isVisible) onClose?.();
    },
  });

  // ✅ Restore focus to trigger when overlay closes
  // Use triggerRef directly instead of storing document.activeElement
  // because clicking a button doesn't always give it focus
  // Only restores on transition from visible→hidden (not on initial mount)
  useRestoreFocus({
    visible: visible,
    elementRef: triggerRef,
  });

  // Don't render if not visible (after all hooks have run)
  if (!visible) return null;

  // ✅ Positioning wrapper - NO role, NO aria-* attributes
  // This is purely presentational and handles portal positioning
  // Position can be:
  // 1. Coordinates { x, y } for dynamic positioning (PopupOverlay)
  // 2. CSS style object for static positioning (DialogOverlay)
  const overlayContent = (
    <div
      ref={containerRef}
      className={`base-overlay ${className}`.trim()}
      style={{
        ...getPositionStyles(position),
        zIndex,
        ...style,
      }}
    >
      {children}
    </div>
  );

  // ✅ Render backdrop and overlay as siblings in single portal
  const portalContent = backdrop ? (
    <>
      <Backdrop backdropRef={backdropRef} zIndex={backdropZIndex} />
      {overlayContent}
    </>
  ) : (
    overlayContent
  );

  // ✅ Portal to body (or custom target)
  return ReactDOM.createPortal(
    portalContent,
    portalTarget || document.body
  );
};

BaseOverlay.displayName = 'BaseOverlay';

BaseOverlay.propTypes = {
  // Visibility
  visible: PropTypes.bool,
  onClose: PropTypes.func,

  // Refs
  triggerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  containerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  backdropRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),

  // Position - can be coordinates {x, y} or CSS style object
  position: PropTypes.oneOfType([
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    PropTypes.object,
  ]),

  // Behavior
  closeOnOutsideClick: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  hasBackdrop: PropTypes.bool,

  // Backdrop rendering
  backdrop: PropTypes.bool,
  backdropZIndex: PropTypes.number,

  // Portal target
  portalTarget: PropTypes.oneOfType([
    PropTypes.instanceOf(Element),
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),

  // Styling
  className: PropTypes.string,
  style: PropTypes.object,
  zIndex: PropTypes.number,

  // Children
  children: PropTypes.node.isRequired,
};

export default BaseOverlay;
