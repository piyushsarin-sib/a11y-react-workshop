# Collections

Flexible, accessible collection components for rendering lists, grids, menus, and other grouped content.

## Files

### Core Implementation
- **[Collection.jsx](./Collection.jsx)** (254 lines)
  - Main component implementation
  - Supports static children and dynamic rendering
  - Minimal, performant, composable

### Documentation
- **[Collection.usage.md](./Collection.usage.md)**
  - Quick usage guide and API reference
  - Key props and patterns
  - Start here for quick reference

- **[Collection.examples.jsx](./Collection.examples.jsx)** (364 lines)
  - 12 complete working examples
  - Covers all usage patterns
  - Copy-paste ready code snippets

### Utilities
- **[utils/createCollectionAria.js](./utils/createCollectionAria.js)**
  - ARIA attribute factory function
  - Handles roles, patterns, selection, and accessibility
  - Pre-configured patterns: listbox, menu, grid, tree, etc.

### Styles
- **[Collection.css](./Collection.css)**
  - Base styles for collections
  - Unstyled variant support

## Quick Start

### 1. Static Children (Most Common)
```jsx
import Collection from '@lib/Collections/Collection';
import { useRovingIndex } from '@lib/interactions/keyboard/hooks/useRovingIndex';

const gridNav = useRovingIndex({ items, orientation: "both" });

<Collection as="ul" {...gridNav.getCollectionProps()}>
  {items.map(item => (
    <Collection.Item key={item.id} {...gridNav.getItemProps(item.id)}>
      {item.name}
    </Collection.Item>
  ))}
</Collection>
```

### 2. Dynamic with Items Array
```jsx
<Collection items={data} getItemProps={(key) => ({ tabIndex: 0 })} />
```

### 3. Dynamic with Render Props
```jsx
<Collection items={data}>
  {(item) => <div>{item.name}</div>}
</Collection>
```

## Key Features

✅ **Simple & Performant** - 254 lines, no complex prop extraction
✅ **Composable** - Works with any behavior hook (useRovingIndex, useSelection, etc.)
✅ **Flexible Rendering** - Static children, dynamic items, render props
✅ **Accessible** - Built-in ARIA support with createCollectionAria
✅ **Nested Structures** - Support for li > button patterns and hierarchical collections
✅ **Zero Re-render Issues** - No context overhead, props flow naturally

## Architecture

**Design Philosophy**: Collection is a **lightweight wrapper** that:
- Renders children as-is for static mode (user controls props)
- Applies behavior props automatically for dynamic mode
- Uses forwardRef for proper ref handling
- No prop extraction, filtering, or modification in static mode

**Pattern**: Inspired by React Aria's minimal approach but simplified:
- No hidden tree rendering
- No complex collection state
- No context-based prop passing
- Just clean, direct rendering

## See Also

- [Collection.usage.md](./Collection.usage.md) - Usage guide
- [Collection.examples.jsx](./Collection.examples.jsx) - Code examples
- [useRovingIndex](../interactions/keyboard/hooks/useRovingIndex.js) - Keyboard navigation
- [useSelection](../interactions/selection/useSelection.js) - Selection management
