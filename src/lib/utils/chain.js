/**
 * Chains multiple callback functions together
 * Calls all functions in the order they were chained with the same arguments
 *
 * Based on React Aria's chain utility
 * https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/utils/src/chain.ts
 *
 * @param {...Function} callbacks - Functions to chain
 * @returns {Function} A function that calls all callbacks with the same arguments
 *
 * @example
 * const chained = chain(
 *   (e) => console.log('first'),
 *   (e) => console.log('second')
 * );
 * chained(event); // Logs: "first", "second"
 */
export function chain(...callbacks) {
  return (...args) => {
    for (let callback of callbacks) {
      if (typeof callback === 'function') {
        callback(...args);
      }
    }
  };
}
