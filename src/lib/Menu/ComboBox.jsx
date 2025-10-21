/* eslint-disable */

import React from "react";
import { Overlay } from "@lib/Overlay";
import ComboBoxList from "./ComboBoxList";
import MenuSection from "./MenuSection";
import MenuOption from "./MenuOption";

/**
 * ComboBox - ComboBox with overlay using aria-activedescendant pattern
 * Focus remains on the trigger (input) while navigating options
 * Consumers should use useMenu hook to get overlay controls,
 * then spread trigger props on their search input element
 *
 * @example
 * const comboboxState = useComboBox({
 *   overlayConfig: { placement: PLACEMENTS.BOTTOM_START },
 *   style: { width: '250px' }
 * });
 *
 * return (
 *   <>
 *     <input {...comboboxState.trigger} />
 *     <ComboBox {...comboboxState} onChange={handleChange} ariaLabel="My combobox">
 *       <ComboBox.Option>Item 1</ComboBox.Option>
 *     </ComboBox>
 *   </>
 * );
 */
const ComboBox = ({
  trigger,
  body,
  open,
  close,
  toggle,
  setVisible,
  autoFocus = false,
  closeOnOutsideClick = true,
  children,
  selectedKeys,
  defaultSelectedKeys,
  selectionMode = "single",
  onChange,
  ariaLabel,
  listboxId = "combobox-listbox",
  navigation,
  itemsRef,
  ...props
}) => {
  return (
    <Overlay
      trigger={trigger}
      body={body}
      open={open}
      close={close}
      toggle={toggle}
      setVisible={setVisible}
      pattern="menu"
      autoFocus={autoFocus}
      closeOnOutsideClick={closeOnOutsideClick}
    >
      <ComboBoxList
        selectedKeys={selectedKeys}
        defaultSelectedKeys={defaultSelectedKeys}
        selectionMode={selectionMode}
        onChange={onChange}
        ariaLabel={ariaLabel}
        close={close}
        open={open}
        toggle={toggle}
        listboxId={listboxId}
        navigation={navigation}
        itemsRef={itemsRef}
        {...props}
      >
        {children}
      </ComboBoxList>
    </Overlay>
  );
};

// Attach child components for compound component pattern
ComboBox.Section = MenuSection;
ComboBox.Option = MenuOption;
ComboBox.List = ComboBoxList; // Export ComboBoxList for standalone usage

export default ComboBox;
