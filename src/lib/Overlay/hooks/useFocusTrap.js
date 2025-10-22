import { useEffect, useCallback } from "react";
import { applyFocusTrap } from "../helpers/keyHandlers";

/**
 * Custom hook for trapping focus within a container
 * Prevents Tab from moving focus outside the container
 * When disabled, can still detect Tab-out and trigger callback
 *
 * @param {Object} options - Configuration options
 * @param {boolean} options.enabled - Whether focus trap is enabled
 * @param {React.RefObject} options.containerRef - Ref to the container element
 * @param {Function} options.onTabOut - Callback when Tab would move focus outside (when trap disabled)
 * @param {boolean} options.isVisible - Visibility state to re-attach listener when container mounts
 */
const useFocusTrap = ({ enabled = true, containerRef, onTabOut, isVisible = true }) => {
  const handleKeyDown = useCallback(
    (event) => {
      if (!containerRef?.current) return;

      // Only handle Tab key
      if (event.key !== "Tab") return;

      if (enabled) {
        // Apply focus trap (wraps focus within container)
        applyFocusTrap(event, containerRef.current);
      } else if (onTabOut) {
        // When trap disabled, close on any Tab press
        // preventDefault to avoid focus jumping before close
        event.preventDefault();
        onTabOut();
      }
    },
    [enabled, containerRef, onTabOut],
  );

  useEffect(() => {
    // Always listen when container is visible and mounted
    if (isVisible && containerRef?.current) {
      document.addEventListener("keydown", handleKeyDown, true);
      return () => {
        document.removeEventListener("keydown", handleKeyDown, true);
      };
    }
  }, [handleKeyDown, containerRef, isVisible]);
};

export default useFocusTrap;
