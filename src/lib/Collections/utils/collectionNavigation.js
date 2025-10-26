/**
 * Navigation helper functions for collections
 * Provides methods to navigate through focusable items
 */

/**
 * Get the first key in the collection
 * @param {Array} focusableItems - Flat array of focusable items
 * @returns {string|null} First item key or null
 */
export function getFirstKey(focusableItems) {
  return focusableItems[0]?.key ?? null;
}

/**
 * Get the last key in the collection
 * @param {Array} focusableItems - Flat array of focusable items
 * @returns {string|null} Last item key or null
 */
export function getLastKey(focusableItems) {
  return focusableItems.at(-1)?.key ?? null;
}

/**
 * Get the key before the given key
 * @param {Array} focusableItems - Flat array of focusable items
 * @param {string} key - Current key
 * @returns {string|null} Previous item key or null
 */
export function getKeyBefore(focusableItems, key) {
  const index = focusableItems.findIndex(item => item.key === key);
  if (index <= 0) return null;
  return focusableItems[index - 1]?.key ?? null;
}

/**
 * Get the key after the given key
 * @param {Array} focusableItems - Flat array of focusable items
 * @param {string} key - Current key
 * @returns {string|null} Next item key or null
 */
export function getKeyAfter(focusableItems, key) {
  const index = focusableItems.findIndex(item => item.key === key);
  if (index === -1 || index >= focusableItems.length - 1) return null;
  return focusableItems[index + 1]?.key ?? null;
}

/**
 * Get an item by its key
 * @param {Array} focusableItems - Flat array of focusable items
 * @param {string} key - Item key
 * @returns {Object|null} Item node or null
 */
export function getItem(focusableItems, key) {
  return focusableItems.find(item => item.key === key) ?? null;
}
