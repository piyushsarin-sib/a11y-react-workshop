/**
 * Navigation delegates for different keyboard interaction patterns
 * Centralized export for all delegate types
 */

import { create1DDelegate } from './linear1DDelegate.js';
import { create2DDelegate } from './grid2DDelegate.js';
import { createHorizontalDelegate } from './horizontalDelegate.js';

/**
 * Navigation delegate factory
 * Creates appropriate delegate based on orientation
 */
export const createNavigationDelegate = (orientation, config) => {
  const { itemKeys, totalItems, loop, getCurrentPosition, actualColumnsCount, rowsCount } = config;

  switch (orientation) {
    case "horizontal":
      return createHorizontalDelegate(itemKeys, totalItems, loop);
    case "both":
      return create2DDelegate(itemKeys, totalItems, loop, getCurrentPosition, actualColumnsCount, rowsCount);
    case "vertical":
    default:
      return create1DDelegate(itemKeys, totalItems, loop);
  }
};

// Re-export individual delegates for direct usage
export { create1DDelegate } from './linear1DDelegate.js';
export { create2DDelegate } from './grid2DDelegate.js';
export { createHorizontalDelegate } from './horizontalDelegate.js';