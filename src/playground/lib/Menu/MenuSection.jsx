/**
 * MenuSection Component
 *
 * Creates a labeled section/group within a menu.
 * Renders proper ARIA structure with role="group" and aria-labelledby.
 *
 * Structure for menu pattern:
 * <li role="none">
 *   <div role="none" id="heading-id">Section Title</div>
 *   <ul role="group" aria-labelledby="heading-id">
 *     <MenuList.Option>Item 1</MenuList.Option>
 *   </ul>
 * </li>
 *
 * Usage:
 * <MenuList>
 *   <MenuList.Section title="File Operations">
 *     <MenuList.Option value="new">New File</MenuList.Option>
 *     <MenuList.Option value="open">Open File</MenuList.Option>
 *   </MenuList.Section>
 * </MenuList>
 */
import React from "react";

const MenuSection = ({ title, children, className = "", ...props }) => {
  const headingId = React.useId();

  return (
    <li role="none">
      {/* Section heading - no ARIA attributes besides role="none" */}
      <div role="none" id={headingId} className="menu-section-title">
        {title}
      </div>

      {/* Group container with aria-labelledby pointing to heading */}
      <ul
        role="group"
        aria-labelledby={headingId}
        className={`menu-section ${className}`.trim()}
        {...props}
      >
        {children}
      </ul>
    </li>
  );
};

MenuSection.displayName = "Menu.Section";

export default MenuSection;
