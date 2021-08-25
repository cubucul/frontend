import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './progress-ring.css';

const ProgressRing = ({ percent, isArchived, className }) => {
  const radius = 16;
  const stroke = 2;
  const normalizedRadius = radius - stroke / 2;
  const circumference = Math.round(normalizedRadius * stroke * Math.PI);
  const offset = Math.round(circumference - percent / 100 * circumference);

  const progressRingClass = classNames('progress-ring', className);

  if (percent === 0 || isArchived) {
    return null;
  }

  return (
    <svg
      className={progressRingClass}
      width={radius * 2}
      height={radius * 2}
      aria-hidden="true"
    >
      <circle
        className="progress-ring__progress"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

ProgressRing.propTypes = {
  percent: PropTypes.number.isRequired,
  isArchived: PropTypes.bool,
  className: PropTypes.string
};

export default ProgressRing;
