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
  ...props
}, ref) => {
  // Read context for automatic nesting support
  const context = useCollectionContext();

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
