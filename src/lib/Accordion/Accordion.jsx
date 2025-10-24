import React from 'react';
import Collection from './Collection';
import { useExpansion } from './hooks/useExpansion';
import './Accordion.css';

/**
 * Accordion component built with Collection and useExpansion
 * Supports both controlled and uncontrolled usage
 */
const Accordion = ({
  // Controlled props
  expanded: controlledExpanded,
  onExpandedChange,

  // Uncontrolled props
  defaultExpanded,

  // Accordion behavior
  allowMultiple = false,
  collapsible = true,

  // Collection props
  className = '',
  children,
  ...props
}) => {
  // Use expansion hook for state management
  const expansion = useExpansion({
    expanded: controlledExpanded,
    onExpandedChange,
    defaultExpanded,
    allowMultiple,
    collapsible,
  });

  return (
    <Collection
      pattern="tree"
      role="group"
      className={`accordion ${className}`}
      as="div"
      itemAs="div"
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (child.type === Accordion.Item) {
          const itemKey = child.props.itemKey || child.key || `accordion-item-${index}`;

          return React.cloneElement(child, {
            itemKey,
            expanded: expansion.expanded.has(itemKey),
            onToggle: () => expansion.toggle(null, { key: itemKey }),
            getItemProps: expansion.getItemProps,
            getToggleProps: expansion.getToggleProps,
          });
        }
        return child;
      })}
    </Collection>
  );
};

/**
 * Accordion Item component
 */
Accordion.Item = ({
  children,
  title,
  itemKey,
  expanded = false,
  onToggle,
  disabled = false,
  // headerAs = 'button', // Currently unused
  onClick, // Custom click handler
  getItemProps, // From useExpansion
  // getToggleProps, // From useExpansion - currently unused
  className = '',
  ...props
}) => {
  const [titleContent, bodyContent] = React.Children.toArray(children);
  const content = bodyContent || titleContent;

  return (
    <Collection.Item
      key={itemKey}
      className={`accordion-item ${expanded ? 'expanded' : ''} ${className}`}
      {...props}
    >
      <HeaderElement
        className="accordion-header"
        {...(getItemProps ? getItemProps(itemKey, {
          hasChildren: true,
          onClick,
          disabled
        }) : {
          'aria-expanded': expanded,
          onClick: (e) => {
            onToggle?.();
            onClick?.(e, { key: itemKey });
          },
          disabled
        })}
      >
        <span className="accordion-title">{title}</span>
        <span className={`accordion-icon ${expanded ? 'expanded' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4.427 9.573L8 6l3.573 3.573a.5.5 0 0 0 .854-.353V4.5a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5v4.72a.5.5 0 0 0 .854.353z"/>
          </svg>
        </span>
      </HeaderElement>

      {expanded && (
        <div className="accordion-content" role="region" aria-labelledby={`header-${itemKey}`}>
          <div className="accordion-body">
            {content}
          </div>
        </div>
      )}
    </Collection.Item>
  );
};

// Separate toggle button component for more complex layouts
Accordion.ToggleButton = ({
  itemKey,
  expanded = false,
  onToggle,
  getToggleProps,
  children,
  'aria-label': ariaLabel,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`accordion-toggle ${className}`}
      {...(getToggleProps ? getToggleProps(itemKey, {
        'aria-label': ariaLabel || `Toggle ${itemKey}`,
        ...props
      }) : {
        type: 'button',
        'aria-expanded': expanded,
        'aria-label': ariaLabel || `Toggle ${itemKey}`,
        onClick: (e) => {
          e.stopPropagation();
          onToggle?.();
        },
        ...props
      })}
    >
      {children || (
        <span className={`accordion-icon ${expanded ? 'expanded' : ''}`}>
          {expanded ? '▼' : '▶'}
        </span>
      )}
    </button>
  );
};

export default Accordion;