import { useId } from "react";
import usePopup from "@lib/Overlay/hooks/usePopup";
import { ARIA_HASPOPUP } from "@lib/Overlay";

/**
 * Hook for integrating menu with PopupOverlay
 * Provides popup controls (trigger props, open/close/toggle) for menu
 *
 * @param {Object} options - Configuration options
 * @param {Object} options.overlayConfig - Overlay configuration (placement, offset, etc)
 * @param {Object} options.style - Inline styles for overlay
 * @param {string} options.className - CSS class for overlay
 * @param {string} options.triggerId - ID for trigger element
 * @param {string} options.overlayId - ID for overlay element
 * @returns {Object} Popup controls (trigger, body, open, close, toggle, setVisible)
 */
export const useMenu = ({ overlayConfig, style, className, triggerId, overlayId } = {}) => {
  // Generate stable IDs for popup integration
  const generatedTriggerId = useId();
  const generatedOverlayId = useId();

  // Use usePopup for menu (non-modal popup with role="menu")
  const popupControls = usePopup({
    role: "menu",
    hasPopup: ARIA_HASPOPUP.MENU,
    triggerId: triggerId || generatedTriggerId,
    bodyId: overlayId || generatedOverlayId,
  });

  // Add overlayConfig, style, className, and menu-specific defaults to return value
  return {
    ...popupControls,
    overlayConfig,
    style,
    className,
    trapFocus: false,  // Menus should NOT trap focus - Tab closes menu
  };
};
