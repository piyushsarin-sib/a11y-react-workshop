/**
 * Collection.Section Component
 *
 * Creates a labeled section/group within a Collection tree.
 * Renders proper ARIA structure with role="group" and aria-labelledby.
 *
 * Structure:
 * <li role="none">
 *   <div role="none" id="heading-id">Section Title</div>
 *   <ul role="group" aria-labelledby="heading-id">
 *     <Collection.Item>Item 1</Collection.Item>
 *   </ul>
 * </li>
 *
 * Usage:
 * <Collection pattern="tree">
 *   <Collection.Section title="File Operations">
 *     <Collection.Item>New File</Collection.Item>
 *     <Collection.Item>Open File</Collection.Item>
 *   </Collection.Section>
 * </Collection>
 */
import React from "react";
import { useCollectionContext } from "../CollectionContext.js";
import CollectionContext from "../CollectionContext.js";

const Section = React.forwardRef(({
  title,
  children,
  className = "",
  ...props
}, ref) => {
  const parentContext = useCollectionContext();
  const headingId = React.useId();

  // Section itself doesn't increment level - the group inside does
  // Group maintains the same level as parent, items inside increment
  const currentLevel = parentContext?.level || 1;

  // Provide context for items inside the group
  const contextValue = React.useMemo(() => ({
    level: currentLevel,
    pattern: parentContext?.pattern,
  }), [currentLevel, parentContext?.pattern]);

  return (
    <li role="none">
      {/* Section heading - no ARIA attributes besides role="none" */}
      <div role="none" id={headingId} className="collection-section-title">
        {title}
      </div>

      {/* Group container with aria-labelledby pointing to heading */}
      <CollectionContext.Provider value={contextValue}>
        <ul
          ref={ref}
          role="group"
          aria-labelledby={headingId}
          className={`collection-section ${className}`.trim()}
          {...props}
        >
          {children}
        </ul>
      </CollectionContext.Provider>
    </li>
  );
});

Section.displayName = "Collection.Section";

export default Section;
