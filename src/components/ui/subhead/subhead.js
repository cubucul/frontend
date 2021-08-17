import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './subhead.module.css';

const Subhead = ({ children, topSpace = false, bottomSpace = true }) => {
  const subheadClass = classNames({
    [styles.topSpace]: topSpace,
    [styles.bottomSpace]: bottomSpace
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
