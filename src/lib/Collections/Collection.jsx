/**
 * Collection Component
 *
 * A flexible, accessible collection container for rendering lists, grids, menus, and other grouped content.
 * Supports static children with manual prop spreading and dynamic rendering with items arrays.
 *
 * @see Collection.usage.md - Quick usage guide
 * @see Collection.examples.jsx - Complete code examples
 */
import React from "react";
import "./Collection.css";
import { createCollectionAria } from "./utils/createCollectionAria";
import CollectionContext, { useCollectionContext } from "./CollectionContext.js";
import Item from "./components/Item.jsx";
import Title from "./components/Title.jsx";
import NestedCollection from "./components/Nested.jsx";
import Section from "./components/Section.jsx";

/**
 * Simplified Collection component
 * - For static children: Renders as-is (user spreads behavior props manually)
 * - For dynamic mode: Uses items array and applies behavior props automatically
 */
const Collection = React.forwardRef(({
  children,
  items,
  as: Wrapper = "ul", // eslint-disable-line no-unused-vars
  className = "",
  unstyled = true,
  // ARIA props
  role,
  pattern,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  orientation = "vertical",
  // Dynamic rendering props
  itemAs: ItemElement = "li", // eslint-disable-line no-unused-vars
  itemInnerAs: ItemInnerElement,
  itemInnerProps = {},
  getItemProps, // Optional: function to get behavior props for each item
  // Tree-specific props
  indentSize = 24,
  autoIndent = true,
  level: explicitLevel,
  ...props
}, ref) => {
  // Read parent context (if nested)
  const parentContext = useCollectionContext();

  // Determine current level: explicit prop > parent level + 1 > 1
  const currentLevel = explicitLevel ?? (parentContext ? parentContext.level + 1 : 1);
  const isNested = currentLevel > 1;

  // Resolve pattern: explicit prop or inherit from parent
  const resolvedPattern = pattern || parentContext?.pattern;

  // Initialize ARIA factory function for container (handles all ARIA/role logic)
  const aria = createCollectionAria({
    role,
    pattern: resolvedPattern,
    selectionMode: "none",
    selectedKeys: new Set(),
    orientation,
    label: ariaLabel,
    labelledBy: ariaLabelledBy,
    describedBy: ariaDescribedBy,
    isNested,  // Let ARIA helper decide role based on nesting
  });

  const baseClassName = unstyled ? "collection collection--unstyled" : "collection";
  const finalClassName = [baseClassName, className].filter(Boolean).join(" ");

  // Auto-indent nested collections (ARIA helper handles semantic meaning)
  const autoIndentStyle = isNested && autoIndent
    ? { paddingLeft: `${indentSize}px` }
    : {};

  // Provide context to children
  const contextValue = React.useMemo(() => ({
    level: currentLevel,
    pattern: resolvedPattern,
  }), [currentLevel, resolvedPattern]);

  // Dynamic rendering mode: Collection controls rendering
  if (items && Array.isArray(items)) {
    const renderFn = typeof children === 'function'
      ? children
      : (item) => item.name || item.label || String(item);

    return (
      <CollectionContext.Provider value={contextValue}>
        <Wrapper
          ref={ref}
          className={finalClassName}
          style={{ ...autoIndentStyle, ...props.style }}
          {...aria.getCollectionAriaProps()}
          {...props}
        >
            {items.map((item, index) => {
              const key = item.key || item.id || index;
              const content = renderFn(item);
              const behaviorProps = getItemProps?.(key, item) || {};

              // Render with nested structure if ItemInnerElement specified
              // Outer element is structural (role="presentation")
              // Inner element is interactive (gets behavior props)
              if (ItemInnerElement) {
                return (
                  <ItemElement key={key} role="presentation">
                    <ItemInnerElement {...behaviorProps} {...itemInnerProps}>
                      {content}
                    </ItemInnerElement>
                  </ItemElement>
                );
              }

              // Simple structure
              return (
                <ItemElement key={key} {...behaviorProps}>
                  {content}
                </ItemElement>
              );
            })}
        </Wrapper>
      </CollectionContext.Provider>
    );
  }

  // Static rendering mode: Children render themselves with manually spread props
  return (
    <CollectionContext.Provider value={contextValue}>
      <Wrapper
        ref={ref}
        className={finalClassName}
        style={{ ...autoIndentStyle, ...props.style }}
        {...aria.getCollectionAriaProps()}
        {...props}
      >
        {children}
      </Wrapper>
    </CollectionContext.Provider>
  );
});

Collection.displayName = "Collection";

// Attach sub-components to Collection
Collection.Item = Item;
Collection.Title = Title;
Collection.Nested = NestedCollection;
Collection.Section = Section;

export default Collection;
