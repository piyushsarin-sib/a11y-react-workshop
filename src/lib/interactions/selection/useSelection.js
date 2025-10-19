import { useState, useCallback } from "react";
import { createCollectionAria } from "@lib/Collections/utils/createCollectionAria";

/**
 * Hook for managing collection item selection
 * @param {Object} options - Configuration options
 * @param {string} options.selectionMode - 'none', 'single', or 'multiple'
 * @param {Set} options.selectedKeys - Controlled selected keys (controlled mode)
 * @param {Function} options.onChange - Selection change handler (called on both controlled and uncontrolled modes)
 * @param {Set} options.defaultSelectedKeys - Default selected items (uncontrolled mode)
 * @param {string} options.role - Collection role for proper ARIA attributes
 * @param {string} options.pattern - Pre-configured pattern ('listbox', 'menu', 'tabs', 'tree', 'radiogroup', 'checkboxgroup')
 * @param {string} options.label - Accessible label for the collection
 * @returns {Object} Selection state and handlers
 */
export const useSelection = ({
  selectionMode = "none",
  selectedKeys: controlledSelectedKeys,
  onChange,
  defaultSelectedKeys = new Set(),
  role,
  pattern,
  label,
} = {}) => {
  // Determine if we're in controlled or uncontrolled mode
  const isControlled = controlledSelectedKeys !== undefined;

  // Internal state for uncontrolled mode
  const [internalSelectedKeys, setInternalSelectedKeys] = useState(defaultSelectedKeys);

  // Use controlled or uncontrolled state
  const selectedKeys = isControlled ? controlledSelectedKeys : internalSelectedKeys;

  // Initialize ARIA factory function for proper selection attributes (pattern is handled internally)
  const aria = createCollectionAria({
    role,
    pattern,
    selectionMode: selectionMode !== "none" ? selectionMode : undefined,
    selectedKeys,
    label,
  });

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
      if (isControlled) {
        // In controlled mode, call onChange to notify parent with item data
        onChange?.(event, { selectedKeys: newSelection, selectedItem: item, key });
      } else {
        // In uncontrolled mode, update internal state and call onChange if provided
        setInternalSelectedKeys(newSelection);
        onChange?.(event, { selectedKeys: newSelection, selectedItem: item, key });
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
          handleSelection(e, { key, item });
        },
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleSelection(e, { key, item });
          }
        },
        tabIndex: 0,
      };
    },
    [selectionMode, handleSelection],
  );

  const getItemAriaProps = useCallback(
    (key, options = {}) => {
      if (selectionMode === "none") return {};

      const isSelected = selectedKeys.has(key);

      // Get ARIA props from the aria hook
      return aria.getItemAriaProps(key, {
        ...options,
        selected: isSelected,
      });
    },
    [selectedKeys, selectionMode, aria],
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
    if (isControlled) {
      onChange?.(null, { selectedKeys: newSelection });
    } else {
      setInternalSelectedKeys(newSelection);
      onChange?.(null, { selectedKeys: newSelection });
    }
  }, [isControlled, onChange]);

  const selectAll = useCallback(
    (allKeys) => {
      if (selectionMode !== "multiple") return;

      const newSelection = new Set(allKeys);
      if (isControlled) {
        onChange?.(null, { selectedKeys: newSelection });
      } else {
        setInternalSelectedKeys(newSelection);
        onChange?.(null, { selectedKeys: newSelection });
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
      if (isControlled) {
        onChange?.(null, { selectedKeys: newSelection });
      } else {
        setInternalSelectedKeys(newSelection);
        onChange?.(null, { selectedKeys: newSelection });
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
    // Collection ARIA props from createCollectionAria
    getCollectionAriaProps: aria.getCollectionAriaProps,
  };
};
