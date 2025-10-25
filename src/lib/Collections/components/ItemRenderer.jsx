import React from "react";
import { mergeProps } from "@lib/utils";

/**
 * ItemRenderer - React component for rendering collection items and sections
 *
 * Replaces the createCollectionRenderer factory pattern with a proper React component
 * for better composability, debugging, and React-like patterns.
 *
 * @param {Object} props
 * @param {Object} props.node - Collection node with metadata (key, type, ariaProps, rendered, etc.)
 * @param {Object} props.nav - Navigation helper from useRovingIndex or useKeyboardNavigation
 * @param {Object} [props.selection] - Optional selection helper from useSelection
 * @param {string|Component} [props.itemAs='li'] - Element or component for items
 * @param {string|Component} [props.sectionWrapperAs='li'] - Element for section wrapper
 * @param {string|Component} [props.sectionGroupAs='ul'] - Element for section group
 * @returns {JSX.Element} Rendered item or section
 */
export function ItemRenderer({
  node,
  nav,
  selection,
  itemAs: ItemElement = "li",
  sectionWrapperAs: SectionWrapper = "li",
  sectionGroupAs: SectionGroup = "ul",
}) {
  // Helper to render nested children recursively
  const renderChildren = (childNodes) => {
    return childNodes.map((childNode) => (
      <ItemRenderer
        key={childNode.key}
        node={childNode}
        nav={nav}
        selection={selection}
        itemAs={ItemElement}
        sectionWrapperAs={SectionWrapper}
        sectionGroupAs={SectionGroup}
      />
    ));
  };

  // Render section with nested group
  if (node.type === "section") {
    const headingId = `section-${node.key}`;
    const hasChildren = node.childNodes?.length > 0;

    // Extract custom props (excluding component-specific props)
    const {
      children: _children,
      title: _title,
      as: _as,
      innerAs: _innerAs,
      innerProps: _innerProps,
      ...customProps
    } = node.props || {};

    return (
      <SectionWrapper {...mergeProps({ role: node.sectionWrapperRole }, customProps)}>
        <div id={headingId} role={node.sectionTitleRole} className="menu-section-title">{node.rendered}</div>
        {hasChildren && (
          <SectionGroup role={node.sectionGroupRole} aria-labelledby={headingId} tabIndex={undefined}>
            {renderChildren(node.childNodes)}
          </SectionGroup>
        )}
      </SectionWrapper>
    );
  }

  // Render item - extract custom props (excluding component-specific props)
  const {
    children: _children,
    as: _as,
    innerAs: _innerAs,
    innerProps: _innerProps,
    role: _role,
    "aria-level": _ariaLevel,
    ...customPropsFromNode
  } = node.props || {};

  // Merge all item props using mergeProps utility
  // Order: base style < custom props < ARIA props < navigation props < selection props
  const itemProps = mergeProps(
    { style: node.indentStyle },
    customPropsFromNode,
    node.ariaProps, // Pre-computed ARIA attributes from useCollectionState
    nav.getItemProps(node.key, node),
    selection ? selection.getItemSelectionProps(node.key, node) : {},
  );

  const hasChildren = node.childNodes?.length > 0;

  // Item with nested children
  if (hasChildren) {
    return (
      <ItemElement {...itemProps}>
        {node.rendered}
        <SectionGroup role="group" tabIndex={undefined}>
          {renderChildren(node.childNodes)}
        </SectionGroup>
      </ItemElement>
    );
  }

  // Leaf item
  return <ItemElement {...itemProps}>{node.rendered}</ItemElement>;
}

ItemRenderer.displayName = "ItemRenderer";

export default ItemRenderer;
