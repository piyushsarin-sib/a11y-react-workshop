import React from "react";
import Collection from "@lib/Collections/Collection";
import { useComboboxState } from "./hooks/useComboboxState";
import MenuSection from "./MenuSection";
import MenuOption from "./MenuOption";
import { MenuContext } from "./MenuContext";
import "@lib/css/SelectionExample.css";

/**
 * ComboBoxList - Standalone combobox component using aria-activedescendant
 * Use this when focus should remain on the trigger (e.g., search input)
 */
const ComboBoxList = ({
  className = "selection-menu",
  children,
  close,
  open,
  toggle,
  listboxId = "combobox-listbox",
  navigation,
  itemsRef,
  selection,
  ...props
}) => {
  // Use useComboboxState hook for children processing
  const combobox = useComboboxState({
    children,
    listboxId,
    navigation,
    selection,
  });

  // Set items in ref for useComboBox's useActiveDescendant (for children-based rendering)
  React.useEffect(() => {
    if (itemsRef) {
      itemsRef.current = combobox.menuNodes;
    }
  }, [itemsRef, combobox.menuNodes]);

  return (
    <MenuContext.Provider value={{ menu: combobox, close, open, toggle }}>
      <Collection
        as="ul"
        itemAs="li"
        className={className}
        autoIndent={true}
        indentSize={24}
        {...combobox.getCollectionProps()}
        {...props}
      >
        {children}
      </Collection>
    </MenuContext.Provider>
  );
};

// Attach child components for compound component pattern
ComboBoxList.Section = MenuSection;
ComboBoxList.Option = MenuOption;

export default ComboBoxList;
