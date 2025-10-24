import { useEffect } from 'react';

/**
 * Custom hook to manage inert attribute on background content
 * When a modal is open, background content should be inert (non-interactive)
 *
 * @param {Object} options - Configuration options
 * @param {boolean} options.isOpen - Whether the modal is open
 * @param {boolean} options.isModal - Whether this is a modal overlay (backdrop/centered)
 */
const useInert = ({ isOpen, isModal }) => {
  useEffect(() => {
    // Only apply inert for modal overlays
    if (!isModal || !isOpen) {
      return;
    }

    // Find the root app element (common patterns: #root, #app, #__next)
    const rootSelectors = ['#root', '#app', '#__next', '___gatsby'];
    let rootElement = null;

    for (const selector of rootSelectors) {
      rootElement = document.querySelector(selector);
      if (rootElement) break;
    }

    if (!rootElement) {
      console.warn('[Overlay] Could not find root element to apply inert attribute');
      return;
    }

    // Store original inert state
    const originalInert = rootElement.inert;

    // Apply inert to background
    rootElement.inert = true;

    // Fallback: Add pointer-events: none for browsers that don't support inert
    const supportsInert = 'inert' in HTMLElement.prototype;
    if (!supportsInert) {
      rootElement.style.pointerEvents = 'none';

      // eslint-disable-next-line no-undef
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          '[Overlay] Browser does not support inert attribute. ' +
          'Using pointer-events: none fallback. ' +
          'Consider adding the inert polyfill: https://github.com/WICG/inert'
        );
      }
    }

    // Cleanup: restore original state
    return () => {
      rootElement.inert = originalInert;

      if (!supportsInert) {
        rootElement.style.pointerEvents = '';
      }
    };
  }, [isOpen, isModal]);
};

export default useInert;
