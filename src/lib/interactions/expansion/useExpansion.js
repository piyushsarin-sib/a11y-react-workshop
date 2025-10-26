import { useState, useCallback } from 'react';

/**
 * Hook for managing expansion state in collections (trees, accordions, menus)
 * Provides both controlled and uncontrolled behavior
 *
 * @param {Object} options - Configuration options
 * @param {Set} options.defaultExpanded - Initial expanded items (uncontrolled)
 * @param {Set} options.expanded - Controlled expanded state
 * @param {Function} options.onExpand - Controlled change handler (event, { expanded })
 * @param {boolean} options.allowMultiple - Allow multiple items expanded (default: true)
 * @param {boolean} options.collapsible - Allow collapsing the last expanded item (default: true)
 *
 * @returns {Object} Expansion utilities and state
 */
export const useExpansion = ({
  defaultExpanded = new Set(),
  expanded: controlledExpanded,
  onExpand,
  allowMultiple = true,
  collapsible = true,
} = {}) => {
  // Internal state for uncontrolled mode
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  // Determine if we're in controlled mode
  const isControlled = controlledExpanded !== undefined;

  // Use controlled state if provided, otherwise use internal
  const expanded = isControlled ? controlledExpanded : internalExpanded;

  // Handle state updates (controlled or uncontrolled)
  const updateExpanded = useCallback((event = null, { expanded: newExpanded }) => {
    if (isControlled) {
      onExpand?.(event, { expanded: newExpanded });
    } else {
      setInternalExpanded(newExpanded);
    }
  }, [isControlled, onExpand]);

  // Toggle single item
  const toggle = useCallback((event, { key }) => {
    const newExpanded = new Set(expanded);
    const wasExpanded = newExpanded.has(key);

    if (wasExpanded) {
      // Collapsing
      if (collapsible || newExpanded.size > 1) {
        newExpanded.delete(key);
      }
    } else {
      // Expanding
      if (!allowMultiple) {
        newExpanded.clear();
      }
      newExpanded.add(key);
    }

    updateExpanded(event, { expanded: newExpanded });
  }, [expanded, allowMultiple, collapsible, updateExpanded]);

  // Expand specific items
  const expand = useCallback((keys) => {
    const keysArray = Array.isArray(keys) ? keys : [keys];
    const newExpanded = allowMultiple ? new Set(expanded) : new Set();

    keysArray.forEach(key => newExpanded.add(key));
    updateExpanded(null, { expanded: newExpanded });
  }, [expanded, allowMultiple, updateExpanded]);

  // Collapse specific items
  const collapse = useCallback((keys) => {
    const keysArray = Array.isArray(keys) ? keys : [keys];
    const newExpanded = new Set(expanded);

    keysArray.forEach(key => newExpanded.delete(key));
    updateExpanded(null, { expanded: newExpanded });
  }, [expanded, updateExpanded]);

  // Collapse all items
  const collapseAll = useCallback(() => {
    updateExpanded(null, { expanded: new Set() });
  }, [updateExpanded]);

  // Expand all items (requires items list)
  const expandAll = useCallback((allKeys) => {
    updateExpanded(null, { expanded: new Set(allKeys) });
  }, [updateExpanded]);

  // Get props for expandable items with combined onClick handling
  const getItemProps = useCallback((key, options = {}) => {
    const {
      hasChildren = false,
      onClick,
      disabled = false,
      ...otherOptions
    } = options;

    if (!hasChildren || disabled) {
      return {
        onClick,
        ...otherOptions
      };
    }

    return {
      'aria-expanded': expanded.has(key),
      onClick: (e) => {
        toggle(e, { key });        // Handle expansion
        onClick?.(e, { key });     // Handle custom click
      },
      ...otherOptions
    };
  }, [expanded, toggle]);

  // Get props for toggle buttons (separate from item)
  const getToggleProps = useCallback((key, options = {}) => {
    const {
      onClick,
      disabled = false,
      'aria-label': ariaLabel,
      ...otherOptions
    } = options;

    return {
      type: 'button',
      'aria-expanded': expanded.has(key),
      'aria-label': ariaLabel || `Toggle ${key}`,
      onClick: (e) => {
        e.stopPropagation(); // Prevent item selection if item has its own onClick
        toggle(e, { key });
        onClick?.(e, { key });
      },
      disabled,
      ...otherOptions
    };
  }, [expanded, toggle]);

  return {
    // State
    expanded,
    isExpanded: (key) => expanded.has(key),

    // Actions
    toggle,
    expand,
    collapse,
    expandAll,
    collapseAll,

    // Prop generators
    getItemProps,
    getToggleProps,

    // Meta
    isControlled,
  };
};

export default useExpansion;