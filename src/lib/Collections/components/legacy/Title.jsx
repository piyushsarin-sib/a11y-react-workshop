/**
 * Collection.Title Component
 *
 * Title component for section headings within collections.
 *
 * Automatically handles correct semantics:
 * - Announced by screen readers as a heading
 * - Not in tab order (tabIndex=-1)
 * - Semantic heading role with configurable level
 * - Proper styling (className="collection-title")
 *
 * Usage:
 *   <Collection.Title>Section Name</Collection.Title>
 *   <Collection.Title headingLevel={3}>Custom Level</Collection.Title>
 */
import React from "react";

const Title = React.forwardRef(({
  children,
  as: ElementType = "li", // eslint-disable-line no-unused-vars
  className = "",
  headingLevel = 3,  // Default to h3
  ...props
}, ref) => {
  return (
    <ElementType
      ref={ref}
      role="heading"
      aria-level={headingLevel}
      className={`collection-title ${className}`.trim()}
      tabIndex={-1}
      {...props}
    >
      {children}
    </ElementType>
  );
});

Title.displayName = "Collection.Title";

export default Title;
