import { useMemo, useCallback } from 'react';
import { COLLECTION_PATTERNS } from '../constants/aria-config.js';
import { buildCollection } from '../utils/buildCollection.js';
import { buildCollectionAriaProps } from '../utils/buildCollectionAriaProps.js';
import * as navigationHelpers from '../utils/collectionNavigation.js';

/**
 * Hook to build collection state from JSX children or data structures
 * Similar to React Aria's useListState with rich Node metadata
 *
 * Returns Node objects with:
 * - key: unique identifier
 * - name/rendered: display content
 * - type: "item" | "section"
 * - ariaProps: Pre-computed ARIA attributes (role, aria-level, etc.)
 * - level: depth in tree (1, 2, 3...)
 * - parentKey: parent item key
 * - index: position within parent
 * - indentStyle: computed style for visual indentation
 *
 * @param {Object} props
 * @param {ReactNode} props.children - JSX children to introspect
 * @param {number} props.indentSize - Pixels to indent per level (default: 24)
 * @param {string} props.pattern - Collection pattern ('tree', 'menu', 'listbox', etc.)
 * @param {string} props.ariaLabel - Accessible label for the collection
 * @param {string} props.ariaLabelledBy - ID of element that labels the collection
 * @param {string} props.ariaDescribedBy - ID of element that describes the collection
 * @returns {Object} Collection state with rich Node objects and navigation methods
 * @returns {Array} return.collection - Hierarchical nodes with sections
 * @returns {Array} return.items - Flat array of focusable items
 * @returns {Function} return.getFirstKey - Get first item key: () => key|null
 * @returns {Function} return.getLastKey - Get last item key: () => key|null
 * @returns {Function} return.getKeyBefore - Get previous key: (key) => key|null
 * @returns {Function} return.getKeyAfter - Get next key: (key) => key|null
 * @returns {Function} return.getItem - Get item node: (key) => node|null
 * @returns {Function} return.getCollectionProps - Get ARIA props for collection container
 */
export const useCollectionState = ({
  children,
  indentSize = 24,
  pattern,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
}) => {
  // Get pattern config for roles
  const patternConfig = pattern ? COLLECTION_PATTERNS[pattern] : {};
  const itemRole = patternConfig.itemRole;

  // Build collection from children
  const { collection, focusableItems } = useMemo(() => {
    return buildCollection({
      children,
      pattern,
      itemRole,
      indentSize,
    });
  }, [children, indentSize, itemRole, pattern]);

  // Navigation methods using helpers
  const getFirstKey = () => navigationHelpers.getFirstKey(focusableItems);
  const getLastKey = () => navigationHelpers.getLastKey(focusableItems);
  const getKeyBefore = (key) => navigationHelpers.getKeyBefore(focusableItems, key);
  const getKeyAfter = (key) => navigationHelpers.getKeyAfter(focusableItems, key);
  const getItem = (key) => navigationHelpers.getItem(focusableItems, key);

  // Get ARIA props for collection container using helper
  const getCollectionProps = useCallback(() => {
    return buildCollectionAriaProps({
      role: patternConfig.role,
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
    });
  }, [patternConfig.role, ariaLabel, ariaLabelledBy, ariaDescribedBy]);

  return {
    collection,        // Hierarchical nodes (sections with childNodes)
    items: focusableItems,  // Flat array of focusable items only (for keyboard nav)

    // Navigation methods (similar to React Aria)
    getFirstKey,
    getLastKey,
    getKeyBefore,
    getKeyAfter,
    getItem,

    // ARIA props for collection container
    getCollectionProps,
  };
};
