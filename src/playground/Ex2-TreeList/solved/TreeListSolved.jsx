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
    <Tree
      ariaLabel="File explorer"
      selectionMode="single"
      selectedKeys={selectedKeys}
      onChange={handleSelectionChange}
    >
      <Section key="categories" title="📦 Categories" className="highlighted-section">
        <Item key="hearing">
          <div>Hearing Assistance</div>
        </Item>
        <Item key="vision">
          <div>Visual Assistance</div>
        </Item>
        <Item key="mobility">
          <div>Mobility Aids</div>
        </Item>
        <Item key="sensory">
          <div>Sensory Tools</div>
        </Item>
      </Section>

      <Section key="prices" title="💰 Price Ranges">
        <Item key="under1000">
          <div>Under ₹1,000</div>
        </Item>
        <Item key="1000-5000">
          <div>₹1,000 - ₹5,000</div>
        </Item>
        <Item key="above5000">
          <div>Above ₹5,000</div>
        </Item>
      </Section>

      <Section key="availability" title="📦 Availability">
        <Item key="india">
          <div>India</div>
          <Item key="maharashtra">
            <div>Maharashtra</div>
            <Item key="mumbai" style={{ color: "red", fontWeight: "bold" }}>
              <div>Mumbai</div>
            </Item>
            <Item key="pune" className="featured-location">
              <div>Pune</div>
            </Item>
          </Item>
          <Item key="karnataka">
            <div>Karnataka</div>
          </Item>
        </Item>
      </Section>
    </Tree>
  );
};

export default TreeList;
