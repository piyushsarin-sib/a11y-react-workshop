/**
 * Tree.Item Component
 *
 * Virtual component that returns null - used for metadata extraction only
 * Similar to React Aria's Item component
 */
import React from 'react';

const TreeItem = () => {
  return null;  // Virtual component - doesn't render
};

TreeItem.displayName = 'Tree.Item';

/**
 * Static method to extract collection node metadata
 * Used by useCollectionState to build the collection
 */
TreeItem.getCollectionNode = function* (props) {
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

export default TreeItem;
