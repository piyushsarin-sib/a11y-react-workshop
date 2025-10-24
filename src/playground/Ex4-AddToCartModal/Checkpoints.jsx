import React from "react";

const Checkpoints = () => {
  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "12px",
        background: "rgb(240 255 248)",
        borderRadius: "4px",
      }}
    >
      <div style={{ fontSize: "14px", marginBottom: "10px" }}>
        📁 <strong style={{ fontWeight: "700", fontSize: "15px" }}>src/playground/Ex4-AddToCartModal/AddToCartModal.jsx</strong>
      </div>
      <strong>Checkpoints:</strong>
      <ul style={{ fontSize: "14px", margin: "8px 0" }}>
        <li>✅ STEP 1: Configure DialogOverlay component with dialog state props</li>
      </ul>
      <div style={{ marginTop: "12px", fontSize: "14px", color: "#666" }}>
        <strong>Key Concepts:</strong>
        <ul style={{ margin: "4px 0" }}>
          <li><strong>Dialog Container:</strong> role="dialog", aria-modal="true"</li>
          <li><strong>ARIA Labels:</strong> aria-labelledby (title) and aria-describedby (content)</li>
          <li><strong>Presentational Wrapper:</strong> Container for dialog positioning and styling</li>
          <li><strong>Focus Trap:</strong> Tab and Shift+Tab cycle focus within dialog only</li>
          <li><strong>Close Dialog:</strong> ESC key or click outside (with backdrop)</li>
          <li><strong>Focus Restoration:</strong> Focus returned to trigger button on close</li>
          <li><strong>Backdrop:</strong> Semi-transparent overlay behind dialog</li>
          <li><strong>Inert Background:</strong> Page content behind modal is inert (not interactive)</li>
          <li><strong>Scroll Lock:</strong> Page scroll disabled while dialog is open</li>
        </ul>
      </div>
    </div>
  );
};

export default Checkpoints;
