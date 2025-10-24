import React, { useState } from "react";
import Tree from "./Tree";
import { Item, Section } from "@lib/Collections";

const TreeList = () => {
  const [selectedKeys, setSelectedKeys] = useState([]);

  const handleSelectionChange = (event, { selectedKeys }) => {
    console.log("Selection changed:", selectedKeys);
    setSelectedKeys(selectedKeys);
  };

  return (
    <div>
      <h3>Tree Component Example with Selection</h3>

      <div
        style={{
          marginBottom: "16px",
          padding: "12px",
          backgroundColor: "#e8f4f8",
          borderRadius: "4px",
        }}
      >
        <strong>Selected:</strong> {selectedKeys.length > 0 ? selectedKeys.join(", ") : "None"}
      </div>

      <Tree
        ariaLabel="File explorer"
        selectionMode="single"
        selectedKeys={selectedKeys}
        onChange={handleSelectionChange}
      >
        <Section key="documents" title="Documents" className="highlighted-section">
          <Item key="doc1" className="important-file">
            <div>📄 Resume.pdf</div>
          </Item>
          <Item key="doc2">
            <div>📄 CoverLetter.docx</div>
          </Item>
          <Item key="folder1">
            <div>📁 Projects</div>
            <Item key="project1">
              <div>📄 ProjectA.pptx</div>
            </Item>
            <Item key="project2" style={{ color: "red", fontWeight: "bold" }}>
              <div>📄 ProjectB.xlsx</div>
            </Item>
          </Item>
        </Section>

        <Section key="media" title="Media">
          <Item key="photo1">
            <div>🖼️ Vacation.jpg</div>
          </Item>
          <Item key="photo2">
            <div>🖼️ Family.png</div>
          </Item>
          <Item key="video1">
            <div>🎥 Birthday.mp4</div>
          </Item>
        </Section>

        <Section key="code" title="Code">
          <Item key="code1">
            <div>📝 index.js</div>
          </Item>
          <Item key="src">
            <div>📁 src</div>
            <Item key="components">
              <div>📁 components</div>
              <Item key="button">
                <div>Button.jsx</div>
              </Item>
              <Item key="input">
                <div>Input.jsx</div>
              </Item>
            </Item>
            <Item key="utils">
              <div>📁 utils</div>
            </Item>
          </Item>
        </Section>
      </Tree>
    </div>
  );
};

export default TreeList;
