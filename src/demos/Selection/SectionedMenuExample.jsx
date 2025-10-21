import { useState } from "react";
import { MenuList } from "@lib/Menu";

const SectionedMenuExample = () => {
  const [selectedKeys, setSelectedKeys] = useState([]);

  const handleChange = (_event, { selectedKeys }) => {
    setSelectedKeys(selectedKeys);
  };

  return (
    <div>
      <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}>
        📂 Sectioned Menu with Disabled Items
      </h4>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
        Menu with sections and disabled items - perfect for organized navigation
      </p>

      <MenuList
        selectedKeys={selectedKeys}
        onChange={handleChange}
        ariaLabel="File operations with component API"
      >
        <MenuList.Section title="📁 File Operations">
          <MenuList.Option value="new">📄 New File</MenuList.Option>
          <MenuList.Option value="open">📁 Open File</MenuList.Option>
          <MenuList.Option value="save">💾 Save</MenuList.Option>
        </MenuList.Section>

        <MenuList.Section title="📤 Export & Print">
          <MenuList.Option value="export">📤 Export</MenuList.Option>
          <MenuList.Option value="print">🖨️ Print</MenuList.Option>
          <MenuList.Option value="pdf" disabled>
            📋 Export PDF (Pro)
          </MenuList.Option>
        </MenuList.Section>
      </MenuList>

      <div style={{ marginTop: "12px", fontSize: "14px", color: "#666" }}>
        <strong>Selected:</strong> {selectedKeys[0] || "None"}
      </div>
    </div>
  );
};

export default SectionedMenuExample;
