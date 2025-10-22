# Collection Component - Usage Guide

For detailed code examples, see: [Collection.examples.jsx](./Collection.examples.jsx)

## Quick Reference

### 1. Static Children with Manual Prop Spreading

Most common pattern for behavior hooks like `useRovingIndex` or `useSelection`:

```jsx
<Collection {...behaviorHook.getCollectionProps()}>
  {items.map(item => (
    <Collection.Item {...behaviorHook.getItemProps(item.id)}>
      {content}
    </Collection.Item>
  ))}
</Collection>
```

**Example:**
```jsx
const gridNav = useRovingIndex({ items: products, orientation: "both" });

<Collection as="ul" {...gridNav.getCollectionProps()}>
  {products.map(product => (
    <Collection.Item key={product.id} {...gridNav.getItemProps(product.id)}>
      <h3>{product.name}</h3>
    </Collection.Item>
  ))}
</Collection>
```

### 2. Dynamic with Items Array

Collection controls rendering when you pass an `items` array:

```jsx
<Collection items={data} getItemProps={(key) => props} />
```

Uses default rendering: `item.name || item.label || String(item)`

### 3. Dynamic with Render Props

Pass a function as children to customize rendering:

```jsx
<Collection items={data}>
  {(item) => <div>{item.name}</div>}
</Collection>
```

### 4. Nested Structure (li > button pattern)

Create nested HTML structures like `<li><button>`:

```jsx
<Collection
  itemAs="li"
  itemInnerAs="button"
  itemInnerProps={{ role: "menuitem" }}
/>
```

### 5. Nested Collections

Collections can be nested for hierarchical structures:

```jsx
<Collection>
  <Collection.Item>
    Parent
    <Collection>{children}</Collection>
  </Collection.Item>
</Collection>
```

## Key Props

- **`as`** - HTML element type for container (default: `"ul"`)
- **`items`** - Array of items for dynamic rendering
- **`children`** - Static children or render function
- **`getItemProps`** - Function returning behavior props for each item
- **`itemAs`** - HTML element type for items (default: `"li"`)
- **`itemInnerAs`** - Optional inner element for nested structure
- **`itemInnerProps`** - Props for inner element
- **`role`** - ARIA role for container
- **`pattern`** - Pre-configured ARIA pattern (listbox, menu, grid, etc.)
- **`ariaLabel`** - Accessible label for container
- **`orientation`** - Navigation orientation (vertical, horizontal, both)

## See Also

- [Collection.examples.jsx](./Collection.examples.jsx) - Complete working examples
- [Collection.jsx](./Collection.jsx) - Component implementation
- [createCollectionAria.js](./utils/createCollectionAria.js) - ARIA utilities
