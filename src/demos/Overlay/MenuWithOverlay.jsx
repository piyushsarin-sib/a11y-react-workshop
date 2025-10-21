import React, { useState } from "react";
import { PLACEMENTS } from "@lib/Overlay";
import Button from "@common/Button";
import Menu, { useMenu } from "@lib/Menu";

const MenuWithOverlay = () => {
  const [selectedKeys, setSelectedKeys] = useState([]);

  const menuState = useMenu({
    overlayConfig: { placement: PLACEMENTS.BOTTOM_START },
    style: { width: "200px" },
    overlayId: "menu-overlay",
    triggerId: "menu-overlay-trigger"
  });

  const handleMenuChange = (event, { selectedKeys: newSelectedKeys }) => {
    console.log("Menu selection changed:", newSelectedKeys);
    setSelectedKeys(Array.from(newSelectedKeys));
    menuState.close();
  };

  return (
    <div style={{ padding: "50px" }}>
      <h3 style={{ marginBottom: "20px" }}>Menu with Overlay (Default)</h3>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        Click the button to open a menu. Use ESC to close, or click outside.
      </p>

      <Button
        variant="secondary"
        onClick={() => console.log("Previous button clicked")}
        style={{ marginRight: "12px" }}
      >
        Previous Button
      </Button>

      <Button
        variant="primary"
        {...menuState.trigger}
        onClick={menuState.toggle}
      >
        Open Menu ▼
      </Button>

      <Menu
        {...menuState}
        selectedKeys={selectedKeys}
        onChange={handleMenuChange}
        ariaLabel="File operations menu"
      >
        <Menu.Section title="File Operations">
          <Menu.Option value="new">📄 New File</Menu.Option>
          <Menu.Option value="open">📁 Open File</Menu.Option>
          <Menu.Option value="recent">📋 Recent Files</Menu.Option>
        </Menu.Section>

        <Menu.Section title="Actions">
          <Menu.Option value="save">💾 Save</Menu.Option>
          <Menu.Option value="export">📤 Export</Menu.Option>
        </Menu.Section>
      </Menu>

      <Button
        variant="secondary"
        onClick={() => console.log("Second button clicked")}
        style={{ marginLeft: "12px" }}
      >
        Next Button
      </Button>
    </div>
  );
};

export default MenuWithOverlay;
