/**
 * Collection Component - Usage Examples and Patterns
 *
 * This file contains reference examples for using the Collection component.
 * These are not meant to be imported or executed, just for documentation.
 */

/* eslint-disable */

import Collection from './Collection';
import { useRovingIndex } from '@lib/interactions/keyboard/hooks/useRovingTabIndex';
import { useSelection } from '@lib/interactions/selection/useSelection';

/*
===========================================
USAGE EXAMPLES
===========================================

1. STATIC CHILDREN - Manual Prop Spreading (Most Common for Behavior Hooks)
---------------------------------------------------------------------------
This is the pattern used in ProductsGrid where users manually spread behavior props
onto each Collection.Item. This gives maximum control and composability.
*/

// With useRovingIndex (ProductsGrid pattern):
const Example1_RovingIndex = () => {
  const gridNav = useRovingIndex({
    items: products,
    orientation: "both",
    columnsCount: 2
  });

  return (
    <Collection
      as="ul"
      className="grid grid-cols-2 gap-4"
      {...gridNav.getCollectionProps()}
    >
      {products.map(product => (
        <Collection.Item
          key={product.id}
          className="border rounded-lg p-3"
          {...gridNav.getItemProps(product.id)}  // User spreads behavior props
        >
          <img src={product.image} alt={product.alt} />
          <h3>{product.name}</h3>
          <button>Add to Cart</button>
        </Collection.Item>
      ))}
    </Collection>
  );
};

// With useSelection:
const Example2_Selection = () => {
  const selection = useSelection({ selectionMode: "multiple" });

  return (
    <Collection
      as="ul"
      role="listbox"
      {...selection.getCollectionAriaProps()}
    >
      {items.map(item => (
        <Collection.Item
          key={item.id}
          {...selection.getItemSelectionProps(item.id, item)}
        >
          {item.name}
        </Collection.Item>
      ))}
    </Collection>
  );
};

// Composing multiple behaviors (roving index + selection):
const Example3_ComposedBehaviors = () => {
  const gridNav = useRovingIndex({ items, orientation: "vertical" });
  const selection = useSelection({ selectionMode: "single" });

  return (
    <Collection
      as="ul"
      role="listbox"
      {...gridNav.getCollectionProps()}
      {...selection.getCollectionAriaProps()}
    >
      {items.map(item => (
        <Collection.Item
          key={item.id}
          {...gridNav.getItemProps(item.id)}
          {...selection.getItemSelectionProps(item.id, item)}
        >
          {item.name}
        </Collection.Item>
      ))}
    </Collection>
  );
};

/*
2. DYNAMIC WITH ITEMS ARRAY
----------------------------
Collection controls rendering when you pass an items array.
Good for simple lists where you don't need custom JSX per item.
*/

const Example4_DynamicSimple = () => {
  return (
    <Collection
      as="ul"
      items={products}
      getItemProps={(key) => ({ tabIndex: 0 })} // Optional behavior props
    >
      {/* Uses default rendering: item.name || item.label */}
    </Collection>
  );
};

/*
3. DYNAMIC WITH RENDER PROPS
-----------------------------
Pass a function as children to customize how each item renders.
Collection applies behavior props automatically via getItemProps.
*/

const Example5_DynamicRenderProp = () => {
  return (
    <Collection
      as="ul"
      items={products}
      getItemProps={(key, item) => ({
        tabIndex: 0,
        onClick: () => console.log(item)
      })}
    >
      {(product) => (
        <div>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
        </div>
      )}
    </Collection>
  );
};

/*
4. NESTED STRUCTURE (li > button pattern)
------------------------------------------
Use itemInnerAs to create nested HTML structure like <li><button>.
Useful for menus where outer element is for layout, inner element is interactive.
*/

const Example6_NestedStructure = () => {
  return (
    <Collection
      as="ul"
      role="menu"
      items={menuItems}
      itemAs="li"
      itemInnerAs="button"
      itemInnerProps={{ role: "menuitem", className: "w-full text-left" }}
      getItemProps={(key) => ({
        onClick: () => handleAction(key),
        tabIndex: 0
      })}
    >
      {(item) => item.label}
    </Collection>
  );
};

/*
5. NESTED COLLECTIONS (Manual)
-------------------------------
Collections can be nested inside Collection.Item for hierarchical structures
like trees or nested menus.
*/

const Example7_ManuallyNested = () => {
  return (
    <Collection as="ul" role="tree">
      <Collection.Item role="treeitem" aria-expanded="true">
        Parent 1
        <Collection as="ul">
          <Collection.Item role="treeitem">Child 1.1</Collection.Item>
          <Collection.Item role="treeitem">Child 1.2</Collection.Item>
        </Collection>
      </Collection.Item>
      <Collection.Item role="treeitem" aria-expanded="false">
        Parent 2
      </Collection.Item>
    </Collection>
  );
};

/*
6. NESTED COLLECTIONS (Auto-indent with NestedCollection)
----------------------------------------------------------
Collection.Nested helper automatically handles indentation for tree structures.
*/

const Example8_NestedWithAutoIndent = () => {
  const treeData = [
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
        { id: 'img1', name: 'photo1.jpg' }
      ]
    }
  ];

  return (
    <Collection.Nested
      as="ul"
      role="tree"
      autoIndent={true}
      indentSize={20}
      items={treeData}
      renderItem={(item, level) => (
        <span role="treeitem" aria-level={level}>
          {item.name}
        </span>
      )}
    />
  );
};

/*
7. CUSTOM ARIA PATTERNS
------------------------
Use pattern prop for pre-configured ARIA roles and attributes.
*/

const Example9_AriaPatterns = () => {
  return (
    <>
      {/* Listbox pattern */}
      <Collection pattern="listbox" ariaLabel="Options">
        <Collection.Item>Option 1</Collection.Item>
        <Collection.Item>Option 2</Collection.Item>
      </Collection>

      {/* Menu pattern */}
      <Collection pattern="menu" ariaLabel="Actions">
        <Collection.Item>New File</Collection.Item>
        <Collection.Item>Save</Collection.Item>
      </Collection>

      {/* Grid pattern */}
      <Collection pattern="grid" ariaLabel="Product Grid">
        <Collection.Item>Product 1</Collection.Item>
        <Collection.Item>Product 2</Collection.Item>
      </Collection>
    </>
  );
};

/*
8. SIMPLE LISTS WITHOUT BEHAVIOR
---------------------------------
Collection works perfectly fine without any behavior hooks.
Just a semantic, accessible list container.
*/

const Example10_SimpleLists = () => {
  return (
    <Collection as="ul">
      <Collection.Item>Simple item 1</Collection.Item>
      <Collection.Item>Simple item 2</Collection.Item>
      <Collection.Item>Simple item 3</Collection.Item>
    </Collection>
  );
};

/*
9. CUSTOM ELEMENTS
-------------------
Use 'as' prop to render any HTML element.
*/

const Example11_CustomElements = () => {
  return (
    <Collection as="div" className="flex gap-4">
      <Collection.Item as="article" className="card">
        Article 1
      </Collection.Item>
      <Collection.Item as="article" className="card">
        Article 2
      </Collection.Item>
    </Collection>
  );
};

/*
10. WITH TITLE
--------------
Add a title to your collection for semantic grouping.
*/

const Example12_WithTitle = () => {
  return (
    <Collection as="ul" title="Featured Products">
      <Collection.Item>Product 1</Collection.Item>
      <Collection.Item>Product 2</Collection.Item>
    </Collection>
  );
};

export default {
  Example1_RovingIndex,
  Example2_Selection,
  Example3_ComposedBehaviors,
  Example4_DynamicSimple,
  Example5_DynamicRenderProp,
  Example6_NestedStructure,
  Example7_ManuallyNested,
  Example8_NestedWithAutoIndent,
  Example9_AriaPatterns,
  Example10_SimpleLists,
  Example11_CustomElements,
  Example12_WithTitle,
};
