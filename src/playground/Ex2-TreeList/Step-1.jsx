/* eslint-disable */
/**
 * Tree Component
 * Usage:
 *
 * <Tree>
 *   <Section title="Files">
 *     <Item>Document.txt</Item>
 *   </Section>
 * </Tree>
 */
import React from "react";
import { useCollectionState } from "@lib/Collections/hooks/useCollectionState";
import { useKeyboardNavigation } from "@lib/interactions/keyboard/hooks/useKeyboardNavigation";
import { useSelection } from "@lib/interactions/selection/useSelection";
import { ItemRenderer } from "@lib/Collections/components/ItemRenderer";
import { mergeProps } from "@lib/utils";
import "@lib/Tree/Tree.css";

const Tree = React.forwardRef(
  (
    {
      children,
      pattern = "tree",
      orientation = "vertical",
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
      // eslint-disable-next-line no-unused-vars
      as: WrapperElement = "ul",
      indentSize = 24,
      // Selection props
      selectionMode = "none",
      selectedKeys,
      onChange,
      ...props
    },
    ref,
  ) => {
    /**
     * ✅ STEP 1: Uncomment the call to useCollectionState hook with relevant config.
     * This processes JSX children to extract collection state with metadata
     */

    const state = useCollectionState({
      children,
      indentSize,
      pattern,
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
      orientation,
      selectionMode,
    });

    /**
     * ✏️ TODO STEP 2: Uncomment the call to useKeyboardNavigation hook.
     * This sets up keyboard navigation using collection's navigation methods
     */

    // const nav = useKeyboardNavigation({
    //   collection: state,
    //   orientation,
    //   loop: true,
    // });

    /**
     * ✏️ TODO STEP 3: Uncomment the call to useSelection hook.
     * This sets up selection (always call hook, but selectionMode controls behavior)
     */

    // const selection = useSelection({
    //   selectionMode,
    //   selectedKeys,
    //   onChange,
    //   pattern: "tree",
    //   label: ariaLabel,
    // });

    // ✅ STEP 4: Merge all props using mergeProps utility
    const wrapperProps = mergeProps(
      { className: "tree" },
      state.getCollectionProps(),
      nav.getCollectionProps(),
      { ref, ...props },
    );

    // Render tree items and nested tree itens from hierarchical collection
    // using ItemRenderer component
    return (
      <WrapperElement {...wrapperProps}>
        {state.collection.map((node) => (
          <ItemRenderer
            key={node.key}
            node={node}
            nav={nav}
            selection={selection}
            itemAs="li"
            sectionWrapperAs="li"
            sectionGroupAs="ul"
          />
        ))}
      </WrapperElement>
    );
  },
);

Tree.displayName = "Tree";

export default Tree;
