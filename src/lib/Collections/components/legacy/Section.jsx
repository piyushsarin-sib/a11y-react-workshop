/**
 * Collection.Section Component (Legacy)
 *
 * Creates a labeled section/group within a Collection tree.
 * Renders proper ARIA structure with role="group" and aria-labelledby.
 */
import React from "react";
import { useCollectionContext } from "../../CollectionContext.js";
import CollectionContext from "../../CollectionContext.js";

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

/**
 * Static method to extract collection node metadata for keyboard navigation
 * Sections are structural elements that group items
 */
Section.getCollectionNode = function* (props) {
  // Yield the section node metadata
  yield {
    type: 'section',
    rendered: props.title,  // Section title to display
    textValue: props.title,
    props: props,
    hasChildren: true,  // Sections always have children
  };
};

export default Section;
