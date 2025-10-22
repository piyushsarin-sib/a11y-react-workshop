import Collection from "@lib/Collections/Collection";
import { useRovingIndex } from "@lib/interactions/keyboard/hooks/useRovingTabIndex";

const HorizontalNavigationExample = () => {
  // Sample data for horizontal navigation
  const listItems = [
    { id: 1, label: "📧 Email", description: "Check your email messages" },
    { id: 2, label: "📅 Calendar", description: "View your schedule" },
    { id: 3, label: "📋 Tasks", description: "Manage your todo list" },
    { id: 4, label: "📊 Reports", description: "View analytics and reports" },
  ];

  // Horizontal navigation
  const horizontalNav = useRovingIndex({
    items: listItems,
    orientation: "horizontal",
    defaultActiveKey: listItems[0].id,
  });

  return (
    <div style={{ padding: "20px", maxWidth: "800px" }}>
      <h3>➡️ Horizontal Navigation</h3>
      <p>Use ←→ to navigate, ↑↓ keys are ignored</p>

      <Collection
        as="ul"
        itemAs="li"
        style={{
          display: "flex",
          gap: "10px",
          listStyle: "none",
          padding: "20px",
          border: "2px solid #28a745",
          borderRadius: "8px",
          backgroundColor: "#f8fff9",
        }}
        {...horizontalNav.getCollectionProps()}
      >
        {listItems.map((item) => (
          <Collection.Item
            key={item.id}
            {...horizontalNav.getItemProps(item.id)}
            style={{
              padding: "16px",
              borderRadius: "8px",
              backgroundColor: horizontalNav.isActive(item.id) ? "#c8e6c9" : "white",
              border: horizontalNav.isActive(item.id) ? "2px solid #4caf50" : "1px solid #ddd",
              cursor: "pointer",
              textAlign: "center",
              minWidth: "120px",
              outline: "none",
            }}
          >
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>
              {item.label.split(" ")[0]}
            </div>
            <div style={{ fontSize: "12px", fontWeight: "bold" }}>
              {item.label.split(" ").slice(1).join(" ")}
            </div>
          </Collection.Item>
        ))}
      </Collection>

      <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
        Active: {horizontalNav.activeKey} (Index: {horizontalNav.activeIndex})
      </div>
    </div>
  );
};

export default HorizontalNavigationExample;