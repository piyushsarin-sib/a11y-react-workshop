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
import "./CollectionLegacy.css";
import { createCollectionAria } from "./createCollectionAria";
import CollectionContext, { useCollectionContext } from "./CollectionContext.js";
import Item from "./Item.jsx";
import Title from "./Title.jsx";
import NestedCollection from "./Nested.jsx";
import Section from "./Section.jsx";

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
  // Grid-specific props
  rowCount,
  colCount = 1,
  gridItemRole = "rowheader",
  getTitleId,
  getDescriptionId,
  enableArrowNavigation = false, // Enable arrow key navigation with natural tab order
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
  const isGridPattern = resolvedPattern === 'grid';

  // For row→rowheader pattern, each card is its own row
  // So rowCount equals the number of items
  const calculatedRowCount = items?.length;

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
    rowCount: rowCount || calculatedRowCount,
    colCount,
  });

  const baseClassName = unstyled ? "collection collection--unstyled" : "collection";
  const finalClassName = [baseClassName, className].filter(Boolean).join(" ");

  // Auto-indent nested collections (ARIA helper handles semantic meaning)
  const autoIndentStyle = isNested && autoIndent
    ? { paddingLeft: `${indentSize}px` }
    : {};

  // Refs for arrow key navigation
  const itemRefs = React.useRef({});

  // Arrow key navigation handler
  const createArrowKeyHandler = React.useCallback((key, index) => {
    if (!enableArrowNavigation || !isGridPattern) return undefined;

    return (e) => {
      let targetIndex = index;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          targetIndex = index + 1;
          if (targetIndex >= items.length) targetIndex = index;
          break;
        case 'ArrowLeft':
          e.preventDefault();
          targetIndex = index - 1;
          if (targetIndex < 0) targetIndex = 0;
          break;
        case 'ArrowDown':
          e.preventDefault();
          targetIndex = index + colCount;
          if (targetIndex >= items.length) targetIndex = index;
          break;
        case 'ArrowUp':
          e.preventDefault();
          targetIndex = index - colCount;
          if (targetIndex < 0) targetIndex = index;
          break;
        default:
          return;
      }

      // Focus the target item
      const targetItem = items[targetIndex];
      const targetKey = targetItem?.key || targetItem?.id || targetIndex;
      const targetElement = itemRefs.current[targetKey];
      
      if (targetElement) {
        // Focus the interactive element (button/link) or the element itself
        const focusableChild = targetElement.querySelector('button, a, [tabindex="0"]');
        if (focusableChild) {
          focusableChild.focus();
        } else {
          targetElement.focus();
        }
      }
    };
  }, [enableArrowNavigation, isGridPattern, items, colCount]);

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
              
              // Each card gets its own row (row→rowheader pattern)
              const rowIndex = index + 1;

              // Grid pattern: wrap in row with rowheader or gridcell
              if (isGridPattern) {
                const titleId = getTitleId?.(key, item);
                const descId = getDescriptionId?.(key, item);
                
                const itemAriaProps = {
                  role: gridItemRole,
                  'aria-colindex': 1,
                  ...(titleId && { 'aria-labelledby': titleId }),
                  ...(descId && { 'aria-describedby': descId }),
                };

                // Add ref for arrow navigation
                const itemRef = (el) => {
                  if (el) itemRefs.current[key] = el;
                };

                // Add arrow key handler if enabled
                const arrowKeyHandler = createArrowKeyHandler(key, index);

                // Render with nested structure if ItemInnerElement specified
                if (ItemInnerElement) {
                  return (
                    <div key={key} role="row" aria-rowindex={rowIndex}>
                      <ItemElement ref={itemRef} {...itemAriaProps} onKeyDown={arrowKeyHandler}>
                        <ItemInnerElement {...behaviorProps} {...itemInnerProps}>
                          {content}
                        </ItemInnerElement>
                      </ItemElement>
                    </div>
                  );
                }

                // Simple structure
                return (
                  <div key={key} role="row" aria-rowindex={rowIndex}>
                    <ItemElement 
                      ref={itemRef} 
                      {...itemAriaProps}
                      {...behaviorProps}
                      onKeyDown={arrowKeyHandler}
                      className={behaviorProps.className}
                    >
                      {content}
                    </ItemElement>
                  </div>
                );
              }

              // Non-grid patterns: original logic
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
