/**
 * Item Component (Clean)
 *
 * Lightweight item component that only provides metadata.
 * Rendering is handled by ItemRenderer in parent components (Tree, etc.)
 *
 * For legacy rendering behavior, use legacy/Item.jsx
 */
import React from "react";

// eslint-disable-next-line no-unused-vars
const Item = React.forwardRef((props, ref) => {
  // This component doesn't render - it's processed by useCollectionState
  // and rendered by ItemRenderer
  return null;
});

Item.displayName = "Item";

/**
 * Static method to extract collection node metadata
 * This allows useCollectionState to introspect JSX children
 */
Item.getCollectionNode = function* (props) {
  // Extract text value for navigation
  let textValue = '';
  if (typeof props.children === 'string') {
    textValue = props.children;
  } else if (props['aria-label']) {
    textValue = props['aria-label'];
  }

  // Yield the node metadata
  yield {
    type: 'item',
    rendered: props.children,
    textValue: textValue,
    props: props,
  };
};

export default Item;
