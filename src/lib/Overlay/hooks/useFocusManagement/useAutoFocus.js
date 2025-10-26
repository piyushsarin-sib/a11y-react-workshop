import { useEffect } from 'react';
import { getFocusableElements } from '../../helpers/focusUtils';

/**
 * Auto-focuses the first focusable element in a container
 *
 * @param {Object} options - Configuration options
 * @param {boolean} options.enabled - Whether auto-focus is enabled
 * @param {React.RefObject} options.containerRef - Ref to the container
 */
const useAutoFocus = ({ enabled, containerRef }) => {
  useEffect(() => {
    if (enabled) {
      // Use requestAnimationFrame to ensure DOM is fully positioned before focusing
      requestAnimationFrame(() => {
        const focusableElements = getFocusableElements(containerRef?.current);
        if (focusableElements.length > 0) {
          focusableElements[0].focus({ preventScroll: true });
        } else if (containerRef?.current) {
          // If no focusable elements, focus the container itself
          containerRef.current.focus({ preventScroll: true });
        }
      });
    }
  }, [enabled, containerRef]);
};

export default useAutoFocus;
