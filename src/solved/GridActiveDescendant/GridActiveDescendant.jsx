import { useRef, useState } from "react";
import Collection from "@lib/Collections/Collection";
import { useActiveDescendant } from "@lib/interactions/keyboard/hooks/useActiveDescendant";

const initialItems = [
  { id: 1, value: "Item 1" },
  { id: 2, value: "Item 2" },
  { id: 3, value: "Item 3" },
  { id: 4, value: "Item 4" },
  { id: 5, value: "Item 5" },
  { id: 6, value: "Item 6" },
];

const GridActiveDescendant = () => {
  const gridRef = useRef(null);
  const [items, setItems] = useState(initialItems);

  const gridNav = useActiveDescendant({
    items: items,
    orientation: "both",
    columnsCount: 2,
    defaultActiveKey: null,
    listboxId: "editable-grid-active-descendant",
    enableEditMode: true, // Enable Enter/Escape edit mode pattern
    containerRef: gridRef,
  });

  const handleInputChange = (id, newValue) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, value: newValue } : item)));
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <Collection
      as="ul"
      itemAs="li"
      pattern="grid"
      ariaLabel="Editable items grid"
      className="grid grid-cols-2  gap-4 p-6"
      {...gridNav.getCollectionProps()}
      ref={gridRef}
      onKeyDown={gridNav.handleKeyDown}
    >
      {items.map((item) => (
        <Collection.Item
          key={item.id}
          className="border rounded-lg p-6 shadow-sm min-h-[150px] data-[active-descendant=true]:ring-2 data-[active-descendant=true]:ring-blue-500"
          {...gridNav.getItemProps(item.id)}
        >
          <label htmlFor={`input-${item.id}`} className="block text-base font-medium mb-3">
            Item {item.id}
          </label>
          <input
            id={`input-${item.id}`}
            type="text"
            value={item.value}
            onChange={(e) => handleInputChange(item.id, e.target.value)}
            className="w-full px-4 py-3 text-base border rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Edit Item ${item.id}`}
          />
        </Collection.Item>
      ))}
    </Collection>
  );
};

export default GridActiveDescendant;
