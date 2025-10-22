import Collection from "@lib/Collections/Collection";
import { useRovingIndex } from "@lib/interactions/keyboard/hooks/useRovingTabIndex";

const VerticalNavigationExample = () => {
  // Sample data for vertical navigation
  const listItems = [
    { id: 1, label: "📧 Email", description: "Check your email messages" },
    { id: 2, label: "📅 Calendar", description: "View your schedule" },
    { id: 3, label: "📋 Tasks", description: "Manage your todo list" },
    { id: 4, label: "📊 Reports", description: "View analytics and reports" },
    { id: 5, label: "⚙️ Settings", description: "Configure your preferences" },
  ];

  // Vertical list navigation
  const verticalNav = useRovingIndex({
    items: listItems,
    orientation: "vertical",
    defaultActiveKey: listItems[0].id,
  });

  return (
    <div style={{ padding: "20px", maxWidth: "800px" }}>
      <h3>📋 Vertical List Navigation</h3>
      <p>Use ↑↓ to navigate, ←→ keys are ignored (allows expand/collapse functionality)</p>

      <Collection
        as="ul"
        itemAs="li"
        className="list-unstyled"
        style={{
          border: "2px solid #007bff",
          borderRadius: "8px",
          padding: "10px",
          backgroundColor: "#f8f9fa",
        }}
        {...verticalNav.getCollectionProps()}
      >
        {listItems.map((item) => (
          <Collection.Item
            key={item.id}
            {...verticalNav.getItemProps(item.id)}
            style={{
              padding: "12px",
              margin: "4px 0",
              borderRadius: "6px",
              backgroundColor: verticalNav.isActive(item.id) ? "#e3f2fd" : "white",
              border: verticalNav.isActive(item.id) ? "2px solid #2196f3" : "1px solid #ddd",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <div>
              <strong>{item.label}</strong>
              <div style={{ fontSize: "14px", color: "#666" }}>{item.description}</div>
            </div>
          </Collection.Item>
        ))}
      </Collection>

      <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
        Active: {verticalNav.activeKey} (Index: {verticalNav.activeIndex})
      </div>
    </div>
  );
};

export default VerticalNavigationExample;