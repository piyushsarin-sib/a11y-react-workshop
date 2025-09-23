import Collection from "../../../lib/Collections/Collection";
import { useExpansion } from "../../../lib/Collections/hooks/useExpansion";

const DynamicTreeExample = () => {
  // Dynamic tree data structure
  const treeData = [
    {
      key: 'docs',
      name: '📁 Documents',
      type: 'folder',
      children: [
        { key: 'cv', name: '📄 CV.pdf', type: 'file' },
        { key: 'portfolio', name: '📄 Portfolio.pdf', type: 'file' },
        {
          key: 'legal',
          name: '📁 Legal',
          type: 'folder',
          children: [
            { key: 'contract1', name: '📄 Employment Contract.pdf', type: 'file' },
            { key: 'nda', name: '📄 NDA.pdf', type: 'file' }
          ]
        }
      ]
    },
    {
      key: 'work',
      name: '📁 Work Projects',
      type: 'folder',
      children: [
        {
          key: 'react-app',
          name: '📁 React App',
          type: 'folder',
          children: [
            {
              key: 'src-main',
              name: '📁 src',
              type: 'folder',
              children: [
                { key: 'app-js', name: '⚛️ App.jsx', type: 'file' },
                { key: 'index-js', name: '🌐 index.js', type: 'file' }
              ]
            },
            { key: 'package', name: '📦 package.json', type: 'file' }
          ]
        },
        { key: 'design', name: '🎨 Design Files', type: 'folder', children: [] }
      ]
    },
    { key: 'readme', name: '📄 README.md', type: 'file' }
  ];

  // Extract all expandable keys from data
  const getExpandableKeys = (items) => {
    const keys = [];
    const traverse = (items) => {
      items.forEach(item => {
        if (item.type === 'folder' && item.children && item.children.length > 0) {
          keys.push(item.key);
          traverse(item.children);
        }
      });
    };
    traverse(items);
    return keys;
  };

  const expandableFolders = getExpandableKeys(treeData);

  // Initialize expansion state - start collapsed
  const expansion = useExpansion({
    defaultExpanded: new Set(),
    allowMultiple: true,
  });

  const handleItemClick = (event, { key }) => {
    // Prevent event bubbling to avoid triggering parent expansion/collapse
    event?.stopPropagation();
    console.log('Dynamic tree item clicked:', key);
  };

  // Dynamic tree renderer - recursively renders tree data
  const renderTreeItem = (item) => {
    const isFolder = item.type === 'folder';
    const hasChildren = isFolder && item.children && item.children.length > 0;
    const isExpanded = expansion.isExpanded(item.key);

    if (!hasChildren) {
      // Leaf node (file)
      return (
        <Collection.Item
          key={item.key}
          onClick={(e) => handleItemClick(e, { key: item.key })}
        >
          {item.name}
        </Collection.Item>
      );
    }

    // Folder with children
    return (
      <Collection.Item
        key={item.key}
        {...expansion.getItemProps(item.key, {
          hasChildren: true,
          onClick: (e) => handleItemClick(e, { key: item.key })
        })}
      >
        {isExpanded ? item.name.replace('📁', '📂') : item.name}

        {isExpanded && (
          <Collection
            as="ul"
            itemAs="li"
            pattern="tree"
          >
            {item.children.map(child => renderTreeItem(child))}
          </Collection>
        )}
      </Collection.Item>
    );
  };

  return (
    <>
      <h3 style={{ fontSize: "18px", fontWeight: "bold", marginTop: "32px", marginBottom: "8px" }}>
        🔸 Dynamic Tree - Uncontrolled
      </h3>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
        Hook manages expansion state internally. Tree rendered from data structure.
      </p>

      {/* Controls */}
      <div style={{ marginBottom: "16px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => expansion.expandAll(expandableFolders)}
          style={{
            padding: "6px 12px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Expand All ({expandableFolders.length} folders)
        </button>
        <button
          onClick={() => expansion.collapseAll()}
          style={{
            padding: "6px 12px",
            background: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Collapse All
        </button>
      </div>

      <div style={{
        border: "1px solid #28a745",
        borderRadius: "8px",
        padding: "12px",
        background: "#f8fff8"
      }}>
        <Collection
          title="Dynamic File System"
          ariaLabel="Dynamic collapsible file tree"
          pattern="tree"
          as="ul"
          itemAs="li"
          className="list-unstyled"
        >
          {treeData.map(item => renderTreeItem(item))}
        </Collection>
      </div>

      {/* Status Display */}
      <div style={{
        marginTop: "16px",
        padding: "12px",
        background: "#d4edda",
        borderRadius: "4px",
        fontSize: "14px"
      }}>
        <strong>Dynamic Tree Expanded:</strong> {
          Array.from(expansion.expanded).join(', ') || 'None'
        }
      </div>
    </>
  );
};

export default DynamicTreeExample;