/**
 * Section Component (Clean)
 *
 * Lightweight section component that only provides metadata.
 * Rendering is handled by ItemRenderer in parent components (Tree, etc.)
 *
 * For legacy rendering behavior, use legacy/Section.jsx
 */
import React from "react";

// eslint-disable-next-line no-unused-vars
const Section = React.forwardRef((props, ref) => {
  // This component doesn't render - it's processed by useCollectionState
  // and rendered by ItemRenderer
  return null;
});

Section.displayName = "Section";

/**
 * Static method to extract collection node metadata
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
