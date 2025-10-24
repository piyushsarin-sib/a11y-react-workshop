/**
 * Collection.Nested Component
 *
 * NestedCollection helper for auto-indenting tree structures.
 * Kept for backward compatibility.
 *
 * Automatically handles:
 * - Hierarchical indentation
 * - Recursive rendering of nested items
 * - ARIA levels for tree structures
 */
import React from "react";
import Item from "./Item.jsx";

const NestedCollection = ({
  children,
  items,
  as: Wrapper = "ul",
  itemAs: ItemElement = "li",
  className = "",
  level = 1,
  parentKey,
  renderItem,
  autoIndent = true,
  indentSize = 24,
  unstyled = true,
  ...props
}) => {
  const nestId = parentKey ? `${parentKey}-nested` : `nested-${level}`;

  const indentStyle = autoIndent && level > 1
    ? { paddingLeft: `${(level - 1) * indentSize}px` }
    : {};

  const baseClassName = unstyled ? "collection collection--unstyled" : "collection";
  const finalClassName = [baseClassName, className].filter(Boolean).join(" ");

  return (
    <Wrapper
      className={finalClassName}
      style={indentStyle}
      aria-level={level}
      id={nestId}
      {...props}
    >
        {children ||
          (items &&
            items.map((item, index) => {
              const key = item.key || item.id || `${nestId}-${index}`;
              const content = renderItem
                ? renderItem(item, level)
                : item.name || item.label || String(item);

              return (
                <Item key={key} as={ItemElement}>
                  {content}
                  {item.children && (
                    <NestedCollection
                      items={item.children}
                      as={Wrapper}
                      itemAs={ItemElement}
                      level={level + 1}
                      parentKey={key}
                      renderItem={renderItem}
                      autoIndent={autoIndent}
                      indentSize={indentSize}
                      unstyled={unstyled}
                    />
                  )}
                </Item>
              );
            }))}
    </Wrapper>
  );
};

NestedCollection.displayName = "Collection.Nested";

export default NestedCollection;
