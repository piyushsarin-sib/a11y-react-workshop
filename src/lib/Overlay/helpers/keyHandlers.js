import { getFocusableElements } from './focusUtils';
import { isEscapeKey, isTabKey } from './keyUtils';

/**
 * Pure helper - Checks if escape key should trigger close
 * @param {KeyboardEvent} event - The keyboard event
 * @returns {boolean} Whether escape was pressed and should close
 */
export const shouldCloseOnEscape = (event) => {
  if (!isEscapeKey(event)) return false;

  event.preventDefault();
  event.stopPropagation();
  return true;
};

/**
 * Pure helper - Checks if focus trap should be applied
 * @param {boolean} backdrop - Whether backdrop is present
 * @param {string} placement - Overlay placement
 * @returns {boolean} Whether focus trap should be applied
 */
export const shouldApplyFocusTrap = (backdrop, placement) => {
  return backdrop || placement === 'center';
};

// Track if we've warned about missing focusable elements (per container)
const warnedContainers = new WeakSet();

/**
 * Pure helper - Applies focus trap for Tab/Shift+Tab navigation
 * @param {KeyboardEvent} event - The keyboard event
 * @param {HTMLElement} container - The container to trap focus within
 * @returns {boolean} Whether focus trap was applied
 */
export const applyFocusTrap = (event, container) => {
  if (!isTabKey(event)) return false;
  if (!container) return false;

  const focusableElements = getFocusableElements(container);

  // No focusable elements - prevent Tab from doing anything
  if (focusableElements.length === 0) {
    event.preventDefault();

    // Warn once per container in development
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV !== 'production' && !warnedContainers.has(container)) {
      warnedContainers.add(container);
      console.warn(
        '[Overlay] Focus trap active but no focusable elements found. ' +
        'Consider adding at least one interactive element (button, link, etc.) ' +
        'or set backdrop={false} for non-modal overlays.'
      );
    }

    return true;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  const activeElement = document.activeElement;

  // Shift+Tab on first element - wrap to last
  if (event.shiftKey && activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
    return true;
  }

  // Tab on last element - wrap to first
  if (!event.shiftKey && activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
    return true;
  }

  // Let browser handle normal Tab navigation
  return false;
};
