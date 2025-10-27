import React, { useRef } from "react";
import PropTypes from "prop-types";
import BaseOverlay from "./BaseOverlay";
import DialogHeader from "./DialogHeader";
import useFocusTrap from "../hooks/useFocusTrap";
import { useAutoFocus } from "../hooks/useFocusManagement";
import useInert from "../hooks/useInert";
import useScrollLock from "../hooks/useScrollLock";
import { getStaticPositionStyles } from "../helpers/positionHelpers";
import { PLACEMENTS } from "../constants";
import "../Overlay.css";

/**
 * @example
 * const dialogState = useDialog({ placement: PLACEMENTS.CENTER });
 *
 * <DialogOverlay {...dialogState} backdrop>
 *   <div className="modal-content">
 *     <h2>Modal Title</h2>
 *     <button onClick={dialogState.close}>Close</button>
 *   </div>
 * </DialogOverlay>
 */
const DialogOverlay = ({
  // From useDialog hook
  trigger,
  body,
  close,

  // Dialog-specific props
  backdrop = false,
  closeOnOutsideClick = true, // Default: close on outside click (including backdrop)
  focusOnOpen = true,
  placement = PLACEMENTS.CENTER, // Static placement: center, top-center, bottom-center
  portalTarget,

  // Optional title and close button
  title,
  showCloseButton = true,

  // Styling
  style = {},
  className = "",

  // Children
  children,
}) => {
  const backdropRef = useRef();

  // ✅ Focus trap (ALWAYS active for dialogs)
  useFocusTrap({
    enabled: body.visible,
    containerRef: body.ref,
    isVisible: body.visible,
  });

  // ✅ Auto-focus first focusable element
  useAutoFocus({
    enabled: body.visible && focusOnOpen,
    containerRef: body.ref,
  });

  // ✅ Inert background (default behavior for modal dialogs)
  useInert({
    isOpen: body.visible,
    isModal: true,
  });

  // ✅ Scroll lock (default behavior for modal dialogs)
  useScrollLock({
    isLocked: body.visible,
  });

  // ✅ Semantic container - ARIA props come from useDialog hook via body
  const dialogContent = (
    <div
      id={body.id}
      role={body.role}
      aria-modal={body["aria-modal"]}
      aria-label={title}
      tabIndex={-1}
      className={`dialog-overlay__content ${className}`}
      style={{
        padding: title || showCloseButton ? "24px" : "0",
        ...style,
      }}
    >
      <DialogHeader
        title={title}
        titleId={body["aria-labelledby"]}
        showCloseButton={showCloseButton}
        onClose={close}
      />
      {children}
    </div>
  );

  // ✅ BaseOverlay handles primitives (portal, focus restoration, ESC, outside click, backdrop)
  // Pass static positioning styles via position prop
  return (
    <BaseOverlay
      visible={body.visible}
      triggerRef={trigger.ref}
      containerRef={body.ref}
      backdropRef={backdropRef}
      position={getStaticPositionStyles(placement)}
      onClose={close}
      closeOnOutsideClick={closeOnOutsideClick}
      closeOnEscape={true}
      hasBackdrop={backdrop}
      backdrop={backdrop}
      backdropZIndex={1000}
      zIndex={backdrop ? 1001 : 1000}
      portalTarget={portalTarget}
      className="dialog-overlay"
    >
      {dialogContent}
    </BaseOverlay>
  );
};

DialogOverlay.displayName = "DialogOverlay";

DialogOverlay.propTypes = {
  // From hook
  trigger: PropTypes.shape({
    ref: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    id: PropTypes.string,
  }).isRequired,
  body: PropTypes.shape({
    ref: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    id: PropTypes.string,
    visible: PropTypes.bool,
    role: PropTypes.string,
    "aria-modal": PropTypes.string,
  }).isRequired,
  close: PropTypes.func.isRequired,

  // Dialog-specific
  backdrop: PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool,
  focusOnOpen: PropTypes.bool,
  placement: PropTypes.string, // Static placement: center, top-center, bottom-center
  portalTarget: PropTypes.oneOfType([
    PropTypes.instanceOf(Element),
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),

  // Optional title and close button
  title: PropTypes.string,
  showCloseButton: PropTypes.bool,

  // Styling
  style: PropTypes.object,
  className: PropTypes.string,

  // Children
  children: PropTypes.node.isRequired,
};

export default DialogOverlay;
