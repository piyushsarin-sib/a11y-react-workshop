import { PLACEMENTS } from '../constants';

/**
 * Get static position styles for dialog overlay
 * Returns CSS styles for fixed positioning (center, top-center, bottom-center)
 *
 * @param {string} placement - Placement constant (CENTER, TOP, BOTTOM)
 * @returns {Object} CSS styles object
 */
export const getStaticPositionStyles = (placement) => {
  const baseStyles = {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
  };

  switch (placement) {
    case PLACEMENTS.TOP:
    case 'top-center':
      return { ...baseStyles, top: '10%' };
    case PLACEMENTS.BOTTOM:
    case 'bottom-center':
      return { ...baseStyles, bottom: '10%' };
    case PLACEMENTS.CENTER:
    default:
      return {
        ...baseStyles,
        top: '50%',
        transform: 'translate(-50%, -50%)'
      };
  }
};

/**
 * Get position styles for BaseOverlay
 * Handles both coordinate-based positioning (for PopupOverlay) and
 * CSS-based static positioning (for DialogOverlay)
 *
 * @param {Object} position - Position object (either {x, y} or CSS style object)
 * @returns {Object} CSS styles object
 */
export const getPositionStyles = (position) => {
  // If position has x/y coordinates, use transform-based positioning
  if (typeof position === 'object' && 'x' in position && 'y' in position) {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    };
  }
  // Otherwise, position is a CSS style object (static positioning)
  return position;
};
