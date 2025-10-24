import React from 'react';
import PropTypes from 'prop-types';

const Panel = ({
  children,
  title,
  titleId,
  className = '',
  ...props
}) => {
  const panelTitleId = titleId || `panel-title-${title?.replace(/\s+/g, '-').toLowerCase() || 'untitled'}`;

  return (
    <section
      className={`bg-white rounded-lg p-4 shadow-sm ${className}`}
      aria-labelledby={title ? panelTitleId : undefined}
      {...props}
    >
      {title && (
        <h2 id={panelTitleId} className="text-lg font-semibold mb-4">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
};

Panel.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  titleId: PropTypes.string,
  className: PropTypes.string,
};

export default Panel;
