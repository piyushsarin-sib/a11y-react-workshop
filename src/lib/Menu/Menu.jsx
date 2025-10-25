import React from "react";
import { PopupOverlay, PLACEMENTS } from "@lib/Overlay";
import MenuList from "./MenuList";
import MenuSection from "./MenuSection";
import MenuOption from "./MenuOption";

/**
 * Menu - Menu with PopupOverlay by default
 * Consumers should use useMenu hook to get popup controls,
 * then spread trigger props on their chosen trigger element
 *
 * @example
 * const menuState = useMenu({
 *   overlayConfig: { placement: PLACEMENTS.BOTTOM_START },
 *   style: { width: '250px' }
 * });
 *
 * return (
 *   <>
 *     <Button {...menuState.trigger} onClick={menuState.toggle}>Open Menu</Button>
 *     <Menu {...menuState} onChange={handleChange} ariaLabel="My menu">
 *       <Menu.Option>Item 1</Menu.Option>
 *     </Menu>
 *   </>
 * );
 */
const Menu = ({
  trigger,
  body,
  close,
  overlayConfig = {},
  style = {},
  className = '',
  trapFocus = false,  // Menus should NOT trap focus - Tab closes menu
  children,
  selectedKeys,
  defaultSelectedKeys,
  selectionMode = "single",
  onChange,
  ariaLabel,
}) => {
  const { placement = PLACEMENTS.BOTTOM_START } = overlayConfig;

  return (
    <PopupOverlay
      trigger={trigger}
      body={body}
      close={close}
      placement={placement}
      trapFocus={trapFocus}
      style={style}
      className={className}
    >
      <MenuList
        id={body?.id}
        selectedKeys={selectedKeys}
        defaultSelectedKeys={defaultSelectedKeys}
        selectionMode={selectionMode}
        onChange={onChange}
        ariaLabel={ariaLabel}
      >
        {children}
      </MenuList>
    </PopupOverlay>
  );
};

// Attach child components for compound component pattern
Menu.Section = MenuSection;
Menu.Option = MenuOption;
Menu.List = MenuList; // Export MenuList for standalone usage

export default Menu;
