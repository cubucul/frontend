import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as SkipNextIcon } from './skip-next.svg';
import { ReactComponent as SkipPrevIcon } from './skip-prev.svg';
import styles from './skip-control.module.css';

const SkipControl = React.forwardRef(({ value }, audio) => {
  const Icon = value < 0 ? SkipPrevIcon : SkipNextIcon;
  const label = `Skip ${value < 0 ? 'back' : 'forward'}`;

  const onSkip = () => {
    audio.current.currentTime += value;
  };

  return (
    <button
      className={styles.control}
      type="button"
      onClick={onSkip}
      aria-label={label}
    >
      <Icon
        className={styles.icon}
        width="24"
        height="24"
        aria-hidden="true"
      />
    </button>
  );
});

SkipControl.propTypes = {
  value: PropTypes.number.isRequired
};

export default SkipControl;
