import React from 'react';
import PropTypes from 'prop-types';
import { PLACEMENTS } from '../constants';

const OverlayContent = React.forwardRef(({
  bodyId,
  className,
  overlayStyles,
  position,
  placement,
  pattern,
  triggerId,
  backdrop,
  children,
  close,
  open,
  toggle,
}, ref) => {
  // Determine ARIA role based on pattern
  const getRole = () => {
    if (placement === PLACEMENTS.CENTER || backdrop) return 'dialog';
    switch (pattern) {
      case 'menu': return 'menu';
      case 'dialog': return 'dialog';
      case 'modal': return 'dialog';
      case 'tooltip': return 'tooltip';
      default: return 'region';
    }
  };

  return (
    <div
      ref={ref}
      id={bodyId}
      className={className}
      style={{
        ...overlayStyles,
        ...(placement !== PLACEMENTS.CENTER && {
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }),
      }}
      role={getRole()}
      aria-labelledby={triggerId}
      aria-modal={backdrop || placement === PLACEMENTS.CENTER ? 'true' : undefined}
      tabIndex={-1}
    >
      {React.Children.map(children, (child) => {
        return React.isValidElement(child)
          ? React.cloneElement(child, {
              ...child.props,
              ...(typeof child?.type !== 'string' && { close, open, toggle }),
            })
          : child;
      })}
    </div>
  );
});

OverlayContent.displayName = 'OverlayContent';

OverlayContent.propTypes = {
  bodyId: PropTypes.string,
  className: PropTypes.string,
  overlayStyles: PropTypes.object,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  placement: PropTypes.oneOf(Object.values(PLACEMENTS)),
  pattern: PropTypes.string,
  triggerId: PropTypes.string,
  backdrop: PropTypes.bool,
  children: PropTypes.node,
  close: PropTypes.func,
  open: PropTypes.func,
  toggle: PropTypes.func,
};

export default OverlayContent;