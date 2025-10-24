/**
 * Flattens nested aria and data props into standard HTML attributes
 *
 * @param {Object} props - Props object containing aria, data, and other properties
 * @returns {Object} Flattened props object
 *
 * @example
 * flattenProps({
 *   id: 'button',
 *   aria: { expanded: true, controls: 'menu-1' },
 *   data: { testid: 'trigger' }
 * })
 * // Returns: { id: 'button', 'aria-expanded': true, 'aria-controls': 'menu-1', 'data-testid': 'trigger' }
 */
export const flattenProps = (props) => {
  const { aria = {}, data = {}, ...restProps } = props;

  // Flatten aria attributes
  const ariaProps = Object.keys(aria).reduce((acc, key) => {
    const ariaKey = key.startsWith('aria-') ? key : `aria-${key}`;
    acc[ariaKey] = aria[key];
    return acc;
  }, {});

  // Flatten data attributes
  const dataProps = Object.keys(data).reduce((acc, key) => {
    const dataKey = key.startsWith('data-') ? key : `data-${key}`;
    acc[dataKey] = data[key];
    return acc;
  }, {});

  return {
    ...restProps,
    ...ariaProps,
    ...dataProps,
  };
};