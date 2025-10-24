/**
 * 1D Linear Navigation Delegate
 * Handles vertical lists, menus, and other linear collections
 */
export const create1DDelegate = (itemKeys, totalItems, loop) => {
  const getNextIndex = (direction, currentKey) => {
    const currentIndex = itemKeys.indexOf(currentKey);
    if (currentIndex === -1) return null;

    let newIndex = currentIndex;

    switch (direction) {
      case "next":
      case "down":
        newIndex = currentIndex + 1;
        if (newIndex >= totalItems) {
          newIndex = loop ? 0 : currentIndex;
        }
        break;

      case "previous":
      case "up":
        newIndex = currentIndex - 1;
        if (newIndex < 0) {
          newIndex = loop ? totalItems - 1 : currentIndex;
        }
        break;

      // Block left/right to avoid conflicts with expand/collapse
      case "right":
      case "left":
        return null;

      case "home":
        newIndex = 0;
        break;

      case "end":
        newIndex = totalItems - 1;
        break;

      default:
        return null;
    }

    return newIndex >= 0 && newIndex < totalItems ? itemKeys[newIndex] : null;
  };

  return { getNextIndex };
};