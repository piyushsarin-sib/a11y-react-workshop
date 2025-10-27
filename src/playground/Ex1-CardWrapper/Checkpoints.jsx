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
        📁 <strong style={{ fontWeight: "700", fontSize: "15px" }}>src/playground/Ex1-CardWrapper/CardWrapper.jsx</strong>
        <br />
      </div>
      <strong>Checkpoints:</strong>
      <ul style={{ fontSize: "14px", margin: "8px 0" }}>
        <li>✅ Use proper semantic HTML elements (article, h2, p, button)</li>
        <li>✅ Focus-visible styles for keyboard navigation</li>
        <li>✅ aria-labelledby and aria-describedby for better accessibility</li>
        <li>✅ Motion reduce preference for animations</li>
      </ul>
    </div>
  );
};

export default Checkpoints;
