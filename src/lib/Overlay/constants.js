export const PLACEMENTS = {
  TOP: 'top',
  TOP_START: 'top-start',
  TOP_END: 'top-end',
  BOTTOM: 'bottom',
  BOTTOM_START: 'bottom-start',
  BOTTOM_END: 'bottom-end',
  LEFT: 'left',
  LEFT_START: 'left-start',
  LEFT_END: 'left-end',
  RIGHT: 'right',
  RIGHT_START: 'right-start',
  RIGHT_END: 'right-end',
  CENTER: 'center', // for modals
};

export const OVERLAY_TYPES = {
  POPOVER: 'popover',
  MENU: 'menu',
  DIALOG: 'dialog',
  TOOLTIP: 'tooltip',
};

export const KEYS = {
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ENTER: 'Enter',
  SPACE: ' ',
};

// ARIA haspopup values (https://www.w3.org/TR/wai-aria-1.2/#aria-haspopup)
export const ARIA_HASPOPUP = {
  FALSE: false,
  TRUE: true,  // same as 'menu'
  MENU: 'menu',
  LISTBOX: 'listbox',
  TREE: 'tree',
  GRID: 'grid',
  DIALOG: 'dialog',
};