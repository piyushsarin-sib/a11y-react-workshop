import { useEffect, useCallback } from 'react';

/**
 * Custom hook for handling ESC key press
 * Pure primitive - only handles ESC, nothing else
 *
 * @param {Object} options - Configuration options
 * @param {boolean} options.enabled - Whether ESC key handling is enabled
 * @param {Function} options.onEscape - Callback when ESC is pressed
 */
const useEscapeKey = ({ enabled = true, onEscape }) => {
  const handleKeyDown = useCallback(
    (event) => {
      if (!enabled) return;

      if (event.key === 'Escape' || event.key === 'Esc') {
        event.preventDefault();
        event.stopPropagation();
        onEscape?.();
      }
    },
    [enabled, onEscape]
  );

  useEffect(() => {
    if (enabled) {
      document.addEventListener('keydown', handleKeyDown, true);
      return () => {
        document.removeEventListener('keydown', handleKeyDown, true);
      };
    }
  }, [enabled, handleKeyDown]);
};

export default useEscapeKey;
