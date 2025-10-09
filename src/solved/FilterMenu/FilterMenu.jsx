import React, { useState } from "react";
import { PLACEMENTS } from "@solved/lib/Overlay";
import Button from "@common/Button";
import Menu, { useMenu } from "@solved/lib/Menu";

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

  /**
   * TODO: Call useMenu hook and pass configuration object. Assign the return value
   *  menuState
   *
   * Configuration object takes following props:
   *
   * Required props:
   * - overlayConfig: Configuration for overlay positioning
   *   - placement: Where menu appears relative to trigger (use PLACEMENTS constants)
   *     eg: PLACEMENTS.BOTTOM_START - positions menu below trigger, aligned to left
   * - overlayId: Unique ID for the menu element (accessibility)
   *     eg: "menu-overlay"
   * - triggerId: Unique ID for the trigger button (accessibility)
   *     eg: "menu-overlay-trigger"
   *
   * Optional props:
   * - style: Custom styles for the menu
   *     eg: { width: "200px" }
   *
   */

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

      {/*
        TODO: Connect menuState to the trigger button

        Spread menuState.trigger on the button to add accessibility attributes
        eg: {...menuState.trigger}

        Use menuState.toggle function for onClick to open/close the menu
        eg: onClick={menuState.toggle}
      */}
      <button
        type="button"
        style={{ width: "400px" }}
        className="md:w-auto px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 accessible-focus"
      >
        <span className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filters
          <svg
            className="ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>

      {/*
        TODO: Connect menuState to the Menu component

        Spread menuState on the Menu component to pass overlay props and positioning
        eg: {...menuState}
      */}
      <Menu
        onChange={handleMenuChange}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        ariaLabel="Product filters menu"
      >
        <Menu.Title>📦 Categories</Menu.Title>
        {categories.map((category) => (
          <Menu.Option key={category.id} value={category.id}>
            {category.name}
          </Menu.Option>
        ))}

        <Menu.Title>💰 Price Ranges</Menu.Title>
        {priceRanges.map((price) => (
          <Menu.Option key={price.id} value={price.id}>
            {price.name}
          </Menu.Option>
        ))}
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
