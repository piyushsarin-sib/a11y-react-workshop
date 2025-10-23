import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BaseOverlay from './BaseOverlay';
import useFocusTrap from '../hooks/useFocusTrap';
import useAutoFocus from '../hooks/useFocusManagement/useAutoFocus';
import usePosition from '../hooks/usePosition';
import { PLACEMENTS } from '../constants';
import '../Overlay.css';

/**
 * PopupOverlay - Non-modal popup (menu, popover, tooltip)
 *
 * Responsibilities:
 * - Dynamic positioning relative to trigger
 * - Conditional focus trap (ONLY for keyboard users)
 * - Auto-focus first interactive element when popup opens
 * - NO inert background (user can interact with page)
 * - NO scroll lock (user can scroll)
 * - Semantic container with role from usePopup (menu, listbox, etc.)
 *
 * @example
 * const popupState = usePopup({ role: 'menu', hasPopup: 'menu' });
 *
 * <PopupOverlay {...popupState} placement="bottom-start">
 *   <div className="menu-content">
 *     <button>Option 1</button>
 *     <button>Option 2</button>
 *   </div>
 * </PopupOverlay>
 */
const PopupOverlay = ({
  // From usePopup hook
  trigger,
  body,
  close,

  // Popup-specific props
  placement = PLACEMENTS.BOTTOM_START,  // Dynamic placement relative to trigger
  portalTarget,
  trapFocus = true,  // Enable focus trap for keyboard users by default

  // Styling
  style = {},
  className = '',

  // Children
  children,
}) => {
  const backdropRef = useRef();

  // Track if popup was opened via keyboard (to enable focus trap)
  const [openedViaKeyboard, setOpenedViaKeyboard] = useState(false);

  // Detect keyboard vs mouse opening
  useEffect(() => {
    if (body.visible && trigger.ref?.current) {
      // Check if trigger was activated via keyboard (it will have focus)
      const triggerHasFocus = document.activeElement === trigger.ref.current;
      setOpenedViaKeyboard(triggerHasFocus);
    }
  }, [body.visible, trigger.ref]);

  // ✅ Conditional focus trap (ONLY for keyboard users)
  // Mouse users can click outside freely, keyboard users get trapped
  // When trap disabled, close popup on Tab out
  useFocusTrap({
    enabled: body.visible && trapFocus && openedViaKeyboard,
    containerRef: body.ref,
    onTabOut: !trapFocus ? close : undefined,  // Close menu when Tab moves focus outside
    isVisible: body.visible,
  });

  // ✅ Auto-focus first interactive element when popup opens
  useAutoFocus({
    enabled: body.visible,
    containerRef: body.ref,
  });

  // ✅ Dynamic positioning relative to trigger
  const { position } = usePosition(body.visible, placement, trigger.ref, body.ref);

  // ✅ Conditional dialog wrapper for non-modal dialogs (when trapFocus=true)
  // For menus/listboxes (trapFocus=false), children provide their own semantic element
  const content = trapFocus ? (
    <div
      id={body.id}
      role="dialog"
      aria-labelledby={body['aria-labelledby']}
      aria-describedby={body['aria-describedby']}
      className={`popup-dialog ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  ) : (
    children  // MenuList provides its own role="menu" and id
  );

  // ✅ BaseOverlay handles primitives (portal, focus restoration, ESC, outside click)
  // body.ref goes on BaseOverlay for positioning
  return (
    <BaseOverlay
      visible={body.visible}
      triggerRef={trigger.ref}
      containerRef={body.ref}
      backdropRef={backdropRef}
      position={position}
      onClose={close}
      closeOnOutsideClick={true}  // Always allow closing on outside click for popups
      closeOnEscape={true}
      hasBackdrop={false}  // Popups typically don't have backdrop
      backdrop={false}
      portalTarget={portalTarget}
      className="popup-overlay"
      zIndex={1000}
    >
      {content}
    </BaseOverlay>
  );
};

PopupOverlay.displayName = 'PopupOverlay';

PopupOverlay.propTypes = {
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
  }).isRequired,
  close: PropTypes.func.isRequired,

  // Popup-specific
  placement: PropTypes.string,  // Dynamic placement: top, bottom, left, right variants
  portalTarget: PropTypes.oneOfType([
    PropTypes.instanceOf(Element),
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  trapFocus: PropTypes.bool,

  // Styling
  style: PropTypes.object,
  className: PropTypes.string,

  // Children
  children: PropTypes.node.isRequired,
};

export default PopupOverlay;
