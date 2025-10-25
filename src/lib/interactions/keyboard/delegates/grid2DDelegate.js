/**
 * 2D Grid Navigation Delegate
 * Handles true 2D navigation with row/column awareness
 */
export const create2DDelegate = (itemKeys, totalItems, loop, getCurrentPosition, actualColumnsCount, rowsCount) => {

  // Helper: Calculate index from row/col
  const getIndexFromPosition = (row, col) => row * actualColumnsCount + col;

  // Helper: Find last valid row for a column (handles incomplete grids)
  const findLastValidRowForColumn = (col) => {
    let row = rowsCount - 1;
    let index = getIndexFromPosition(row, col);

    while (index >= totalItems && row > 0) {
      row--;
      index = getIndexFromPosition(row, col);
    }

    return { row, index };
  };

  // Helper: Handle horizontal wrapping (left/right)
  const navigateHorizontal = (current, direction) => {
    const isRight = direction === "right" || direction === "next";
    let newCol = current.col + (isRight ? 1 : -1);
    let newRow = current.row;

    // Handle column overflow/underflow
    if (newCol >= actualColumnsCount) {
      newCol = 0;
      newRow++;
      if (newRow >= rowsCount) {
        return loop ? 0 : null; // Wrap to start or stop
      }
    } else if (newCol < 0) {
      newCol = actualColumnsCount - 1;
      newRow--;
      if (newRow < 0) {
        return loop ? totalItems - 1 : null; // Wrap to end or stop
      }
    }

    const newIndex = getIndexFromPosition(newRow, newCol);

    // Ensure within bounds
    if (newIndex >= totalItems) {
      return loop ? 0 : null;
    }

    return newIndex;
  };

  // Helper: Handle vertical column-major navigation (up/down)
  const navigateVertical = (current, direction) => {
    const isDown = direction === "down";
    let newRow = current.row + (isDown ? 1 : -1);

    // Handle row overflow/underflow with column-major traversal
    if (newRow >= rowsCount || getIndexFromPosition(newRow, current.col) >= totalItems) {
      if (!loop) return null;

      // Move to next/previous column
      const newCol = current.col + (isDown ? 1 : -1);

      if (newCol >= actualColumnsCount) {
        return 0; // Wrap to first item
      } else if (newCol < 0) {
        return findLastValidRowForColumn(actualColumnsCount - 1).index; // Last column, last row
      }

      // Go to first/last row of new column
      return isDown ? newCol : findLastValidRowForColumn(newCol).index;
    } else if (newRow < 0) {
      if (!loop) return null;

      // Move to previous column, last row
      const newCol = current.col - 1;
      if (newCol < 0) {
        return findLastValidRowForColumn(actualColumnsCount - 1).index;
      }
      return findLastValidRowForColumn(newCol).index;
    }

    return getIndexFromPosition(newRow, current.col);
  };

  const getNextIndex = (direction, currentKey) => {
    const current = getCurrentPosition(currentKey);
    let newIndex;

    switch (direction) {
      case "right":
      case "next":
      case "left":
      case "previous":
        newIndex = navigateHorizontal(current, direction);
        break;

      case "down":
      case "up":
        newIndex = navigateVertical(current, direction);
        break;

      case "home":
        newIndex = 0;
        break;

      case "end":
        newIndex = totalItems - 1;
        break;

      default:
        return null;
    }

    return newIndex !== null && newIndex >= 0 && newIndex < totalItems ? itemKeys[newIndex] : null;
  };

  return { getNextIndex };
};