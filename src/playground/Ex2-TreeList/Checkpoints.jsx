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
      <div style={{ fontSize: "14px", marginBottom: "10px", lineHeight: "1.6" }}>
        📁 <strong style={{ fontWeight: "700", fontSize: "15px" }}>src/playground/Ex2-TreeList/TreeList.jsx</strong>
        <br />
        📁 <strong style={{ fontWeight: "700", fontSize: "15px" }}>src/playground/Ex2-TreeList/Tree.jsx</strong>
      </div>
      <strong>Checkpoints:</strong>
      <ul style={{ fontSize: "14px", margin: "8px 0" }}>
        <li>✅ No manual prop spreading - Tree handles everything</li>
        <li>✅ Automatic aria-level (1, 2, 3...) based on nesting</li>
        <li>✅ Automatic role="tree" & role="treeitem" application</li>
        <li>✅ Automatic aria-expanded=true for items with children</li>
        <li>✅ Arrow key navigation out of the box</li>
        <li>✅ Controlled selection with onChange handler</li>
        <li>✅ Click or Enter/Space to select items — aria-selected prop</li>
        <li>✅ Custom className and style props merged</li>
      </ul>
    </div>
  );
};

export default Checkpoints;
