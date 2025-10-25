import React from "react";
import { buildNodeAriaProps } from "./buildNodeAriaProps.js";

/**
 * Build collection from JSX children
 * Recursively traverses children to create a hierarchical collection with metadata
 *
 * @param {Object} options
 * @param {ReactNode} options.children - JSX children to process
 * @param {string} options.pattern - Collection pattern ('tree', 'menu', etc.)
 * @param {string} options.itemRole - Role for items from pattern config
 * @param {number} options.indentSize - Pixels to indent per level
 * @returns {Object} Collection data with hierarchical nodes and flat focusable items
 * @returns {Array} return.collection - Hierarchical nodes with sections
 * @returns {Array} return.focusableItems - Flat array of focusable items only
 */
export function buildCollection({ children, pattern, itemRole, indentSize }) {
  const focusableItems = []; // Items only (for keyboard nav)
  let isFirstItemMarked = false; // Track if we've marked the first item

  const traverse = (children, level = 1, parentKey = null) => {
    const nodes = [];
    let index = 0;

    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child) || !child.type?.getCollectionNode || !child.key) return;

      const generator = child.type.getCollectionNode(child.props);
      const nodeData = generator.next().value;
      if (!nodeData) return;

      const isSection = child.type?.displayName?.includes("Section");

      // Check if node has children (look for nested Item/Section components)
      const hasChildren =
        child.props?.children &&
        React.Children.toArray(child.props.children).some(
          (child) => React.isValidElement(child) && child.type?.getCollectionNode,
        );

      // Mark the first focusable item for tree pattern (to get tabindex="0")
      const isFirstFocusable = !isFirstItemMarked && !isSection && pattern === "tree";
      if (isFirstFocusable) {
        isFirstItemMarked = true;
      }

      // Build ARIA props for the node
      const ariaProps = buildNodeAriaProps({
        pattern,
        itemRole,
        level,
        isSection,
        hasChildren,
        isFirstFocusable,
      });

      // Build node with complete ARIA attributes
      const node = {
        key: child.key,
        type: isSection ? "section" : "item",
        rendered: nodeData.rendered,
        level,
        parentKey,
        index: index++,
        indentStyle: level > 1 ? { paddingLeft: `${(level - 1) * indentSize}px` } : {},
        ariaProps, // Pre-computed ARIA attributes for items
        props: child.props, // Store original props for custom overrides
        // Section-specific roles (only for sections)
        sectionWrapperRole: isSection ? "presentation" : undefined,
        sectionTitleRole: isSection ? "presentation" : undefined,
        sectionGroupRole: isSection ? "group" : undefined,
      };

      nodes.push(node);

      // Add items (not sections) to focusable list BEFORE processing children
      // This ensures document order: parent → children
      if (!isSection) {
        focusableItems.push(node);
      }

      // Process children AFTER adding parent to focusableItems
      if (hasChildren) {
        const childNodes = traverse(child.props.children, isSection ? level : level + 1, child.key);
        if (childNodes.length > 0) {
          node.childNodes = childNodes;
        }
      }
    });

    return nodes;
  };

  if (!children) {
    return { collection: [], focusableItems: [] };
  }

  return {
    collection: traverse(children),
    focusableItems,
  };
}
