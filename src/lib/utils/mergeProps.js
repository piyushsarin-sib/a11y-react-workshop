import { chain } from './chain.js';

/**
 * Merges multiple props objects together with special handling for certain props
 *
 * Based on React Aria's mergeProps utility
 * https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/utils/src/mergeProps.ts
 *
 * Special handling:
 * - Event handlers (onXxx): Chained so all handlers execute in order
 * - className: Concatenated with spaces
 * - style: Merged (later styles override earlier ones)
 * - id: Last one wins (could be enhanced to merge for ARIA)
 * - Other props: Last one wins
 *
 * @param {...Object} args - Props objects to merge
 * @returns {Object} Merged props object
 *
 * @example
 * const merged = mergeProps(
 *   { onClick: handler1, className: "foo" },
 *   { onClick: handler2, className: "bar" }
 * );
 * // Result: {
 * //   onClick: [chained handler1 & handler2],
 * //   className: "foo bar"
 * // }
 */
export function mergeProps(...args) {
  // Start with a copy of the first argument
  let result = { ...args[0] };

  for (let i = 1; i < args.length; i++) {
    let props = args[i];

    for (let key in props) {
      let a = result[key];
      let b = props[key];

      // Chain event handlers
      // Detect React event handlers: on[A-Z]
      if (
        typeof a === 'function' &&
        typeof b === 'function' &&
        key[0] === 'o' &&
        key[1] === 'n' &&
        key.charCodeAt(2) >= 65 && // 'A'
        key.charCodeAt(2) <= 90    // 'Z'
      ) {
        result[key] = chain(a, b);
      }
      // Concatenate classNames
      else if (
        key === 'className' &&
        typeof a === 'string' &&
        typeof b === 'string'
      ) {
        result[key] = `${a} ${b}`;
      }
      // Merge styles
      else if (
        key === 'style' &&
        typeof a === 'object' &&
        typeof b === 'object' &&
        a !== null &&
        b !== null
      ) {
        result[key] = { ...a, ...b };
      }
      // For everything else, later value wins (or keep existing if b is undefined)
      else {
        result[key] = b !== undefined ? b : a;
      }
    }
  }

  return result;
}

/**
 * Merges multiple refs into a single ref callback
 * Handles both callback refs and ref objects
 *
 * @param {...any} refs - Refs to merge (can be callback refs or ref objects)
 * @returns {Function} Merged ref callback
 *
 * @example
 * const mergedRef = mergeRefs(ref1, ref2, ref3);
 * <div ref={mergedRef} />
 */
export function mergeRefs(...refs) {
  return (value) => {
    for (let ref of refs) {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    }
  };
}
