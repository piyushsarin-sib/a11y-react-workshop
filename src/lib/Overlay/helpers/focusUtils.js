/**
 * Gets all focusable elements within a container
 *
 * @param {HTMLElement} container - The container element to search within
 * @returns {HTMLElement[]} Array of focusable elements
 */
export const getFocusableElements = (container) => {
  if (!container) return [];

  const selector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])';
  return Array.from(container.querySelectorAll(selector));
};