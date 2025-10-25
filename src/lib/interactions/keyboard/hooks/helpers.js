/**
 * Helper utilities for roving tabindex keyboard navigation
 *
 * Extracted from useRovingIndex hook to reduce complexity and improve testability
 */

/**
 * Detect actual number of columns in a grid layout by analyzing DOM elements
 * Works with any layout system (CSS Grid, Flexbox, etc.)
 *
 * @param {Map} itemRefsMap - Map of item keys to DOM elements
 * @param {number} fallbackColumns - Fallback value if detection fails
 * @returns {number} Detected column count
 */
export const detectGridColumns = (itemRefsMap, fallbackColumns = 1) => {
  if (itemRefsMap.size < 2) {
    return fallbackColumns; // Need at least 2 items to detect columns
  }

  // Get all visible DOM elements
  const itemElements = Array.from(itemRefsMap.values())
    .filter(el => el && el.offsetParent !== null); // Only visible elements

  if (itemElements.length < 2) return fallbackColumns;

  // Performance optimization: Only sample first row + a few extra items
  // For large collections, we don't need to check every single item
  const sampleSize = Math.min(itemElements.length, Math.max(20, fallbackColumns * 2));
  const sampleElements = itemElements.slice(0, sampleSize);

  // Use getBoundingClientRect only on sample elements
  const firstRect = sampleElements[0].getBoundingClientRect();
  const tolerance = 5; // Handle sub-pixel positioning differences

  let detectedColumns = 1;
  for (let i = 1; i < sampleElements.length; i++) {
    const currentRect = sampleElements[i].getBoundingClientRect();

    // Same row if tops are within tolerance
    if (Math.abs(currentRect.top - firstRect.top) <= tolerance) {
      detectedColumns++;
    } else {
      break; // Hit second row
    }
  }

  return Math.max(detectedColumns, 1);
};

/**
 * Map keyboard keys to navigation directions based on orientation
 *
 * @param {string} key - The keyboard key pressed
 * @param {('vertical'|'horizontal'|'both')} orientation - Navigation orientation
 * @returns {string|null} Navigation direction or null if key not mapped
 */
export const getNavigationDirection = (key, orientation) => {
  const isHorizontalEnabled = orientation === 'horizontal' || orientation === 'both';
  const isGridMode = orientation === 'both';

  switch (key) {
    case 'ArrowRight':
      return isHorizontalEnabled ? 'right' : 'next';
    case 'ArrowLeft':
      return isHorizontalEnabled ? 'left' : 'previous';
    case 'ArrowDown':
      return 'down';
    case 'ArrowUp':
      return 'up';
    case 'Home':
      return 'home';
    case 'End':
      return 'end';
    case 'PageDown':
      return isGridMode ? 'down' : 'pageDown';
    case 'PageUp':
      return isGridMode ? 'up' : 'pageUp';
    default:
      return null;
  }
};

/**
 * Create a ref callback that stores the element and merges with external refs
 *
 * @param {string|number} key - Item key for storage
 * @param {Map} itemRefsMap - Map to store element references
 * @param {Function|Object} externalRef - External ref to merge with
 * @returns {Function} Ref callback function
 */
export const createRefCallback = (key, itemRefsMap, externalRef) => {
  return (element) => {
    // Store/remove element in our internal map
    if (element) {
      itemRefsMap.set(key, element);
    } else {
      itemRefsMap.delete(key);
    }

    // Merge external ref if provided
    if (typeof externalRef === 'function') {
      externalRef(element);
    } else if (externalRef && typeof externalRef === 'object') {
      externalRef.current = element;
    }
  };
};

/**
 * Handle PageUp/PageDown navigation for lists (non-grid)
 * Moves by 10 items at a time
 *
 * @param {string} direction - 'up' or 'down'
 * @param {number} currentIndex - Current active item index
 * @param {number} totalItems - Total number of items
 * @returns {number} New index after page navigation
 */
export const handlePageNavigation = (direction, currentIndex, totalItems) => {
  if (direction === 'up') {
    return Math.max(currentIndex - 10, 0);
  }
  // direction === 'down'
  return Math.min(currentIndex + 10, totalItems - 1);
};

/**
 * Normalize items array to extract keys
 * Handles different item formats: objects with key/id, primitives, or indices
 *
 * @param {Array} items - Array of items or keys to normalize
 * @returns {Array} Array of normalized keys
 */
export const normalizeItemKeys = (items) => {
  if (!items.length) return [];

  return items.map((item, index) => {
    // Handle different item formats
    if (typeof item === "object" && item !== null) {
      return item.key || item.id || index;
    }
    return item || index;
  });
};

/**
 * Calculate position (index, row, column) of a key in the grid
 *
 * @param {string|number} key - The item key to find position for
 * @param {Array} itemKeys - Array of all item keys
 * @param {number} columnsCount - Number of columns in the grid
 * @returns {Object} Position object with index, row, and col properties
 */
export const calculatePosition = (key, itemKeys, columnsCount) => {
  const index = itemKeys.indexOf(key);
  if (index === -1) return { index: 0, row: 0, col: 0 };

  const row = Math.floor(index / columnsCount);
  const col = index % columnsCount;

  return { index, row, col };
};
