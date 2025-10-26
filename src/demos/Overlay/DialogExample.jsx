import React from 'react';
import { DialogOverlay, useDialog } from '@lib/Overlay';
import Button from '@common/Button';

const DialogExample = () => {
  const dialogDisclosure = useDialog({
    bodyId: 'dialog-overlay',
    triggerId: 'dialog-overlay-trigger',
  });

  const handleSave = () => {
    console.log('Save clicked');
    dialogDisclosure.close();
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
    dialogDisclosure.close();
  };

  return (
    <div style={{ padding: '50px', minHeight: '150vh' }}>
      <h3 style={{ marginBottom: '20px' }}>Dialog Example</h3>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        Click to open a dialog with backdrop. ESC to close, or click backdrop.
      </p>
      <p style={{ marginBottom: '20px', color: '#666', fontSize: '14px' }}>
        <strong>Accessibility features:</strong>
        <br />• Scroll lock (background won't scroll when dialog is open)
        <br />• Background content is inert (can't interact with page behind dialog)
        <br />• Focus trap (Tab cycles only through dialog buttons)
        <br />• Focus restoration (focus returns to trigger button on close)
      </p>

      <Button
        {...dialogDisclosure.trigger}
        onClick={dialogDisclosure.toggle}
        variant="primary"
      >
        Open Dialog
      </Button>

      {/* Dummy buttons to demonstrate inert behavior */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexDirection: 'column', maxWidth: '300px' }}>
        <Button variant="secondary" onClick={() => console.log('Background button 1 clicked')}>
          Background Button 1
        </Button>
        <Button variant="secondary" onClick={() => console.log('Background button 2 clicked')}>
          Background Button 2
        </Button>
        <p style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}>
          ↑ Try clicking these when dialog is open (they won't work due to inert)
        </p>
      </div>

      {/* Dummy content to enable scrolling */}
      <div style={{ marginTop: '40px' }}>
        <h4>Scroll down to see more content</h4>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} style={{ marginBottom: '20px', color: '#999' }}>
            Paragraph {i + 1}: This is dummy content to demonstrate scroll lock.
            When the dialog is open, you won't be able to scroll this page.
          </p>
        ))}
      </div>

      <DialogOverlay {...dialogDisclosure} title="Confirm Action" backdrop closeOnOutsideClick={true} style={{ width: '400px' }}>
        <p style={{ margin: '0 0 24px 0', color: '#666' }}>
          Are you sure you want to proceed with this action? This cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <Button onClick={handleCancel} variant="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="primary">
            Confirm
          </Button>
        </div>
      </DialogOverlay>
    </div>
  );
};

export default DialogExample;