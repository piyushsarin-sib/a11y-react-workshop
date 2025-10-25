import { useState, useCallback, useRef, useEffect } from "react";
import { mergeRefs as mergeRefsUtil } from "@lib/utils";

/**
 * Simplified keyboard navigation hook that uses collection navigation methods
 * Delegates all navigation logic to the collection state (e.g., useCollectionState)
 *
 * @param {Object} options - Configuration options
 * @param {Object} options.collection - Collection state with navigation methods
 * @param {Function} options.collection.getFirstKey - Get first key
 * @param {Function} options.collection.getLastKey - Get last key
 * @param {Function} options.collection.getKeyBefore - Get previous key
 * @param {Function} options.collection.getKeyAfter - Get next key
 * @param {number|string} [options.defaultActiveKey] - Initially active item key
 * @param {Function} [options.onActiveChange] - Callback when active item changes
 * @param {boolean} [options.loop=true] - Whether to loop at boundaries
 * @param {boolean} [options.disabled=false] - Whether navigation is disabled
 * @param {('vertical'|'horizontal')} [options.orientation='vertical'] - Navigation orientation
 *
 * @returns {Object} Navigation state and utilities
 */
export const useKeyboardNavigation = ({
  collection,
  defaultActiveKey,
  onActiveChange,
  loop = true,
  disabled = false,
  orientation = "vertical",
} = {}) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey ?? null);
  const itemRefs = useRef(new Map());

  // Auto-focus active element when activeKey changes (but not on initial mount)
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (disabled || !activeKey) return;
    const element = itemRefs.current.get(activeKey);
    if (element && document.activeElement !== element) {
      element.focus();
    }
  }, [activeKey, disabled]);

  // Navigate to specific key
  const navigateTo = useCallback((newKey) => {
    if (disabled || !newKey) return;
    const oldKey = activeKey;
    setActiveKey(newKey);
    onActiveChange?.(newKey, oldKey);
  }, [activeKey, disabled, onActiveChange]);

  // Navigation methods (delegate to collection with loop support)
  const getNextKey = useCallback(() => {
    const nextKey = collection?.getKeyAfter?.(activeKey);
    return nextKey ?? (loop ? collection?.getFirstKey?.() : null);
  }, [activeKey, collection, loop]);

  const getPrevKey = useCallback(() => {
    const prevKey = collection?.getKeyBefore?.(activeKey);
    return prevKey ?? (loop ? collection?.getLastKey?.() : null);
  }, [activeKey, collection, loop]);

  const getFirstKey = useCallback(() => {
    return collection?.getFirstKey?.() ?? null;
  }, [collection]);

  const getLastKey = useCallback(() => {
    return collection?.getLastKey?.() ?? null;
  }, [collection]);

  // Keyboard event handler
  const handleKeyDown = useCallback((event) => {
    if (disabled) return;

    // Key mappings based on orientation
    const keyMappings = {
      vertical: {
        ArrowDown: getNextKey,
        ArrowUp: getPrevKey,
        Home: getFirstKey,
        End: getLastKey,
      },
      horizontal: {
        ArrowRight: getNextKey,
        ArrowLeft: getPrevKey,
        Home: getFirstKey,
        End: getLastKey,
      },
    };

    const handler = keyMappings[orientation]?.[event.key];
    if (!handler) return;

    // If no active key, move to first item on any navigation key
    let nextKey;
    if (!activeKey) {
      nextKey = collection?.getFirstKey?.();
    } else {
      nextKey = handler();
    }

    if (nextKey !== null) {
      navigateTo(nextKey);
      event.preventDefault();
      event.stopPropagation();
    }
  }, [disabled, orientation, navigateTo, getNextKey, getPrevKey, getFirstKey, getLastKey, activeKey, collection]);

  // Get props for collection container
  const getCollectionProps = useCallback(() => {
    if (disabled) return {};

    return {
      onKeyDown: handleKeyDown,
    };
  }, [disabled, handleKeyDown]);

  // Helper to merge refs and manage itemRefs Map
  const mergeRefs = (key, userRef) => {
    // Ref callback to manage itemRefs Map
    const trackRef = (element) => {
      if (element) {
        itemRefs.current.set(key, element);
      } else {
        itemRefs.current.delete(key);
      }
    };

    // Use utility mergeRefs to combine tracking ref with user ref
    return mergeRefsUtil(trackRef, userRef);
  };

  // Get props for individual items
  const getItemProps = useCallback((key, options = {}) => {
    if (disabled) return {};

    const isActive = key === activeKey;
    const { focusable = true, ref, onFocus, ariaProps } = options;

    // Respect initial tabIndex from ariaProps when there's no activeKey
    // This allows tree pattern to set tabIndex: 0 on first item without triggering focus
    const initialTabIndex = ariaProps?.tabIndex;
    const shouldUseInitialTabIndex = !activeKey && typeof initialTabIndex === 'number';

    return {
      tabIndex: isActive && focusable ? 0 : (shouldUseInitialTabIndex ? initialTabIndex : -1),
      "data-active": isActive,
      ref: mergeRefs(key, ref),
      onFocus: (event) => {
        if (!isActive && event.target === event.currentTarget) {
          navigateTo(key);
        }
        onFocus?.(event);
      },
    };
  }, [disabled, activeKey, navigateTo]);

  // Check if key is active
  const isActive = useCallback((key) => key === activeKey, [activeKey]);

  return {
    // State
    activeKey,

    // Navigation methods
    getNextKey,
    getPrevKey,
    getFirstKey,
    getLastKey,

    // Utilities
    isActive,
    navigateTo,

    // Props getters
    getCollectionProps,
    getItemProps,
  };
};
