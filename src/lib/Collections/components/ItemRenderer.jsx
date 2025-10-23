import React from 'react';
import { mergeProps } from '@lib/utils';

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
  itemAs: ItemElement = 'li',
  sectionWrapperAs: SectionWrapper = 'li',
  sectionGroupAs: SectionGroup = 'ul',
}) {
  // Render section with nested group
  if (node.type === 'section') {
    const headingId = `section-${node.key}`;

    // Extract custom props from node (excluding component-specific props)
    const { children: _children, title: _title, as: _as, innerAs: _innerAs, innerProps: _innerProps, ...customProps } = node.props || {};

    // Merge section wrapper props
    const sectionProps = mergeProps(
      { role: "presentation" },
      customProps
    );

    return (
      <SectionWrapper {...sectionProps}>
        <div id={headingId}>
          {node.rendered}
        </div>
        {node.childNodes && node.childNodes.length > 0 && (
          <SectionGroup role="group" aria-labelledby={headingId}>
            {node.childNodes.map(childNode => (
              <ItemRenderer
                key={childNode.key}
                node={childNode}
                nav={nav}
                selection={selection}
                itemAs={ItemElement}
                sectionWrapperAs={SectionWrapper}
                sectionGroupAs={SectionGroup}
              />
            ))}
          </SectionGroup>
        )}
      </SectionWrapper>
    );
  }

  // Render item - extract custom props, excluding component-specific ones
  const { children: _children, as: _as, innerAs: _innerAs, innerProps: _innerProps, role: _role, 'aria-level': _ariaLevel, ...customPropsFromNode } = node.props || {};

  // Merge all item props using mergeProps utility
  // Order: base style < custom props < ARIA props (from node) < navigation props < selection props (if provided)
  const itemProps = mergeProps(
    { style: node.indentStyle },
    customPropsFromNode,
    node.ariaProps,  // Pre-computed ARIA attributes from useCollectionState
    nav.getItemProps(node.key),
    selection ? selection.getItemSelectionProps(node.key, node) : {}
  );

  // If item has nested children, render them in a group
  if (node.childNodes && node.childNodes.length > 0) {
    // Filter out collection components (Item/Section) from rendered content
    // Keep regular elements (divs, spans) and text content
    const contentOnly = React.Children.toArray(node.rendered).filter(
      child => !React.isValidElement(child) || !child.type?.getCollectionNode
    );

    return (
      <ItemElement {...itemProps}>
        {contentOnly}
        <SectionGroup role="group">
          {node.childNodes.map(childNode => (
            <ItemRenderer
              key={childNode.key}
              node={childNode}
              nav={nav}
              selection={selection}
              itemAs={ItemElement}
              sectionWrapperAs={SectionWrapper}
              sectionGroupAs={SectionGroup}
            />
          ))}
        </SectionGroup>
      </ItemElement>
    );
  }

  return (
    <ItemElement {...itemProps}>
      {node.rendered}
    </ItemElement>
  );
}

ItemRenderer.displayName = 'ItemRenderer';

export default ItemRenderer;
