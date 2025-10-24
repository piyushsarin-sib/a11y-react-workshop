import { useMemo } from 'react';
import { flattenProps } from '../helpers/flattenProps';
import useBaseOverlay from './useBaseOverlay';

/**
 * useDialog - Specialized hook for modal dialogs
 *
 * Returns minimal props needed for DialogOverlay:
 * - trigger: only id and ref (NO ARIA props - modal triggers don't need them)
 * - body: id, ref, visible, AND ARIA props (role, aria-modal, labelledby, describedby)
 * - close, open, toggle, setVisible functions
 *
 * Auto-generates ARIA IDs for title and content based on bodyId:
 * - ariaLabelledby: ${bodyId}-title
 * - ariaDescribedby: ${bodyId}-content
 *
 * @param {Object} props
 * @param {boolean} props.visible - Initial visibility state
 * @param {string} props.triggerId - ID for trigger element
 * @param {string} props.bodyId - ID for dialog element (required for ARIA ID generation)
 * @returns {Object} Dialog state and refs with auto-generated ARIA IDs
 */
const useDialog = (props = {}) => {
  const {
    visible: _visible = false,
    triggerId,
    bodyId,
  } = props;

  // Auto-generate ARIA IDs based on bodyId
  const ariaLabelledby = bodyId ? `${bodyId}-title` : undefined;
  const ariaDescribedby = bodyId ? `${bodyId}-content` : undefined;

  // Use base overlay for state management and refs
  const { triggerRef, bodyRef, visible, setVisible, open, close, toggle } = useBaseOverlay(_visible);

  // Trigger: just id and ref (NO ARIA - modal triggers are regular buttons)
  const trigger = useMemo(
    () =>
      flattenProps({
        id: triggerId,
        ref: triggerRef,
        aria: {},
        data: {},
      }),
    [triggerId, triggerRef]
  );

  // Body: WITH dialog ARIA props (role, aria-modal, labelledby, describedby)
  const body = useMemo(
    () => {
      const aria = {
        'aria-modal': 'true',
        'aria-labelledby': ariaLabelledby,
        'aria-describedby': ariaDescribedby,
      };

      return flattenProps({
        id: bodyId,
        ref: bodyRef,
        visible,
        role: 'dialog',  // role is NOT an aria attribute, put at top level
        aria,
        data: {},
      });
    },
    [bodyId, bodyRef, visible, ariaLabelledby, ariaDescribedby]
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

export default useDialog;
