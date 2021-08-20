import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './range.css';

const Range = ({ min, max, step, value, onChange, className }) => {
  const rangeRef = useRef();
  const rangeClass = classNames('range', className);

  const setProgress = (min, max, value) => {
    rangeRef.current.style.backgroundSize = (value - min) * 100 / (max - min) + '% 100%';
  };

  useEffect(() => {
    setProgress(min, max, value);
  }, [min, max, value]);

  return (
    <input
      ref={rangeRef}
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
