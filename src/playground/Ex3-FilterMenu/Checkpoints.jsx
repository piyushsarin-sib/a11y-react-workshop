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
      <div style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>
        📁 <strong>File:</strong> src/playground/Ex3-FilterMenu/FilterMenu.jsx
      </div>
      <strong>Checkpoints:</strong>
      <ul style={{ fontSize: "14px", margin: "8px 0" }}>
        <li>✅ STEP 1: Configure usePopup hook for menu overlay</li>
        <li>✅ STEP 2: Connect trigger button to popup controls</li>
        <li>✅ STEP 3: Wrap MenuList with PopupOverlay component</li>
        <li>✅ STEP 4: Pass body id and close method to MenuList</li>
      </ul>
      <div style={{ marginTop: "12px", fontSize: "14px", color: "#666" }}>
        <strong>Key Concepts:</strong>
        <ul style={{ margin: "4px 0" }}>
          <li><strong>Trigger Button:</strong> aria-haspopup="menu", aria-expanded, aria-controls</li>
          <li><strong>Menu Container:</strong> role="menu", id (linked to trigger), tabindex="0"</li>
          <li><strong>Menu Items:</strong> role="menuitem", aria-selected for selection state</li>
          <li><strong>Popup Wrapper:</strong> Presentational container for overlay positioning</li>
          <li><strong>Keyboard Navigation:</strong> Arrow keys (↑↓) for navigation</li>
          <li><strong>Close Menu:</strong> ESC, Tab, Shift+Tab, or click outside</li>
          <li><strong>Focus Management:</strong> Focus restored to trigger button on close</li>
        </ul>
      </div>
    </div>
  );
};

export default Checkpoints;
