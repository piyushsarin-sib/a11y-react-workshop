/**
 * MenuSection - Alias for Section component
 * Uses the exact same implementation as Tree's Section
 */
import Section from "@lib/Collections/components/Section";

// Just export Section with a different display name
const MenuSection = Section;
MenuSection.displayName = "Menu.Section";

export default MenuSection;
