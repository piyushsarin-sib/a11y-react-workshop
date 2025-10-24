import React from "react";
import { useCollectionState } from "@lib/Collections/hooks/useCollectionState";
import { useKeyboardNavigation } from "@lib/interactions/keyboard/hooks/useKeyboardNavigation";
import { useSelection } from "@lib/interactions/selection/useSelection";
import { ItemRenderer } from "@lib/Collections/components/ItemRenderer";
import { mergeProps } from "@lib/utils";
import MenuSection from "./MenuSection";
import MenuOption from "./MenuOption";
import "./MenuList.css";

/**
 * MenuList - Standalone menu component
 * Similar to Tree but for menu pattern (no nesting, no aria-level, no aria-expanded)
 *
 * Usage:
 * import MenuList, { MenuOption, MenuSection } from '@lib/Menu';
 *
 * <MenuList selectionMode="single">
 *   <MenuSection title="Categories">
 *     <MenuOption>Item 1</MenuOption>
 *   </MenuSection>
 * </MenuList>
 */
const MenuList = React.forwardRef(
  (
    {
      children,
      pattern = "menu",
      orientation = "vertical",
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
      as = "ul",
      // Selection props
      selectionMode = "single",
      selectedKeys,
      onChange,
      ...props
    },
    ref,
  ) => {
    const WrapperElement = as;

    // Process JSX children to extract collection state with metadata
    const state = useCollectionState({
      children,
      indentSize: 0, // No indentation for menu
      pattern,
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
      orientation,
      selectionMode,
    });

    // Set up keyboard navigation using collection's navigation methods
    // For menus, set first item as default active (WAI-ARIA menu pattern)
    const firstKey = state.getFirstKey?.();
    const nav = useKeyboardNavigation({
      collection: state,
      orientation,
      loop: true,
      defaultActiveKey: firstKey,
    });

    // Set up selection (always call hook, but selectionMode controls behavior)
    const selection = useSelection({
      selectionMode,
      selectedKeys,
      onChange,
      pattern: "menu",
      label: ariaLabel,
    });

    // Merge all props using mergeProps utility
    const wrapperProps = mergeProps(
      { className: "menu-list" },
      state.getCollectionProps(),
      nav.getCollectionProps(),
      { ref, ...props }
    );

    // Render menu from hierarchical collection using ItemRenderer component

    return (
      <WrapperElement {...wrapperProps}>
        {state.collection.map(node => (
          <ItemRenderer
            key={node.key}
            node={node}
            nav={nav}
            selection={selection}
            itemAs="li"
            sectionWrapperAs="li"
            sectionGroupAs="ul"
          />
        ))}
      </WrapperElement>
    );
  },
);

MenuList.displayName = "MenuList";

// Attach child components for compound component pattern
MenuList.Section = MenuSection;
MenuList.Option = MenuOption;

export default MenuList;
