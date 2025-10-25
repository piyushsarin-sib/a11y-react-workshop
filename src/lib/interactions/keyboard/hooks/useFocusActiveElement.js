import { useEffect } from "react";

/**
 * Hook to manage focus on the active element
 * Automatically focuses the active element when activeKey changes
 *
 * @param {Object} options - Configuration options
 * @param {string|number} options.activeKey - Currently active item key
 * @param {React.RefObject} options.itemRefsMap - Map of item keys to DOM elements
 * @param {boolean} options.disabled - Whether focus management is disabled
 */
export const useFocusActiveElement = ({ activeKey, itemRefsMap, disabled }) => {
  useEffect(() => {
    if (disabled || !activeKey) return;

    const activeElement = itemRefsMap.current.get(activeKey);
    if (activeElement && activeElement !== document.activeElement) {
      activeElement.focus();
    }
  }, [activeKey, disabled, itemRefsMap]);
};
