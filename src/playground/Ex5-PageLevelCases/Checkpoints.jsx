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
        📁 <strong style={{ fontWeight: "700", fontSize: "15px" }}>src/playground/Ex5-PageLevelCases/PageLevelCases.jsx</strong>
        <br />
      </div>
      <strong>Checkpoints:</strong>
      <ul style={{ fontSize: "14px", margin: "8px 0" }}>
        <li>✅ Add skip link for keyboard users</li>
        <li>✅ Use proper semantic heading levels (h1, h2, h3)</li>
        <li>✅ Add missed live region if any</li>
      </ul>
      <div style={{ fontSize: "14px", marginTop: "10px" }}>
        Refer to <a href="http://localhost:3009/best-practices" target="_blank" rel="noopener noreferrer">more page level best practices</a>.
      </div>
    </div>
  );
};

export default Checkpoints;
