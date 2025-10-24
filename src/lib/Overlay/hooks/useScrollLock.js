import { useEffect } from 'react';

/**
 * Custom hook to lock body scroll when modal is open
 * Uses position: fixed method for reliable cross-browser scroll prevention
 * Preserves scroll position and prevents layout shift
 *
 * @param {Object} options - Configuration options
 * @param {boolean} options.isLocked - Whether scroll should be locked
 */
const useScrollLock = ({ isLocked }) => {
  useEffect(() => {
    if (!isLocked) {
      return;
    }

    // Store current scroll position
    const scrollY = window.scrollY;
    const body = document.body;

    // Store original styles
    const originalPosition = body.style.position;
    const originalTop = body.style.top;
    const originalWidth = body.style.width;

    // Lock scroll using position: fixed
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`; // Preserve visual scroll position
    body.style.width = '100%'; // Prevent layout collapse

    // Cleanup: restore original state
    return () => {
      body.style.position = originalPosition;
      body.style.top = originalTop;
      body.style.width = originalWidth;

      // Restore actual scroll position
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
};

export default useScrollLock;
