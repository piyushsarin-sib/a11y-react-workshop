import React from 'react';
import Collection from '../Collections/Collection';

// Menu.Title - renders as Collection.Title (non-selectable section headers)
const MenuTitle = ({ children, className = '', ...props }) => {
  const titleClass = `menu-item title-item ${className}`.trim();
  return <Collection.Title className={titleClass} {...props}>{children}</Collection.Title>;
};

MenuTitle.displayName = 'Menu.Title';

export default MenuTitle;