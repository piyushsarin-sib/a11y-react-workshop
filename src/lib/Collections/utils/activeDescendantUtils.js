/**
 * Utility functions for managing active descendant pattern
 */

/**
 * Manages tabIndex for all focusable descendants within a container
 * In active descendant pattern, only focusable elements in the active item should be in tab order
 *
 * @param {HTMLElement} container - The container element to search within
 * @param {boolean} isActive - Whether this container's item is currently active
 */
export const manageFocusableDescendants = (container, isActive) => {
  if (!container) return;

  const focusableSelectors =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const focusableElements = container.querySelectorAll(focusableSelectors);

  focusableElements.forEach((el) => {
    // Set tabIndex based on whether this item is active
    // Active item's focusables: tabIndex 0 (in tab order)
    // Inactive item's focusables: tabIndex -1 (not in tab order)
    el.tabIndex = isActive ? 0 : -1;
  });
};
