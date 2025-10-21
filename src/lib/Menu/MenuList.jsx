import Collection from '../Collections/Collection';
import { useMenuState } from './hooks/useMenuState';
import MenuSection from './MenuSection';
import MenuOption from './MenuOption';
import { MenuContext } from './MenuContext';
import "@lib/css/SelectionExample.css";

/**
 * MenuList - Standalone menu component without overlay
 * Use this when you need a menu without popover/overlay behavior
 */
const MenuList = ({
  selectedKeys,
  onChange,
  defaultSelectedKeys = [],
  selectionMode = 'single',
  className = 'selection-menu',
  ariaLabel,
  children,
  close,
  open,
  toggle,
  ...props
}) => {
  // Use useMenuState hook for menu logic (children processing, keyboard nav)
  const menu = useMenuState({
    children,
    selectedKeys,
    defaultSelectedKeys,
    onChange,
    ariaLabel,
    selectionMode
  });

  return (
    <MenuContext.Provider value={{ menu, close, open, toggle }}>
      <Collection
        as="ul"
        itemAs="li"
        className={className}
        autoIndent={true}
        indentSize={24}
        {...menu.getCollectionProps()}
        {...props}
      >
        {children}
      </Collection>
    </MenuContext.Provider>
  );
};

// Attach child components for compound component pattern
MenuList.Section = MenuSection;
MenuList.Option = MenuOption;

export default MenuList;
