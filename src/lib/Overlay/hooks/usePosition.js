import { useState, useLayoutEffect, useCallback } from 'react';
import { PLACEMENTS } from '../constants';

const usePosition = (visible, placement, triggerRef, overlayRef) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const calculatePosition = useCallback(() => {
    if (!visible || !triggerRef?.current || !overlayRef?.current) {
      return null;
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const overlayRect = overlayRef.current.getBoundingClientRect();

    // Account for page scroll (needed for position: absolute)
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    let x = 0;
    let y = 0;

    // Static positioning based on placement
    switch (placement) {
      case PLACEMENTS.TOP:
        x = triggerRect.left + (triggerRect.width - overlayRect.width) / 2;
        y = triggerRect.top - overlayRect.height;
        break;
      case PLACEMENTS.TOP_START:
        x = triggerRect.left;
        y = triggerRect.top - overlayRect.height;
        break;
      case PLACEMENTS.TOP_END:
        x = triggerRect.right - overlayRect.width;
        y = triggerRect.top - overlayRect.height;
        break;
      case PLACEMENTS.BOTTOM:
        x = triggerRect.left + (triggerRect.width - overlayRect.width) / 2;
        y = triggerRect.bottom;
        break;
      case PLACEMENTS.BOTTOM_START:
        x = triggerRect.left + scrollX;
        y = triggerRect.bottom + scrollY;
        break;
      case PLACEMENTS.BOTTOM_END:
        x = triggerRect.right - overlayRect.width;
        y = triggerRect.bottom;
        break;
      case PLACEMENTS.LEFT:
        x = triggerRect.left - overlayRect.width;
        y = triggerRect.top + (triggerRect.height - overlayRect.height) / 2;
        break;
      case PLACEMENTS.LEFT_START:
        x = triggerRect.left - overlayRect.width;
        y = triggerRect.top;
        break;
      case PLACEMENTS.LEFT_END:
        x = triggerRect.left - overlayRect.width;
        y = triggerRect.bottom - overlayRect.height;
        break;
      case PLACEMENTS.RIGHT:
        x = triggerRect.right;
        y = triggerRect.top + (triggerRect.height - overlayRect.height) / 2;
        break;
      case PLACEMENTS.RIGHT_START:
        x = triggerRect.right;
        y = triggerRect.top;
        break;
      case PLACEMENTS.RIGHT_END:
        x = triggerRect.right;
        y = triggerRect.bottom - overlayRect.height;
        break;
      case PLACEMENTS.CENTER:
        x = (window.innerWidth - overlayRect.width) / 2;
        y = (window.innerHeight - overlayRect.height) / 2;
        break;
      default:
        x = triggerRect.left;
        y = triggerRect.bottom;
    }

    return { x, y };
  }, [visible, placement, triggerRef, overlayRef]);

  useLayoutEffect(() => {
    if (visible) {
      const newPosition = calculatePosition();
      if (newPosition) {
        setPosition(newPosition);
      }
    }
  }, [visible, calculatePosition]);

  return { position };
};

export default usePosition;