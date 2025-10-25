/**
 * CollectionContext - Minimal context for automatic nesting detection
 *
 * Tracks:
 * - level: Current nesting depth (for aria-level)
 * - pattern: Collection pattern (tree/list/grid) for automatic role assignment
 *
 * Both values are static (set once, never change) - no performance impact
 */
import { createContext, useContext } from 'react';

const CollectionContext = createContext(null);

export const useCollectionContext = () => {
  return useContext(CollectionContext);
};

export default CollectionContext;
