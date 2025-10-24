import { useEffect, useCallback } from "react";

/**
 * Custom hook for handling click outside behavior
 *
 * @param {Object} options - Configuration options
 * @param {React.RefObject} options.ref - Ref to the element to detect outside clicks for
 * @param {React.RefObject} options.triggerRef - Ref to the trigger element (excluded from outside clicks)
 * @param {React.RefObject} options.backdropRef - Ref to the backdrop element (for backdrop-only clicks)
 * @param {boolean} options.enabled - Whether outside click detection is enabled
 * @param {boolean} options.hasBackdrop - Whether the overlay has a backdrop
 * @param {Function} options.setVisible - Function to set visibility state
 */
const useClickOutside = ({
  ref,
  triggerRef,
  backdropRef,
  enabled = true,
  hasBackdrop = false,
  setVisible,
}) => {
  const handleClickOutside = useCallback(
    (e) => {
      if (!enabled) return;

      const clickedElement = e.target;

      // Don't close if clicking inside overlay or trigger
      if (ref?.current?.contains(clickedElement) || triggerRef?.current?.contains(clickedElement)) {
        return;
      }

      // For backdrop overlays, only close on backdrop click
      if (hasBackdrop && backdropRef?.current) {
        // Check if clicked on backdrop element or its children (if any)
        const clickedOnBackdrop =
          clickedElement === backdropRef.current ||
          backdropRef.current.contains(clickedElement);

        if (!clickedOnBackdrop) {
          return; // Don't close if not clicking on backdrop
        }
      }

      // Close the overlay
      if (setVisible) {
        setVisible(false);
      }
    },
    [enabled, ref, triggerRef, backdropRef, hasBackdrop, setVisible],
  );

  useEffect(() => {
    if (enabled) {
      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    }
  }, [enabled, handleClickOutside]);

  return { handleClickOutside };
};

export default useClickOutside;
