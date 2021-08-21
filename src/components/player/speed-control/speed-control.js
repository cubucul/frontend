import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { playerPlaybackRateSelector } from '../../../selectors/player';
import { ReactComponent as PlusIcon } from './plus.svg';
import { ReactComponent as MinusIcon } from './minus.svg';
import { ReactComponent as XIcon } from './x.svg';
import './speed-control.css';

const SpeedControl = React.memo(React.forwardRef(({ className }, audio) => {
  const playbackRate = useSelector(playerPlaybackRateSelector);

  const speedControlClass = classNames('speed-control', className);

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
    <div className={speedControlClass}>
      <button
        className="speed-control__button"
        type="button"
        onClick={() => onRateChange(0.1)}
        aria-label="Increase speed"
      >
        <PlusIcon
          className="speed-control__icon"
          width="12"
          height="12"
          aria-hidden="true"
        />
      </button>
      <button
        className="speed-control__toggle"
        type="button"
        onClick={onToggleRateChange}
        aria-label="Change speed"
      >
        <span>{playbackRate}</span>
        <XIcon
          className="speed-control__icon"
          width="12"
          height="12"
          aria-hidden="true"
        />
      </button>
      <button
        className="speed-control__button"
        type="button"
        onClick={() => onRateChange(-0.1)}
        aria-label="Decrease speed"
      >
        <MinusIcon
          className="speed-control__icon"
          width="12"
          height="12"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}));

SpeedControl.propTypes = {
  className: PropTypes.string
};

export default SpeedControl;
