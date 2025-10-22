import { useState, useCallback, useRef } from 'react';

/**
 * useBaseOverlay - Base state and refs for all overlays
 *
 * Provides common state, refs, and functions for overlay visibility control.
 * Used by specialized hooks (useDialog, usePopup) as a foundation.
 *
 * @param {boolean} initialVisible - Initial visibility state
 * @returns {Object} Visibility state, refs, and control functions
 */
const useBaseOverlay = (initialVisible = false) => {
  const triggerRef = useRef();
  const bodyRef = useRef();

  const [visible, setVisible] = useState(initialVisible);

  const open = useCallback(() => {
    setVisible(true);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  const toggle = useCallback(() => {
    setVisible((prevState) => !prevState);
  }, []);

  return {
    triggerRef,
    bodyRef,
    visible,
    setVisible,
    open,
    close,
    toggle,
  };
};

export default useBaseOverlay;
