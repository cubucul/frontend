import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { playerPlayControl } from '../../../actions/player';
import { playerPlayingSelector, playerEpisodeIdSelector } from '../../../selectors/player';
import { selectCurrentTimeById } from '../../../selectors/history';
import ProgressRing from '../../ui/progress-ring';
import { ReactComponent as PlayIcon } from './play.svg';
import { ReactComponent as PauseIcon } from './pause.svg';
import { ReactComponent as CheckIcon } from './check.svg';
import './play-control.css';

const PlayControl = ({ selectedEpisodeData, theme, size, isArchived, className }) => {
  const { episodeId: selectedEpisodeId, duration } = selectedEpisodeData;

  const dispatch = useDispatch();
  const playing = useSelector(playerPlayingSelector);
  const episodeId = useSelector(playerEpisodeIdSelector);
  const currentTime = useSelector((state) => selectCurrentTimeById(state, selectedEpisodeId));

  const percent = currentTime / duration * 100 || 0;

  const type = playing && episodeId === selectedEpisodeId ? 'pause' : 'play';
  const Icon = isArchived ? CheckIcon : (type === 'play' ? PlayIcon : PauseIcon);
  const label = `${type === 'play' ? 'Play' : 'Pause'} episode`;

  const playControlClass = classNames('play-control', {
    'play-control--theme--fill': theme === 'fill',
    'play-control--theme--player': theme === 'player',
    'play-control--size--big': size === 'big',
    'play-control--archived': isArchived
  }, className);
  const playControlIconClass = classNames('play-control__icon', {
    'play-control__icon--play': type === 'play',
    'play-control__icon--check': isArchived
  });

  const handleClick = () => dispatch(playerPlayControl(selectedEpisodeData));

  return (
    <button
      className={playControlClass}
      type="button"
      onClick={handleClick}
      aria-label={label}
    >
      <ProgressRing
        className="play-control__progress"
        percent={percent}
      />
      <Icon
        className={playControlIconClass}
        width="14"
        height="14"
        aria-hidden="true"
      />
    </button>
  );
};

PlayControl.propTypes = {
  selectedEpisodeData: PropTypes.exact({
    podcastId: PropTypes.string,
    episodeId: PropTypes.string,
    podcastTitle: PropTypes.string,
    title: PropTypes.string,
    duration: PropTypes.number,
    published: PropTypes.string,
    url: PropTypes.string,
    coverUrl600: PropTypes.string
  }),
  theme: PropTypes.string,
  size: PropTypes.string,
  isArchived: PropTypes.bool,
  className: PropTypes.string
};

export default PlayControl;
