import Collection from "@lib/Collections/Collection";
import { useRovingIndex } from "@lib/interactions/keyboard/hooks/useRovingTabIndex";

const Grid2DNavigationExample = () => {
  // Sample data for 2D grid navigation
  const gridItems = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    label: `Item ${i + 1}`,
    color: `hsl(${(i * 30) % 360}, 70%, 60%)`,
  }));

  // 2D Grid navigation
  const gridNav = useRovingIndex({
    items: gridItems,
    orientation: "both",
    columnsCount: 4,
    defaultActiveKey: gridItems[0].id,
  });

  return (
    <div style={{ padding: "20px", maxWidth: "800px" }}>
      <h3>🔲 2D Grid Navigation</h3>
      <p>Use ←→↑↓ to navigate in all directions, 4 columns layout with auto-detection</p>

      <Collection
        as="div"
        itemAs="div"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
          padding: "20px",
          border: "2px solid #ff9800",
          borderRadius: "8px",
          backgroundColor: "#fffbf0",
        }}
        {...gridNav.getCollectionProps()}
      >
        {gridItems.map((item) => (
          <Collection.Item
            key={item.id}
            {...gridNav.getItemProps(item.id)}
            style={{
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: gridNav.isActive(item.id) ? item.color : "white",
              border: gridNav.isActive(item.id) ? "3px solid #ff5722" : "1px solid #ddd",
              cursor: "pointer",
              textAlign: "center",
              fontWeight: gridNav.isActive(item.id) ? "bold" : "normal",
              color: gridNav.isActive(item.id) ? "white" : "#333",
              outline: "none",
              transition: "all 0.2s ease",
            }}
          >
            {item.label}
          </Collection.Item>
        ))}
      </Collection>

      <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
        Active: {gridNav.activeKey} (Index: {gridNav.activeIndex}, Position: Row {gridNav.getCurrentPosition().row + 1}, Col {gridNav.getCurrentPosition().col + 1})
      </div>
    </div>
  );
};

export default Grid2DNavigationExample;