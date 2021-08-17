import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './subhead.css';

const Subhead = ({ children, topSpace = false, bottomSpace = true }) => {
  const subheadClass = classNames('subhead', {
    'subhead--top-space': topSpace,
    'subhead--bottom-space': bottomSpace
  });

  return (
    <div className={subheadClass}>
      {children}
    </div>
  );
};

Subhead.propTypes = {
  children: PropTypes.node.isRequired,
  topSpace: PropTypes.bool,
  bottomSpace: PropTypes.bool
};

export default Subhead;
