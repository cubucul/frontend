import React from 'react';
import { useSelector } from 'react-redux';
import { playerPlaybackRateSelector } from '../../../selectors/player';
import { ReactComponent as PlusIcon } from './plus.svg';
import { ReactComponent as MinusIcon } from './minus.svg';
import { ReactComponent as XIcon } from './x.svg';
import styles from './speed-control.module.css';

const SpeedControl = React.forwardRef((_, audio) => {
  const playbackRate = useSelector(playerPlaybackRateSelector);

  const onRateChange = (value) => {
    const oldValue = +audio.current.playbackRate;
    const delta = +value;
    const result = (oldValue + delta).toFixed(1);
    audio.current.playbackRate = result;
  };

  const onToggleRateChange = () => {
    let result;

    if (playbackRate < 1) {
      result = 1;
    } else if (playbackRate >= 1 && playbackRate < 1.5) {
      result = 1.5;
    } else if (playbackRate >= 1.5 && playbackRate < 2) {
      result = 2;
    } else if (playbackRate >= 2) {
      result = 1;
    }

    audio.current.playbackRate = result;
  };

  return (
    <div className={styles.control}>
      <button
        className={styles.button}
        type="button"
        onClick={() => onRateChange(0.1)}
        aria-label="Increase speed"
      >
        <PlusIcon
          className={styles.icon}
          width="12"
          height="12"
          aria-hidden="true"
        />
      </button>
      <button
        className={styles.toggle}
        type="button"
        onClick={onToggleRateChange}
        aria-label="Change speed"
      >
        <span>{playbackRate}</span>
        <XIcon
          className={styles.icon}
          width="12"
          height="12"
          aria-hidden="true"
        />
      </button>
      <button
        className={styles.button}
        type="button"
        onClick={() => onRateChange(-0.1)}
        aria-label="Decrease speed"
      >
        <MinusIcon
          className={styles.icon}
          width="12"
          height="12"
          aria-hidden="true"
        />
      </button>
    </div>
  );
});

export default SpeedControl;
