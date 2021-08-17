import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { secondsToHms } from '../../../utils/time';
import { playerCurrentTimeSelector, playerDurationSelector } from '../../../selectors/player';
import Range from '../../ui/range';
import styles from './progress-control.module.css';

const ProgressControl = React.forwardRef((_, audio) => {
  const duration = useSelector(playerDurationSelector);
  const currentTime = useSelector(playerCurrentTimeSelector);

  const handleProgressChange = (event) => {
    const time = event.target.value;
    audio.current.currentTime = time;
  };

  const timeLeftClass = classNames(styles.time, styles.timeLeft);
  const timeRightClass = classNames(styles.time, styles.timeRight);

  return (
    <div className={styles.control}>
      <span className={timeLeftClass}>
        {secondsToHms(currentTime)}
      </span>
      <Range
        className={styles.range}
        min={0}
        max={duration}
        step={1}
        value={currentTime}
        onChange={handleProgressChange}
      />
      <span className={timeRightClass}>
        -{secondsToHms(duration - currentTime)}
      </span>
    </div>
  );
});

export default ProgressControl;
