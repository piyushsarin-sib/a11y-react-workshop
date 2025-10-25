import React, { useState } from "react";
import { PopupOverlay, PLACEMENTS, ARIA_HASPOPUP, usePopup } from "@lib/Overlay";
import Button from "@common/Button";
import { MenuList } from "@lib/Menu";
import FilterTrigger from "./FilterTrigger";
import Checkpoints from "./Checkpoints";

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
   * ✅ STEP 1: Uncomment the call to usePopup hook to configure a popup overlay.
   * for menu (non-modal popup with hasPopup: ARIA_HASPOPUP.MENU)
   */

  const popupControls = usePopup({
    bodyId: "menu-overlay",
    triggerId: "menu-overlay-trigger",
    hasPopup: ARIA_HASPOPUP.MENU,
  });

  const handleMenuChange = (event, { selectedKeys: newSelectedKeys }) => {
    console.log("Menu selection changed:", newSelectedKeys);
    setSelectedKeys(Array.from(newSelectedKeys));
    // popupControls.close();
  };

  return (
    <div style={{ padding: "50px" }}>
      <Checkpoints />

      <Button
        variant="secondary"
        onClick={() => console.log("Previous button clicked")}
        style={{ marginRight: "12px" }}
      >
        Previous Button
      </Button>

      {/**
       * ✅ STEP 2: Connect the FilterTrigger button to the popup controls.
       * Pass trigger props and toggle handler to FilterTrigger component.
       */}

      <FilterTrigger trigger={popupControls.trigger} onClick={popupControls.toggle} />

      {/**
       * ✅ STEP 3: Wrap MenuList with PopupOverlay component.
       * Pass trigger, body, close props and configure placement, trapFocus, and style.
       */}

      <PopupOverlay
        trigger={popupControls.trigger}
        body={popupControls.body}
        close={popupControls.close}
        placement={PLACEMENTS.BOTTOM_START}
        trapFocus={false}
        style={{ width: "200px" }}
      >
        {/* ✅ STEP 4: Pass body id from popupControls to MenuList for aria controls */}
        <MenuList
          // id={popupControls.body.id}
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          onChange={handleMenuChange}
          ariaLabel="Product filters menu"
        >
          <MenuList.Section key="categories" title="📦 Categories">
            {categories.map((category) => (
              <MenuList.Option key={category.id}>{category.name}</MenuList.Option>
            ))}
          </MenuList.Section>

          <MenuList.Section key="prices" title="💰 Price Ranges">
            {priceRanges.map((price) => (
              <MenuList.Option key={price.id}>{price.name}</MenuList.Option>
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
