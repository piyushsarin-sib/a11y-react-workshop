/**
 * MenuOption - Alias for Item component
 * Uses the exact same implementation as Tree's Item
 */
import Item from "@lib/Collections/components/Item";

// Just export Item with a different display name
const MenuOption = Item;
MenuOption.displayName = "Menu.Option";

export default MenuOption;