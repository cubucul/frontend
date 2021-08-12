import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './range.css';

const Range = ({ min, max, step, value, onChange, className }) => {
  const rangeClass = classNames('range', className);

  return (
    <input
      className={rangeClass}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
    />
  );
};

Range.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default Range;
