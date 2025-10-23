import { useState, useCallback, useMemo, useRef } from "react";
import { createNavigationDelegate } from "../delegates/index.js";
import { createKeyboardDelegate } from "../utils/keyboardPrimitives.js";
import {
  getNavigationDirection,
  createRefCallback,
  handlePageNavigation,
  normalizeItemKeys,
  calculatePosition
} from "./helpers.js";
import { useFocusActiveElement } from "./useFocusActiveElement.js";
import { useGridLayout } from "./useGridLayout.js";

/**
 * Hook for managing roving tabindex keyboard navigation with automatic layout detection
 * Supports 1D lists, horizontal navigation, and 2D grids with universal layout compatibility
 *
 * @param {Object} options - Configuration options
 * @param {Array} options.items - Array of items or keys to navigate through
 * @param {('vertical'|'horizontal'|'both')} options.orientation - Navigation orientation
 *   - 'vertical': Up/down navigation (lists, menus)
 *   - 'horizontal': Left/right navigation only
 *   - 'both': 2D grid navigation with automatic column detection
 * @param {number} [options.columnsCount=1] - Hint for 2D grid columns (auto-detected if not provided)
 * @param {number|string} [options.defaultActiveKey=0] - Initially active item key/index
 * @param {Function} [options.onActiveChange] - Callback when active item changes: (newKey, oldKey) => void
 * @param {boolean} [options.loop=true] - Whether to loop at collection boundaries
 * @param {boolean} [options.disabled=false] - Whether navigation is disabled
 *
 * @returns {Object} Navigation state and utilities
 * @returns {number|string} return.activeKey - Currently active item key
 * @returns {number} return.activeIndex - Currently active item index (0-based)
 * @returns {Function} return.isActive - Check if key is active: (key) => boolean
 * @returns {Function} return.getCurrentPosition - Get position info: (key?) => {index, row, col}
 * @returns {Function} return.getNextKey - Get next key: (fromKey?) => key|null
 * @returns {Function} return.getPrevKey - Get previous key: (fromKey?) => key|null
 * @returns {Function} return.getFirstKey - Get first key: () => key|null
 * @returns {Function} return.getLastKey - Get last key: () => key|null
 * @returns {Function} return.getCollectionProps - Props for collection container
 * @returns {Function} return.getItemProps - Props for individual items: (key, options?) => object
 */
export const useRovingIndex = ({
  items = [],
  orientation = "vertical",
  columnsCount = 1,
  defaultActiveKey = 0,
  onActiveChange,
  loop = true,
  disabled = false,
} = {}) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey);
  const itemRefs = useRef(new Map()); // Map to store element refs: key -> element
  const containerRef = useRef(null); // Reference to the grid container

  // Convert items to array of keys/indices if needed
  const itemKeys = useMemo(() => normalizeItemKeys(items), [items]);

  // Grid layout management (column detection and ResizeObserver for 2D grids)
  const actualColumnsCount = useGridLayout({
    orientation,
    columnsCount,
    itemRefsMap: itemRefs,
    containerRef,
    itemKeysLength: itemKeys.length,
    disabled
  });
  const totalItems = itemKeys.length;
  const rowsCount = Math.ceil(totalItems / actualColumnsCount);

  // Focus management - focus the active element when activeKey changes
  useFocusActiveElement({
    activeKey,
    itemRefsMap: itemRefs,
    disabled
  });

  // Get current position in 1D or 2D grid
  const getCurrentPosition = useCallback(
    (key) => calculatePosition(key, itemKeys, actualColumnsCount),
    [itemKeys, actualColumnsCount]
  );

  // Navigate to specific key
  const navigateTo = useCallback((newKey) => {
    if (disabled || !itemKeys.includes(newKey)) return;

    const oldKey = activeKey;
    setActiveKey(newKey);
    onActiveChange?.(newKey, oldKey);
  }, [activeKey, disabled, itemKeys, onActiveChange]);

  // Navigation delegate using imported modules
  const keyboardDelegate = useCallback(() => {
    const delegateConfig = createNavigationDelegate(orientation, {
      itemKeys,
      totalItems,
      loop,
      getCurrentPosition,
      actualColumnsCount,
      rowsCount,
    });

    return createKeyboardDelegate(delegateConfig, {
      disabled,
      activeKey,
    });
  }, [orientation, itemKeys, totalItems, loop, getCurrentPosition, actualColumnsCount, rowsCount, disabled, activeKey]);

  // Navigate in specific direction using keyboard delegate
  const navigate = useCallback((direction) => {
    const delegate = keyboardDelegate();
    const nextKey = delegate.getNextKey(direction);
    if (nextKey !== null) {
      navigateTo(nextKey);
    }
  }, [keyboardDelegate, navigateTo]);

  // Keyboard event handler
  const handleKeyDown = useCallback((event) => {
    if (disabled) return;

    const direction = getNavigationDirection(event.key, orientation);

    if (!direction) return false; // Key not handled

    // Handle PageDown/PageUp for lists (non-grid mode)
    if (direction === 'pageDown' || direction === 'pageUp') {
      const current = getCurrentPosition(activeKey);
      const newIndex = handlePageNavigation(direction === 'pageUp' ? 'up' : 'down', current.index, totalItems);
      navigateTo(itemKeys[newIndex]);
    } else {
      // All other navigation
      navigate(direction);
    }

    event.preventDefault();
    event.stopPropagation();
    return true;
  }, [disabled, orientation, navigate, getCurrentPosition, activeKey, totalItems, itemKeys, navigateTo]);

  // Get props for collection container (navigation only - ARIA handled by Collection component)
  const getCollectionProps = useCallback(() => {
    if (disabled) return {};

    return {
      onKeyDown: handleKeyDown,
      ref: containerRef,
    };
  }, [disabled, handleKeyDown]);

  // Get props for individual items
  const getItemProps = useCallback((key, options = {}) => {
    if (disabled) return {};

    const isActive = key === activeKey;
    const { focusable = true } = options;

    return {
      tabIndex: isActive && focusable ? 0 : -1,
      "data-roving-index-active": isActive,
      ref: createRefCallback(key, itemRefs.current, options.ref),
      onFocus: (event) => {
        // Update active key when item receives focus (for keyboard navigation)
        // Only handle if this element is the actual target (not a bubbled event from children)
        if (isActive !== true && event.target === event.currentTarget) {
          navigateTo(key);
        }
        options.onFocus?.(event);
      },
    };
  }, [disabled, activeKey, navigateTo]);

  // Utility: Check if key is active
  const isActive = useCallback((key) => key === activeKey, [activeKey]);

  // Compute active index efficiently
  const activeIndex = useMemo(
    () => getCurrentPosition(activeKey).index,
    [getCurrentPosition, activeKey]
  );

  // Navigation methods (React Aria style)
  const getNextKey = useCallback((fromKey = activeKey) => {
    const delegate = keyboardDelegate();
    return delegate.getNextKey('down', fromKey);
  }, [keyboardDelegate, activeKey]);

  const getPrevKey = useCallback((fromKey = activeKey) => {
    const delegate = keyboardDelegate();
    return delegate.getNextKey('up', fromKey);
  }, [keyboardDelegate, activeKey]);

  const getFirstKey = useCallback(() => {
    return itemKeys[0] ?? null;
  }, [itemKeys]);

  const getLastKey = useCallback(() => {
    return itemKeys.at(-1) ?? null;
  }, [itemKeys]);

  return {
    // State
    activeKey,
    activeIndex,

    // Utilities
    isActive,
    getCurrentPosition,

    // Navigation methods (similar to React Aria)
    getNextKey,
    getPrevKey,
    getFirstKey,
    getLastKey,

    // Props getters
    getCollectionProps,
    getItemProps,
  };
};