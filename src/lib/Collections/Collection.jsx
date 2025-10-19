import React from "react";
import "./Collection.css";
import { createCollectionAria } from "./utils/createCollectionAria";

const Item = ({
  children,
  // eslint-disable-next-line no-unused-vars
  as: ElementType = "li",
  innerAs: InnerElement,
  innerProps = {},
  ...props
}) => {
  if (InnerElement) {
    return (
      <ElementType {...props} role="presentation">
        <InnerElement {...innerProps}>{children}</InnerElement>
      </ElementType>
    );
  }

  return <ElementType {...props}>{children}</ElementType>;
};

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
  title,
  ...props
}) => {
  const nestId = parentKey ? `${parentKey}-nested` : `nested-${level}`;

  // Generate indentation using inline styles
  const getIndentStyle = () => {
    if (!autoIndent || level <= 1) return {};

    const indentValue = (level - 1) * indentSize;
    return {
      paddingLeft: `${indentValue}px`,
    };
  };

  const indentStyle = getIndentStyle();

  const baseClassName = unstyled ? "collection collection--unstyled" : "collection";
  const finalClassName = [baseClassName, className].filter(Boolean).join(" ");

  return (
    <>
      {title && (
        <div
          className="collection-title"
          aria-hidden="true"
          style={{
            fontWeight: "bold",
            marginBottom: "0.5rem",
            fontSize: "0.9em",
            color: "#666",
            ...indentStyle,
          }}
        >
          {title}
        </div>
      )}
      <Wrapper
        className={finalClassName}
        style={indentStyle}
        aria-level={level}
        id={nestId}
        aria-label={title}
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
    </>
  );
};

const Collection = React.forwardRef(
  (
    {
      children,
      items,
      as: Wrapper = "ul", // eslint-disable-line no-unused-vars
      className = "",
      itemAs: ItemWrapper = "div",
      itemClassName = "",
      itemInnerAs: ItemInnerWrapper,
      itemInnerClassName = "",
      itemInnerProps = {},
      autoIndent = true,
      indentSize = 24,
      level = 1,
      unstyled = true,
      // ARIA props (built-in for accessibility)
      role,
      pattern,
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
      orientation = "vertical",
      title,
      // Internal prop for role inheritance
      parentRole,
      // Internal prop for tracking nesting depth for aria-level calculation
      _nestingDepth = 0,
      // Internal prop to distinguish between organizational sections and nested content
      _isNestedInItem = false,
      // Selection handlers function from parent (like Menu)
      getItemHandlers,
      // Selected keys for styling and ARIA
      selectedKeys,
      ...props
    },
    ref,
  ) => {
    // Use provided level and nesting props directly
    const actualLevel = level || 1;
    const actualIsNestedInItem = _isNestedInItem || false;

    // Initialize ARIA factory function
    const aria = createCollectionAria({
      role: role,
      pattern: pattern,
      parentRole,
      selectionMode: "none", // Collection handles layout, not selection
      selectedKeys: new Set(),
      orientation: orientation,
      label: ariaLabel,
      labelledBy: ariaLabelledBy,
      describedBy: ariaDescribedBy,
    });

    const effectiveRole = aria.effectiveRole;

    // Generate indentation for manually nested Collections
    // Only apply indentation to truly nested content, not organizational sections
    const getIndentStyle = () => {
      if (!autoIndent || !actualIsNestedInItem || actualLevel <= 1) return {};

      const indentValue = (actualLevel - 1) * indentSize;
      return {
        paddingLeft: `${indentValue}px`,
      };
    };

    const indentStyle = getIndentStyle();

    const getItemClassName = (customClassName = "") => {
      if (!unstyled) return customClassName;

      const itemBaseClass = "collection-item--unstyled";
      return [itemBaseClass, customClassName].filter(Boolean).join(" ");
    };
    const getItemProps = (itemKey, item, _index, options = {}) => {
      const hasInnerElement = !!ItemInnerWrapper;

      // Get selection handlers if available
      const selectionHandlers = getItemHandlers ? getItemHandlers(itemKey, item) : {};

      // Extract event handlers and other props from item (child.props)
      const {
        onClick,
        onKeyDown,
        tabIndex,
        style,
        ref,
        // Extract and filter out React-specific props that shouldn't go to DOM
        ...otherItemProps
      } = item;

      // Merge selection handlers with item handlers (item handlers take precedence)
      const finalHandlers = {
        ...selectionHandlers,
        onClick: onClick || selectionHandlers.onClick,
        onKeyDown: onKeyDown || selectionHandlers.onKeyDown,
        tabIndex: tabIndex !== undefined ? tabIndex : selectionHandlers.tabIndex,
      };

      // Filter out any non-DOM props that might have been passed through
      const domProps = {};
      const validDOMProps = [
        "id",
        "title",
        "lang",
        "dir",
        "hidden",
        "data-*",
        "aria-*",
        "role",
        "contentEditable",
        "draggable",
        "spellCheck",
        "translate",
      ];

      Object.keys(otherItemProps).forEach((prop) => {
        if (
          prop.startsWith("data-") ||
          prop.startsWith("aria-") ||
          validDOMProps.includes(prop) ||
          prop === "role"
        ) {
          domProps[prop] = otherItemProps[prop];
        }
      });

      // Calculate level based on hierarchical depth
      // Level 1 for direct children of root, increment only for true nesting within items
      const computedLevel = _isNestedInItem ? _nestingDepth + 1 : 1;

      // Get basic ARIA props for this item (accessibility built-in)
      // Hook will decide whether to apply aria-level based on role
      const itemAriaProps = aria.getItemAriaProps(itemKey, {
        level: computedLevel,
        elementType: ItemWrapper,
        selected: selectedKeys ? selectedKeys.has(itemKey) : false,
        ...options,
      });

      // Base props for the wrapper element
      const wrapperProps = {
        className: getItemClassName(itemClassName),
        ...finalHandlers,
        style,
        ref,
        ...domProps, // Only valid DOM props
        ...(!hasInnerElement ? itemAriaProps : {}),
      };

      // Props for the inner interactive element (if exists)
      const innerProps = {
        className: itemInnerClassName,
        ...itemInnerProps,
        ...(hasInnerElement ? itemAriaProps : {}),
      };

      // Return appropriate structure based on whether inner element exists
      if (hasInnerElement) {
        return {
          wrapperProps: { ...wrapperProps },
          innerProps: { ...innerProps },
        };
      } else {
        return {
          wrapperProps: { ...wrapperProps },
          innerProps: {},
        };
      }
    };

    const renderDynamicCollection = () => {
      if (!items || !Array.isArray(items)) return null;

      return items.map((item, index) => {
        const key = item.key || item.id || index;
        const { wrapperProps, innerProps } = getItemProps(key, item, index);

        if (typeof children === "function") {
          const itemElement = children(item);

          if (ItemInnerWrapper) {
            return (
              <ItemWrapper key={key} {...wrapperProps}>
                <ItemInnerWrapper {...innerProps}>{itemElement}</ItemInnerWrapper>
              </ItemWrapper>
            );
          }

          return (
            <ItemWrapper key={key} {...wrapperProps}>
              {itemElement}
            </ItemWrapper>
          );
        }

        if (ItemInnerWrapper) {
          return (
            <ItemWrapper key={key} {...wrapperProps}>
              <ItemInnerWrapper {...innerProps}>
                {item.name || item.label || String(item)}
              </ItemInnerWrapper>
            </ItemWrapper>
          );
        }

        return (
          <ItemWrapper key={key} {...wrapperProps}>
            {item.name || item.label || String(item)}
          </ItemWrapper>
        );
      });
    };

    const renderStaticCollection = () => {
      return React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        if (child.type === Item) {
          const key = child.key || child.props.key || index;
          const { wrapperProps, innerProps } = getItemProps(key, child.props, index);

          // Process direct Collection children only (no deep wrapper nesting)
          const processNestedChildren = (children, currentLevel) => {
            return React.Children.map(children, (child) => {
              if (!React.isValidElement(child)) return child;

              if (child.type === Collection) {
                const nextLevel = currentLevel + 1;

                return (
                  <Collection
                    key={child.key}
                    ref={child.ref}
                    {...child.props}
                    parentRole={effectiveRole} // Pass effective role as parent context
                    autoIndent={
                      child.props.autoIndent !== undefined ? child.props.autoIndent : autoIndent
                    }
                    indentSize={
                      child.props.indentSize !== undefined ? child.props.indentSize : indentSize
                    }
                    level={nextLevel}
                    _nestingDepth={_nestingDepth + 1} // Increment nesting depth for Collections within items
                    _isNestedInItem={true} // Collections within items are truly nested
                    unstyled={child.props.unstyled !== undefined ? child.props.unstyled : unstyled}
                  />
                );
              }

              // Return other elements as-is (no deep processing to prevent invalid HTML)
              return child;
            });
          };

          const processedChildren = processNestedChildren(child.props.children, level);

          // Merge class names - Collection className + child className
          const mergedWrapperClassName = `${wrapperProps.className} ${
            child.props.className || ""
          }`.trim();
          const mergedInnerClassName = `${innerProps.className} ${
            child.props.innerClassName || ""
          }`.trim();

          // Create new Item element instead of cloning
          const finalElement = (
            <ItemWrapper
              key={key}
              {...wrapperProps}
              className={mergedWrapperClassName}
              style={{ ...wrapperProps.style, ...child.props.style }}
            >
              {ItemInnerWrapper ? (
                <ItemInnerWrapper {...innerProps} className={mergedInnerClassName}>
                  {processedChildren}
                </ItemInnerWrapper>
              ) : (
                processedChildren
              )}
            </ItemWrapper>
          );
          return finalElement;
        }

        if (child.type === NestedCollection) {
          // Create new NestedCollection element instead of cloning
          return (
            <NestedCollection
              key={child.key || index}
              ref={child.ref}
              {...child.props}
              parentRole={effectiveRole} // Pass effective role as parent context
              autoIndent={autoIndent}
              indentSize={indentSize}
              unstyled={unstyled}
            />
          );
        }

        if (child.type === Collection) {
          // Create new Collection element instead of cloning
          return (
            <Collection
              key={child.key || index}
              ref={child.ref}
              {...child.props}
              parentRole={effectiveRole} // Pass effective role as parent context
              autoIndent={autoIndent}
              indentSize={indentSize}
              level={level + 1}
              _nestingDepth={_nestingDepth} // Don't increment for direct children (organizational sections)
              _isNestedInItem={false} // Direct children are organizational, not nested content
              unstyled={unstyled}
            />
          );
        }

        return child;
      });
    };

    const baseClassName = unstyled ? "collection collection--unstyled" : "collection";
    const finalClassName = [baseClassName, className].filter(Boolean).join(" ");

    return (
      <>
        {title && (
          <div
            className="collection-title"
            aria-hidden="true"
            style={{
              fontWeight: "bold",
              marginBottom: "0.5rem",
              fontSize: actualLevel > 1 ? "0.9em" : "1em",
              color: "#666",
              // Only apply indent style to truly nested content, not organizational sections
              ...(actualIsNestedInItem ? indentStyle : {}),
            }}
          >
            {title}
          </div>
        )}
        <Wrapper
          ref={ref}
          className={finalClassName}
          style={actualIsNestedInItem ? indentStyle : {}}
          aria-label={title}
          {...aria.getCollectionAriaProps()}
          {...props}
        >
          {items ? renderDynamicCollection() : renderStaticCollection()}
        </Wrapper>
      </>
    );
  },
);

// Title component for section labels within collections (non-selectable)
const Title = ({ children, ...props }) => {
  return (
    <li role="presentation" className="collection-title" {...props}>
      <div className="collection-title-text">
        {children}
      </div>
    </li>
  );
};

Collection.Item = Item;
Collection.Title = Title;
Collection.Nested = NestedCollection;

export default Collection;

/* 
Usage Examples:

// Basic Collection
<Collection 
  as="div" 
  itemAs="button"
  className="flex gap-2"
>
  <Collection.Item key="item1">Item 1</Collection.Item>
  <Collection.Item key="item2">Item 2</Collection.Item>
</Collection>

// Tabs with li > div structure
<Collection 
  as="div" 
  role="tablist"
  itemAs="li"
  itemInnerAs="div"
  itemInnerProps={{ role: "tab" }}
  selectedKeys={new Set(['tab1'])}
  onSelectionChange={(keys) => setSelectedKeys(keys)}
>
  <Collection.Item 
    key="tab1" 
    role="presentation"
    innerProps={{ "aria-selected": "true", "aria-controls": "tabpanel-1" }}
  >
    Tab 1
  </Collection.Item>
  <Collection.Item 
    key="tab2" 
    role="presentation"
    innerProps={{ "aria-selected": "false", "aria-controls": "tabpanel-2" }}
  >
    Tab 2
  </Collection.Item>
</Collection>
// This renders:
// <div role="tablist">
//   <li role="presentation">
//     <div role="tab" aria-selected="true" aria-controls="tabpanel-1">Tab 1</div>
//   </li>
// </div>

// Menu with Nested Structure (li > button)
<Collection 
  as="ul" 
  role="menu"
  itemAs="li"
  itemInnerAs="button"
  itemInnerClassName="w-full text-left px-4 py-2"
  itemInnerProps={{ role: "menuitem" }}
  onAction={(key) => handleMenuAction(key)}
>
  <Collection.Item key="new">New File</Collection.Item>
  <Collection.Item key="open">Open</Collection.Item>
  <Collection.Item key="recent1">Document 1</Collection.Item>
</Collection>
// This renders:
// <ul role="menu">
//   <li>
//     <button role="menuitem" class="w-full text-left px-4 py-2">New File</button>
//   </li>
// </ul>

// Tree (you define the tree structure and ARIA)
<Collection 
  as="ul"
  role="tree"
  itemAs="li" 
  itemInnerAs="div"
  itemInnerClassName="flex items-center"
  itemInnerProps={{ role: "treeitem" }}
  items={treeData}
  onAction={(key, item) => toggleNode(key)}
>
  {item => (
    <>
      <span className="mr-2">{item.expanded ? '▼' : '▶'}</span>
      {item.name}
    </>
  )}
</Collection>

// Dynamic Collection with custom ARIA
<Collection 
  as="ul"
  role="listbox"
  itemAs="li"
  itemInnerAs="div"
  itemInnerProps={{ role: "option", "aria-describedby": "help-text" }}
  items={options}
  selectionMode="multiple"
  selectedKeys={selectedKeys}
  onSelectionChange={setSelectedKeys}
>
  {item => item.label}
</Collection>

// Individual Item with custom structure
<Collection.Item 
  as="li" 
  innerAs="button" 
  innerProps={{ role: "menuitem", className: "btn-menu", tabIndex: 0 }}
>
  Custom Menu Item
</Collection.Item>

// NESTED COLLECTIONS EXAMPLES:

// 1. Manual Nested Structure
<Collection as="ul" role="tree" itemAs="li">
  <Collection.Item role="treeitem" aria-expanded="true">
    Parent Item 1
    <Collection as="ul" itemAs="li" className="ml-4">
      <Collection.Item role="treeitem">Child 1.1</Collection.Item>
      <Collection.Item role="treeitem">Child 1.2</Collection.Item>
    </Collection>
  </Collection.Item>
  
  <Collection.Item role="treeitem" aria-expanded="false">
    Parent Item 2
  </Collection.Item>
</Collection>

// 2. Using NestedCollection helper for trees with auto-indent
<Collection.Nested 
  as="ul" 
  itemAs="li"
  role="tree"
  autoIndent={true}
  indentSize={20}
  items={[
    {
      id: 'folder1',
      name: 'Documents',
      children: [
        { id: 'file1', name: 'Resume.pdf' },
        { id: 'file2', name: 'Cover Letter.docx' }
      ]
    },
    {
      id: 'folder2', 
      name: 'Images',
      children: [
        { id: 'img1', name: 'photo1.jpg' },
        { id: 'img2', name: 'photo2.png' }
      ]
    }
  ]}
  renderItem={(item, level) => (
    <span role="treeitem" aria-level={level}>
      {item.name}
    </span>
  )}
/>
// This automatically applies marginLeft: 20px, 40px, 60px etc. to nested levels

// 3. Manual nested structure with auto-indent
<Collection as="ul" role="tree" itemAs="li" autoIndent={true} indentSize={16}>
  <Collection.Item role="treeitem" aria-expanded="true">
    Parent Item 1
    <Collection as="ul" itemAs="li">
      <Collection.Item role="treeitem">Child 1.1 (gets marginLeft: 16px)</Collection.Item>
      <Collection.Item role="treeitem">
        Child 1.2
        <Collection as="ul" itemAs="li">
          <Collection.Item role="treeitem">Grandchild 1.2.1 (gets marginLeft: 32px)</Collection.Item>
        </Collection>
      </Collection.Item>
    </Collection>
  </Collection.Item>
</Collection>

// 4. Custom nested structure with any elements
<Collection.Nested 
  as="section"
  itemAs="article" 
  items={blogPosts}
  renderItem={(post) => (
    <div>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
    </div>
  )}
/>

// 3. Multi-level Menu Structure
<Collection as="ul" role="menubar" itemAs="li" itemInnerAs="button" itemInnerProps={{ role: "menuitem" }}>
  <Collection.Item role="presentation">
    File
    <Collection as="ul" role="menu" itemAs="li" itemInnerAs="button" itemInnerProps={{ role: "menuitem" }}>
      <Collection.Item role="presentation">New</Collection.Item>
      <Collection.Item role="presentation">Open</Collection.Item>
      <Collection.Item role="presentation">
        Recent
        <Collection as="ul" role="menu" itemAs="li" itemInnerAs="button" itemInnerProps={{ role: "menuitem" }}>
          <Collection.Item role="presentation">Document 1</Collection.Item>
          <Collection.Item role="presentation">Document 2</Collection.Item>
        </Collection>
      </Collection.Item>
    </Collection>
  </Collection.Item>
</Collection>

// 4. Accordion with nested content
<Collection as="div" itemAs="div">
  <Collection.Item className="border rounded">
    <button role="button" aria-expanded="true">Section 1</button>
    <Collection as="div" className="p-4">
      <Collection.Item>Content item 1</Collection.Item>
      <Collection.Item>Content item 2</Collection.Item>
    </Collection>
  </Collection.Item>
  
  <Collection.Item className="border rounded">
    <button role="button" aria-expanded="false">Section 2</button>
  </Collection.Item>
</Collection>

// 5. Breadcrumbs with nested structure
<Collection as="nav" role="navigation" aria-label="Breadcrumb">
  <Collection as="ol" itemAs="li">
    <Collection.Item>
      <a href="/">Home</a>
    </Collection.Item>
    <Collection.Item>
      <a href="/products">Products</a>
    </Collection.Item>
    <Collection.Item aria-current="page">
      Current Page
    </Collection.Item>
  </Collection>
</Collection>
*/
