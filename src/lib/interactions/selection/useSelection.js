import { useState, useCallback, useMemo } from "react";
import { COLLECTION_PATTERNS } from "@lib/Collections/constants/aria-config";

/**
 * Hook for managing collection item selection
 * Accepts and returns arrays, but uses Set internally for performance
 *
 * @param {Object} options - Configuration options
 * @param {string} options.selectionMode - 'none', 'single', or 'multiple'
 * @param {Array} options.selectedKeys - Controlled selected keys as array (controlled mode)
 * @param {Function} options.onChange - Selection change handler: (event, { selectedKeys: Array }) => void
 * @param {Array} options.defaultSelectedKeys - Default selected items as array (uncontrolled mode)
 * @param {string} options.role - Collection role for proper ARIA attributes
 * @param {string} options.pattern - Pre-configured pattern ('listbox', 'menu', 'tabs', 'tree', 'radiogroup', 'checkboxgroup')
 * @param {string} options.label - Accessible label for the collection
 * @returns {Object} Selection state and handlers (selectedKeys returned as Set for ARIA compatibility)
 */
export const useSelection = ({
  selectionMode = "none",
  selectedKeys: controlledSelectedKeys,
  onChange,
  defaultSelectedKeys = [],
  pattern,
} = {}) => {
  // Convert array inputs to Sets internally
  const controlledSelectedKeysSet = controlledSelectedKeys !== undefined
    ? new Set(controlledSelectedKeys)
    : undefined;

  // Determine if we're in controlled or uncontrolled mode
  const isControlled = controlledSelectedKeys !== undefined;

  // Internal state for uncontrolled mode (stored as Set)
  const [internalSelectedKeys, setInternalSelectedKeys] = useState(
    () => new Set(defaultSelectedKeys)
  );

  // Use controlled or uncontrolled state (always a Set)
  const selectedKeys = isControlled ? controlledSelectedKeysSet : internalSelectedKeys;

  // Get pattern config for selection attributes
  const patternConfig = useMemo(() => {
    return pattern ? COLLECTION_PATTERNS[pattern] : {};
  }, [pattern]);

  const selectionAttribute = patternConfig.selectionAttribute;

  const handleSelection = useCallback(
    (event, { key, item }) => {
      if (selectionMode === "none") return;

      let newSelection = new Set(selectedKeys);

      if (selectionMode === "single") {
        // Single selection - replace current selection
        newSelection = selectedKeys.has(key) ? new Set() : new Set([key]);
      } else if (selectionMode === "multiple") {
        // Multiple selection - toggle item
        if (newSelection.has(key)) {
          newSelection.delete(key);
        } else {
          newSelection.add(key);
        }
      }

      // Update state for both controlled and uncontrolled modes
      // Convert Set to Array for onChange callback
      const selectedKeysArray = Array.from(newSelection);

      if (isControlled) {
        // In controlled mode, call onChange to notify parent with item data
        onChange?.(event, { selectedKeys: selectedKeysArray, selectedItem: item, key });
      } else {
        // In uncontrolled mode, update internal state and call onChange if provided
        setInternalSelectedKeys(newSelection);
        onChange?.(event, { selectedKeys: selectedKeysArray, selectedItem: item, key });
      }
    },
    // setSelectedKeys is intentionally omitted - it's either onChange (controlled) or setState (uncontrolled)
    // Adding it would cause unnecessary re-renders when consumers don't memoize onChange
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedKeys, selectionMode, isControlled],
  );

  // Separate handlers from ARIA props
  const getItemHandlers = useCallback(
    (key, item) => {
      if (selectionMode === "none") return {};

      return {
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation(); // Prevent event bubbling to parent items
          handleSelection(e, { key, item });
        },
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation(); // Prevent event bubbling to parent items
            handleSelection(e, { key, item });
          }
        },
      };
    },
    [selectionMode, handleSelection],
  );

  const getItemAriaProps = useCallback(
    (key, options = {}) => {
      if (selectionMode === "none" || !selectionAttribute) return {};

      const isSelected = selectedKeys.has(key);
      const ariaProps = {};

      // Add selection attribute (aria-selected or aria-checked)
      ariaProps[selectionAttribute] = isSelected;

      // Merge with any additional options
      return { ...ariaProps, ...options };
    },
    [selectedKeys, selectionMode, selectionAttribute],
  );

  // Combined props (backward compatibility)
  const getItemSelectionProps = useCallback(
    (key, item, options = {}) => {
      return {
        ...getItemHandlers(key, item),
        ...getItemAriaProps(key, options),
        "data-selected": selectedKeys.has(key),
      };
    },
    [getItemHandlers, getItemAriaProps, selectedKeys],
  );

  const clearSelection = useCallback(() => {
    const newSelection = new Set();
    const selectedKeysArray = [];

    if (isControlled) {
      onChange?.(null, { selectedKeys: selectedKeysArray });
    } else {
      setInternalSelectedKeys(newSelection);
      onChange?.(null, { selectedKeys: selectedKeysArray });
    }
  }, [isControlled, onChange]);

  const selectAll = useCallback(
    (allKeys) => {
      if (selectionMode !== "multiple") return;

      const newSelection = new Set(allKeys);
      const selectedKeysArray = Array.from(newSelection);

      if (isControlled) {
        onChange?.(null, { selectedKeys: selectedKeysArray });
      } else {
        setInternalSelectedKeys(newSelection);
        onChange?.(null, { selectedKeys: selectedKeysArray });
      }
    },
    [selectionMode, isControlled, onChange],
  );

  const isSelected = useCallback((key) => selectedKeys.has(key), [selectedKeys]);

  // Helper methods for easier access
  const toggleSelection = useCallback(
    (event, { key }) => {
      handleSelection(event, { key });
    },
    [handleSelection],
  );

  const replaceSelection = useCallback(
    (key) => {
      const newSelection = new Set([key]);
      const selectedKeysArray = Array.from(newSelection);

      if (isControlled) {
        onChange?.(null, { selectedKeys: selectedKeysArray });
      } else {
        setInternalSelectedKeys(newSelection);
        onChange?.(null, { selectedKeys: selectedKeysArray });
      }
    },
    [isControlled, onChange],
  );

  return {
    selectedKeys,
    selectionMode,
    isSelected,
    // Separate handlers and ARIA props
    getItemHandlers,
    getItemAriaProps,
    // Combined props (backward compatibility)
    getItemSelectionProps,
    // Selection methods
    clearSelection,
    selectAll,
    toggleSelection,
    replaceSelection,
    // Selection state
    hasSelection: selectedKeys.size > 0,
    selectionCount: selectedKeys.size,
  };
};
