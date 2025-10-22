import { useEffect, useRef } from 'react';

/**
 * Restores focus to a previously stored element when overlay closes
 * Only restores on transition from visible (true) to hidden (false)
 *
 * @param {Object} options - Configuration options
 * @param {boolean} options.visible - Current visibility state of overlay
 * @param {React.RefObject} options.elementRef - Ref containing the element to restore focus to
 */
const useRestoreFocus = ({ visible, elementRef }) => {
  const wasVisible = useRef(false);

  useEffect(() => {
    // Restore focus only when transitioning from visible→hidden
    if (!visible && wasVisible.current && elementRef?.current) {
      if (document.contains(elementRef.current)) {
        elementRef.current.focus({ preventScroll: true });
      }
    }

    // Track previous visible state
    wasVisible.current = visible;
  }, [visible, elementRef]);
};

export default useRestoreFocus;
