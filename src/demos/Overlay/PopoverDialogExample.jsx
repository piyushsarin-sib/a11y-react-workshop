import React from 'react';
import { PopupOverlay, usePopup, PLACEMENTS, ARIA_HASPOPUP } from '@lib/Overlay';
import Button from '@common/Button';

/**
 * PopoverDialogExample - Demonstrates non-modal dialog popover with trapFocus=true
 *
 * Use cases:
 * - Color pickers
 * - Date pickers
 * - Settings panels
 * - Any popover with arbitrary content that needs focus trap
 *
 * Key differences from modal dialog:
 * - Non-modal (no aria-modal, no inert, no scroll lock)
 * - Dynamic positioning (relative to trigger)
 * - Can click outside to close
 * - Conditional focus trap (keyboard users only)
 */
const PopoverDialogExample = () => {
  const popoverState = usePopup({
    bodyId: 'color-picker-popover',
    triggerId: 'color-picker-button',
    role: 'dialog',
    hasPopup: ARIA_HASPOPUP.DIALOG,
  });

  const colors = [
    { name: 'Red', hex: '#ef4444' },
    { name: 'Blue', hex: '#3b82f6' },
    { name: 'Green', hex: '#10b981' },
    { name: 'Yellow', hex: '#f59e0b' },
    { name: 'Purple', hex: '#a855f7' },
    { name: 'Pink', hex: '#ec4899' },
  ];

  return (
    <div style={{ padding: '100px' }}>
      <h3>Popover Dialog Example</h3>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        A non-modal dialog popover with focus trap for keyboard users.
        Click or press Enter on the button to open.
      </p>

      <Button
        {...popoverState.trigger}
        onClick={popoverState.toggle}
        variant="primary"
        style={{ minWidth: '150px' }}
      >
        Pick a Color
      </Button>

      <PopupOverlay
        {...popoverState}
        placement={PLACEMENTS.BOTTOM_START}
        trapFocus={true}  // Enable focus trap for keyboard users
        style={{ minWidth: '250px' }}
      >
        <h4 id={popoverState.body['aria-labelledby']} style={{ margin: '0 0 12px 0' }}>
          Choose a Color
        </h4>

        <div id={popoverState.body['aria-describedby']} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {colors.map((color) => (
            <button
              key={color.hex}
              onClick={() => {
                alert(`Selected: ${color.name}`);
                popoverState.close();
              }}
              style={{
                backgroundColor: color.hex,
                border: '2px solid #ddd',
                borderRadius: '4px',
                height: '50px',
                cursor: 'pointer',
                outline: 'none',
                transition: 'transform 0.1s',
              }}
              onFocus={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.borderColor = '#333';
              }}
              onBlur={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.borderColor = '#ddd';
              }}
              aria-label={`${color.name}, ${color.hex}`}
            />
          ))}
        </div>

        <div style={{ marginTop: '12px', textAlign: 'right' }}>
          <Button
            onClick={popoverState.close}
            variant="ghost"
            style={{ fontSize: '14px' }}
          >
            Cancel
          </Button>
        </div>
      </PopupOverlay>
    </div>
  );
};

export default PopoverDialogExample;
