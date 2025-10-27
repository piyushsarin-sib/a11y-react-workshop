/**
 * Build ARIA props for collection container
 *
 * @param {Object} options
 * @param {string} options.role - Collection role from pattern
 * @param {string} options.ariaLabel - Accessible label
 * @param {string} options.ariaLabelledBy - ID of labeling element
 * @param {string} options.ariaDescribedBy - ID of describing element
 * @returns {Object} ARIA attributes for collection container
 */
export function buildCollectionAriaProps({ role, ariaLabel, ariaLabelledBy, ariaDescribedBy }) {
  const props = {};

  // Add role from pattern
  if (role) {
    props.role = role;
  }

  // Add labels
  if (ariaLabel) {
    props["aria-label"] = ariaLabel;
  }
  if (ariaLabelledBy) {
    props["aria-labelledby"] = ariaLabelledBy;
  }
  if (ariaDescribedBy) {
    props["aria-describedby"] = ariaDescribedBy;
  }

  return props;
}
