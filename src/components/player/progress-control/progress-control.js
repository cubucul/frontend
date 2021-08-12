import React from 'react';
import { useSelector } from 'react-redux';
import { secondsToHms } from '../../../utils/time';
import { playerCurrentTimeSelector, playerDurationSelector } from '../../../selectors/player';
import Range from '../../ui/range';
import './progress-control.css';

const ProgressControl = React.forwardRef((_, audio) => {
  const duration = useSelector(playerDurationSelector);
  const currentTime = useSelector(playerCurrentTimeSelector);

  const handleProgressChange = (event) => {
    const time = event.target.value;
    audio.current.currentTime = time;
  };

  return (
    <div className="progress-control">
      <span className="progress-control__time progress-control__time--left">
        {secondsToHms(currentTime)}
      </span>
      <Range
        className="progress-control__range"
        min={0}
        max={duration}
        step={1}
        value={currentTime}
        onChange={handleProgressChange}
      />
      <span className="progress-control__time progress-control__time--right">
        -{secondsToHms(duration - currentTime)}
      </span>
    </div>
  );
});

export default ProgressControl;
