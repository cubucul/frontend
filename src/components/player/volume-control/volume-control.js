import React from 'react';
import { useSelector } from 'react-redux';
import { playerMutedSelector, playerVolumeSelector } from '../../../selectors/player';
import Range from '../../ui/range';
import { ReactComponent as Volume2Icon } from './volume-2.svg';
import { ReactComponent as Volume1Icon } from './volume-1.svg';
import { ReactComponent as VolumeIcon } from './volume.svg';
import { ReactComponent as VolumeXIcon } from './volume-x.svg';
import styles from './volume-control.module.css';

const VolumeControl = React.forwardRef((_, audio) => {
  const volume = useSelector(playerVolumeSelector);
  const muted = useSelector(playerMutedSelector);
  const Icon = muted ? VolumeXIcon : volume > 0.6 ?
    Volume2Icon : volume > 0.3 ?
    Volume1Icon : volume === 0 ? VolumeXIcon : VolumeIcon;

  const onMuteToggle = () => {
    audio.current.muted = !muted;
  };

  const onVolumeChange = (event) => {
    const volume = event.target.value;
    audio.current.volume = volume;
  };

  return (
    <div className={styles.control}>
      <button
        className={styles.button}
        type="button"
        aria-label={muted ? 'Unmute' : 'Mute'}
        onClick={onMuteToggle}
      >
        <Icon
          className={styles.icon}
          width="24"
          height="24"
          aria-hidden="true"
        />
      </button>
      <Range
        min={0}
        max={1}
        step={0.1}
        value={volume}
        onChange={onVolumeChange}
      />
    </div>
  );
});

export default VolumeControl;
