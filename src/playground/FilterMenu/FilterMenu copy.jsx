import React, { useState } from "react";
import { PopupOverlay, PLACEMENTS } from "@lib/Overlay";
import Button from "@common/Button";
import { MenuList, useMenu } from "@lib/Menu";
import FilterTrigger from "./FilterTrigger";

const categories = [
  { id: "hearing", name: "Hearing Assistance" },
  { id: "vision", name: "Visual Assistance" },
  { id: "mobility", name: "Mobility Aids" },
  { id: "sensory", name: "Sensory Tools" },
];

// Price ranges for filtering
const priceRanges = [
  { id: "under1000", name: "Under ₹1,000" },
  { id: "1000-5000", name: "₹1,000 - ₹5,000" },
  { id: "above5000", name: "Above ₹5,000" },
];

const MenuWithOverlay = () => {
  const [selectedKeys, setSelectedKeys] = useState([]);

  const menuState = useMenu({
    overlayConfig: { placement: PLACEMENTS.BOTTOM_START },
    style: { width: "200px" },
    overlayId: "menu-overlay",
    triggerId: "menu-overlay-trigger",
  });

  const handleMenuChange = (event, { selectedKeys: newSelectedKeys }) => {
    console.log("Menu selection changed:", newSelectedKeys);
    setSelectedKeys(Array.from(newSelectedKeys));
    // menuState.close();
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

      <FilterTrigger trigger={menuState.trigger} onClick={menuState.toggle} />

      <PopupOverlay
        trigger={menuState.trigger}
        body={menuState.body}
        close={menuState.close}
        placement={PLACEMENTS.BOTTOM_START}
        trapFocus={false}
        style={menuState.style}
        className={menuState.className}
      >
        <MenuList
          id={menuState.body.id}
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          onChange={handleMenuChange}
          ariaLabel="Product filters menu"
          close={menuState.close}
        >
          <MenuList.Section title="📦 Categories">
            {categories.map((category) => (
              <MenuList.Option key={category.id} value={category.id}>
                {category.name}
              </MenuList.Option>
            ))}
          </MenuList.Section>

          <MenuList.Section title="💰 Price Ranges">
            {priceRanges.map((price) => (
              <MenuList.Option key={price.id} value={price.id}>
                {price.name}
              </MenuList.Option>
            ))}
          </MenuList.Section>
        </MenuList>
      </PopupOverlay>

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
