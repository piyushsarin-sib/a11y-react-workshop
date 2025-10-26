/**
 * Horizontal Navigation Delegate
 * Handles left/right navigation only (wraps to next row linearly)
 */
export const createHorizontalDelegate = (itemKeys, totalItems, loop) => {
  const getNextIndex = (direction, currentKey) => {
    const currentIndex = itemKeys.indexOf(currentKey);
    if (currentIndex === -1) return null;

    let newIndex = currentIndex;

    switch (direction) {
      case "next":
      case "right":
        newIndex = currentIndex + 1;
        if (newIndex >= totalItems) {
          newIndex = loop ? 0 : currentIndex;
        }
        break;

      case "previous":
      case "left":
        newIndex = currentIndex - 1;
        if (newIndex < 0) {
          newIndex = loop ? totalItems - 1 : currentIndex;
        }
        break;

      case "home":
        newIndex = 0;
        break;

      case "end":
        newIndex = totalItems - 1;
        break;

      // No up/down for pure horizontal
      case "up":
      case "down":
      default:
        return null;
    }

    return newIndex >= 0 && newIndex < totalItems ? itemKeys[newIndex] : null;
  };

  return { getNextIndex };
};