/**
 * Build ARIA attributes for a collection node
 *
 * Note: Selection attributes (aria-selected/aria-checked) are handled by useSelection hook
 * and merged in ItemRenderer, not here.
 *
 * @param {Object} options
 * @param {string} options.pattern - Collection pattern ('tree', 'menu', etc.)
 * @param {string} options.itemRole - Role for items from pattern config
 * @param {number} options.level - Nesting level
 * @param {boolean} options.isSection - Whether node is a section
 * @param {boolean} options.hasChildren - Whether node has child items
 * @param {boolean} options.isFirstFocusable - Whether this is the first focusable item
 * @returns {Object} ARIA attributes for the node (role, aria-level, aria-expanded, tabIndex)
 */
export function buildNodeAriaProps({ pattern, itemRole, level, isSection, hasChildren, isFirstFocusable }) {
  const ariaProps = {};

  if (!isSection && itemRole) {
    ariaProps.role = itemRole;

    // Tree-specific attributes
    if (pattern === 'tree') {
      ariaProps['aria-level'] = level;

      // Add aria-expanded for items with children (always true since they're visible)
      if (hasChildren) {
        ariaProps['aria-expanded'] = true;
      }

      // First focusable item gets tabIndex 0 (for roving tabindex pattern)
      if (isFirstFocusable) {
        ariaProps.tabIndex = 0;
      }
    }
  }

  return ariaProps;
}
