// Main Collection Component (legacy - uses createCollectionAria internally)
export { default as Collection } from "./__deprecated__/Collection";

// Modern Components
export { ItemRenderer } from "./components/ItemRenderer";
export { default as Item } from "./components/Item";
export { default as Section } from "./components/Section";

// Hooks
export { useCollectionState } from "./hooks/useCollectionState";

// Utilities for building ARIA props
export { buildCollectionAriaProps } from "./utils/buildCollectionAriaProps";
export { buildNodeAriaProps } from "./utils/buildNodeAriaProps";

// Legacy utility (used by legacy Collection.jsx - kept for backward compatibility)
export { createCollectionAria } from "./__deprecated__/createCollectionAria";
