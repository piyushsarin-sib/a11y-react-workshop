import { useMemo } from 'react';
import { flattenProps } from '../helpers/flattenProps';
import useBaseOverlay from './useBaseOverlay';
import { ARIA_HASPOPUP } from '../constants';

/**
 * usePopup - Specialized hook for non-modal popups (menus, popovers, tooltips)
 *
 * Returns minimal props needed for PopupOverlay:
 * - trigger: id, ref, aria-haspopup, aria-expanded, aria-controls
 * - body: id, ref, visible, role (menu/listbox/etc)
 * - close, open, toggle, setVisible functions
 *
 * Unlike useDialog:
 * - Trigger has ARIA props (aria-haspopup, aria-expanded, aria-controls)
 * - Body does NOT have aria-modal (non-modal behavior)
 * - Body role varies (menu, listbox, etc.) based on popup type
 *
 * @param {Object} props
 * @param {boolean} props.visible - Initial visibility state
 * @param {string} props.triggerId - ID for trigger element
 * @param {string} props.bodyId - ID for popup element
 * @param {string} props.role - Role for popup body (default: 'menu')
 * @param {string} props.hasPopup - Type of popup for aria-haspopup (default: ARIA_HASPOPUP.MENU)
 *                                  Allowed values: ARIA_HASPOPUP.MENU, .LISTBOX, .TREE, .GRID, .DIALOG
 * @returns {Object} Popup state and refs with ARIA props
 */
const usePopup = (props = {}) => {
  const {
    visible: _visible = false,
    triggerId,
    bodyId,
    role = 'menu',
    hasPopup = ARIA_HASPOPUP.MENU,
  } = props;

  // Auto-generate ARIA IDs for dialog popovers (similar to useDialog)
  // These are used by PopupOverlay when trapFocus=true
  const ariaLabelledby = bodyId ? `${bodyId}-title` : undefined;
  const ariaDescribedby = bodyId ? `${bodyId}-content` : undefined;

  // Use base overlay for state management and refs
  const { triggerRef, bodyRef, visible, setVisible, open, close, toggle } = useBaseOverlay(_visible);

  // Trigger: WITH ARIA props (aria-haspopup, aria-expanded, aria-controls)
  const trigger = useMemo(
    () =>
      flattenProps({
        id: triggerId,
        ref: triggerRef,
        aria: {
          'aria-haspopup': hasPopup,
          'aria-expanded': visible,
          'aria-controls': bodyId,
        },
        data: {},
      }),
    [triggerId, triggerRef, hasPopup, visible, bodyId]
  );

  // Body: WITH popup role (menu, listbox, etc.) but NO aria-modal
  const body = useMemo(
    () => {
      return flattenProps({
        id: bodyId,
        ref: bodyRef,
        visible,
        role,  // role is NOT an aria attribute, put at top level
        aria: {
          'aria-labelledby': ariaLabelledby,
          'aria-describedby': ariaDescribedby,
        },
        data: {},
      });
    },
    [bodyId, bodyRef, visible, role, ariaLabelledby, ariaDescribedby]
  );

  return {
    trigger,
    body,
    open,
    close,
    toggle,
    setVisible,
  };
};

export default usePopup;
