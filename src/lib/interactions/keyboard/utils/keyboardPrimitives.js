/**
 * Core keyboard navigation primitives
 * Low-level building blocks for keyboard interaction patterns
 */

/**
 * Creates a keyboard delegate with common navigation interface
 * Acts as the base primitive for all navigation delegates
 */
export const createKeyboardDelegate = (delegateConfig, options = {}) => {
  const { disabled = false, activeKey } = options;

  return {
    getNextKey: (direction, currentKey = activeKey) => {
      if (disabled) return null;
      return delegateConfig.getNextIndex(direction, currentKey);
    }
  };
};

/**
 * Keyboard event mapping for common navigation patterns
 * Maps physical keys to logical directions
 */
export const KEYBOARD_NAVIGATION_KEYS = {
  ArrowRight: "right",
  ArrowLeft: "left",
  ArrowDown: "down",
  ArrowUp: "up",
  Home: "home",
  End: "end",
  PageDown: "pagedown",
  PageUp: "pageup"
};

/**
 * Creates a keyboard event handler using a navigation delegate
 */
export const createKeyboardEventHandler = (navigationDelegate, navigate) => {
  return (event) => {
    const direction = KEYBOARD_NAVIGATION_KEYS[event.key];
    if (!direction) return false;

    let handled = false;

    switch (direction) {
      case "right":
      case "left":
      case "down":
      case "up":
      case "home":
      case "end": {
        const nextKey = navigationDelegate.getNextKey(direction);
        if (nextKey !== null) {
          navigate(direction);
          handled = true;
        }
        break;
      }

      case "pagedown":
      case "pageup": {
        // Handle page navigation (could be extended for specific patterns)
        const pageDirection = direction === "pagedown" ? "down" : "up";
        const pageNextKey = navigationDelegate.getNextKey(pageDirection);
        if (pageNextKey !== null) {
          navigate(pageDirection);
          handled = true;
        }
        break;
      }
    }

    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }

    return handled;
  };
};