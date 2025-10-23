/**
 * Collection.Item Component
 *
 * Simple item component that forwards all props to the rendered element.
 * Users manually spread behavior props: <Collection.Item {...gridNav.getItemProps(id)}>
 *
 * Supports nested structure (e.g., li > button) where:
 * - Outer element is structural (role="presentation")
 * - Inner element is interactive (gets all behavior props)
 *
 * Auto-detects nesting level from context and applies:
 * - aria-level for tree items
 * - role="treeitem" for tree patterns
 */
import React from "react";
import { useCollectionContext } from "../CollectionContext.js";

const Item = React.forwardRef(({
  children,
  as: ElementType = "li", // eslint-disable-line no-unused-vars
  innerAs: InnerElement,
  innerProps = {},
  role: explicitRole,
  "aria-level": explicitAriaLevel,
  // Grid-specific props
  rowIndex,
  gridItemRole = "rowheader",
  titleId,
  descriptionId,
  ...props
}, ref) => {
  // Read context for automatic nesting support
  const context = useCollectionContext();
  const isGrid = context?.pattern === 'grid';

  // Grid pattern: wrap in row with rowheader
  if (isGrid && rowIndex) {
    const itemAriaProps = {
      role: gridItemRole,
      'aria-colindex': 1,
      ...(titleId && { 'aria-labelledby': titleId }),
      ...(descriptionId && { 'aria-describedby': descriptionId }),
    };

    // Support nested structure (e.g., article > button)
    if (InnerElement) {
      return (
        <div role="row" aria-rowindex={rowIndex}>
          <ElementType ref={ref} {...itemAriaProps}>
            <InnerElement {...props} {...innerProps}>
              {children}
            </InnerElement>
          </ElementType>
        </div>
      );
    }

    // Simple structure
    return (
      <div role="row" aria-rowindex={rowIndex}>
        <ElementType ref={ref} {...itemAriaProps} {...props}>
          {children}
        </ElementType>
      </div>
    );
  }

  // Auto-apply aria-level and role for tree items (only if not explicitly set)
  const ariaLevel = explicitAriaLevel ?? (context?.pattern === 'tree' ? context.level : undefined);
  const itemRole = explicitRole ?? (context?.pattern === 'tree' ? 'treeitem' : undefined);
  
  // Support nested structure (e.g., li > button)
  // Outer element is structural, inner element is interactive
  if (InnerElement) {
    return (
      <ElementType role="presentation">
        <InnerElement
          ref={ref}
          role={itemRole}
          aria-level={ariaLevel}
          {...props}
          {...innerProps}
        >
          {children}
        </InnerElement>
      </ElementType>
    );
  }

  // Simple structure (e.g., just li)
  return (
    <ElementType
      role={itemRole}
      aria-level={ariaLevel}
      {...props}
      ref={ref}
    >
      {children}
    </ElementType>
  );
});

Item.displayName = "Collection.Item";

export default Item;
