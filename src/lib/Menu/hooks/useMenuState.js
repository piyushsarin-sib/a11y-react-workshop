import React, { useMemo } from 'react';
import { useSelection } from '../../interactions/selection/useSelection';
import { useRovingIndex } from '../../interactions/keyboard/hooks/useRovingTabIndex';

/**
 * Hook for managing menu state including selection and keyboard navigation
 * This hook processes children to extract menu items and manages their state
 *
 * @param {Object} options - Configuration options
 * @param {ReactNode} options.children - Menu JSX children containing Menu.Option components
 * @param {Array<string>} options.selectedKeys - Currently selected keys (controlled mode)
 * @param {Array<string>} options.defaultSelectedKeys - Default selected keys (uncontrolled mode)
 * @param {Function} options.onChange - Selection change handler: (event, { selectedKeys }) => void
 * @param {string} options.ariaLabel - Accessible label for the menu
 * @param {string} options.selectionMode - Selection mode: 'single' or 'multiple'
 * @returns {Object} Menu state with collection props and item props getters
 */
export const useMenuState = ({
  children,
  selectedKeys,
  defaultSelectedKeys,
  onChange,
  ariaLabel,
  selectionMode = 'single'
}) => {
  // Extract menu options from children (supports nested Menu.Section)
  const createMenuNodes = (children) => {
    const nodes = [];

    const extractOptions = (children) => {
      React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return;

        // Check if it's a Menu.Option
        const isMenuOption = child.type?.displayName === 'Menu.Option' ||
                            child.props.value !== undefined;

        if (isMenuOption) {
          const key = child.props.value || child.key;
          if (key && !child.props.disabled) {
            nodes.push({
              key,
              value: key,
              label: child.props.children,
              disabled: child.props.disabled || false
            });
          }
        } else if (child.props?.children) {
          // Recursively search nested children (e.g., Menu.Section)
          extractOptions(child.props.children);
        }
      });
    };

    extractOptions(children);
    return nodes;
  };

  const menuNodes = useMemo(() => createMenuNodes(children), [children]);

  // Use existing hooks with the processed nodes
  const selection = useSelection({
    selectionMode,
    selectedKeys: selectedKeys !== undefined ? new Set(selectedKeys) : undefined,
    defaultSelectedKeys: defaultSelectedKeys ? new Set(defaultSelectedKeys) : new Set(),
    onChange: (event, { selectedKeys }) => {
      onChange?.(event, { selectedKeys });
    },
    pattern: 'menu',
    label: ariaLabel
  });

  const navigation = useRovingIndex({
    items: menuNodes,
    orientation: "vertical",
    loop: true,
    defaultActiveKey: menuNodes.length > 0 ? menuNodes[0].key : null
  });

  return {
    getCollectionProps: () => ({
      ...selection.getCollectionAriaProps(),
      ...navigation.getCollectionProps()
    }),
    getItemProps: (key) => {
      // Find the item data from menuNodes
      const item = menuNodes.find(node => node.key === key);
      return {
        ...selection.getItemSelectionProps(key, item),
        ...navigation.getItemProps(key)
      };
    },
    selectedKeys: selection.selectedKeys,
    menuNodes
  };
};
