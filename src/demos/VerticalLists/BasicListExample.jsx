import Collection from "@lib/Collections/Collection";
import "./ListExample.css";

const BasicListExample = () => {
  return (
    <>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
        Collection Builder - Tree Example
      </h2>

      <Collection 
        as="ul" 
        itemAs="li" 
        indentSize={24} 
        className="list-basic-container"
        pattern="tree"
        ariaLabel="Nested tree structure"
      >
        <Collection.Item>1</Collection.Item>
        <Collection.Item>2</Collection.Item>
        <Collection.Item aria-expanded="true">
          3
          <Collection as="ul" itemAs="li">
            <Collection.Item>3.1</Collection.Item>
            <Collection.Item>3.2</Collection.Item>
            <Collection.Item>3.3</Collection.Item>
          </Collection>
        </Collection.Item>
        <Collection.Item>4</Collection.Item>
        <Collection.Item aria-expanded="true">
          5
          <Collection as="ul" itemAs="li">
            <Collection.Item>5.1</Collection.Item>
            <Collection.Item aria-expanded="true">
              5.2
              <Collection as="ul" itemAs="li">
                <Collection.Item>5.2.1</Collection.Item>
                <Collection.Item aria-expanded="true">
                  5.2.2
                  <Collection as="ul" itemAs="li">
                    <Collection.Item>5.2.2.1</Collection.Item>
                    <Collection.Item>5.2.2.2</Collection.Item>
                  </Collection>
                </Collection.Item>
              </Collection>
            </Collection.Item>
            <Collection.Item>5.3</Collection.Item>
          </Collection>
        </Collection.Item>
        <Collection.Item>6</Collection.Item>
      </Collection>
    </>
  );
};

export default BasicListExample;
