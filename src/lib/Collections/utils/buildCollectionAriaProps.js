import { ROLES_WITH_MULTISELECTABLE } from '../constants/aria-config.js';

/**
 * Build ARIA props for collection container
 *
 * @param {Object} options
 * @param {string} options.role - Collection role from pattern
 * @param {string} options.ariaLabel - Accessible label
 * @param {string} options.ariaLabelledBy - ID of labeling element
 * @param {string} options.ariaDescribedBy - ID of describing element
 * @param {string} options.orientation - 'horizontal' or 'vertical'
 * @param {string} options.selectionMode - 'none', 'single', or 'multiple'
 * @returns {Object} ARIA attributes for collection container
 */
export function buildCollectionAriaProps({
  role,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  orientation,
  selectionMode,
}) {
  const props = {};

  // Add role from pattern
  if (role) {
    props.role = role;
  }

  // Add labels
  if (ariaLabel) {
    props['aria-label'] = ariaLabel;
  }
  if (ariaLabelledBy) {
    props['aria-labelledby'] = ariaLabelledBy;
  }
  if (ariaDescribedBy) {
    props['aria-describedby'] = ariaDescribedBy;
  }

  // Add orientation if specified
  // (Note: orientation defaults are handled elsewhere, this is just explicit override)
  if (orientation) {
    props['aria-orientation'] = orientation;
  }

  // Add aria-multiselectable for roles that support it
  if (selectionMode === 'multiple' && role && ROLES_WITH_MULTISELECTABLE.includes(role)) {
    props['aria-multiselectable'] = true;
  }

  return props;
}
