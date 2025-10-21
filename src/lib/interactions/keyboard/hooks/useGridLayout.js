import { useState, useCallback, useEffect } from "react";
import { detectGridColumns } from "./helpers.js";

/**
 * Hook to manage grid layout detection and column count
 * Automatically detects columns for 2D grids using ResizeObserver
 *
 * @param {Object} options - Configuration options
 * @param {('vertical'|'horizontal'|'both')} options.orientation - Navigation orientation
 * @param {number} options.columnsCount - Hint for column count
 * @param {React.RefObject} options.itemRefsMap - Map of item keys to DOM elements
 * @param {React.RefObject} options.containerRef - Reference to the grid container
 * @param {number} options.itemKeysLength - Number of items (for change detection)
 * @param {boolean} options.disabled - Whether navigation is disabled
 * @returns {number} Actual columns count (detected or provided)
 */
export const useGridLayout = ({
  orientation,
  columnsCount,
  itemRefsMap,
  containerRef,
  itemKeysLength,
  disabled
}) => {
  // Optimized column detection for any layout system
  const getActualColumnsCount = useCallback(() => {
    if (orientation !== "both") {
      return columnsCount; // Only detect for 2D grids
    }
    return detectGridColumns(itemRefsMap.current, columnsCount);
  }, [orientation, columnsCount, itemRefsMap]);

  const [dynamicColumnsCount, setDynamicColumnsCount] = useState(() => getActualColumnsCount());

  // ResizeObserver for 2D grids only - recalculates columns on container resize
  useEffect(() => {
    if (orientation !== "both" || !containerRef.current || disabled) {
      return;
    }

    const observer = new ResizeObserver(() => {
      const newCount = getActualColumnsCount();
      if (newCount !== dynamicColumnsCount) {
        setDynamicColumnsCount(newCount);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [orientation, disabled, getActualColumnsCount, dynamicColumnsCount, containerRef]);

  // Update columns count when items change (for non-resize scenarios)
  useEffect(() => {
    if (orientation === "both") {
      const newCount = getActualColumnsCount();
      if (newCount !== dynamicColumnsCount) {
        setDynamicColumnsCount(newCount);
      }
    }
  }, [itemKeysLength, orientation, getActualColumnsCount, dynamicColumnsCount]);

  return orientation === "both" ? dynamicColumnsCount : columnsCount;
};
