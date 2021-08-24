import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import * as actions from '../../actions/player';
import * as selectors from '../../selectors/player';
import SkipControl from './skip-control';
import SpeedControl from './speed-control';
import VolumeControl from './volume-control';
import ProgressControl from './progress-control';
import PlayControl from '../common/play-control';
import { ReactComponent as PopoverClosedIcon } from './popover.svg';
import { ReactComponent as PopoverExpandedIcon } from './popover-expanded.svg';
import './player.css';

const Player = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const audio = useRef();
  const dispatch = useDispatch();
  const isShowing = useSelector(selectors.playerIsShowingSelector);
  const isLoading = useSelector(selectors.playerIsLoadingSelector);
  const isPlaying = useSelector(selectors.playerIsPlayingSelector);
  const url = useSelector(selectors.playerUrlSelector);
  const title = useSelector(selectors.playerTitleSelector);
  const coverUrl600 = useSelector(selectors.playerCoverUrl600Selector);
  const currentTime = useSelector(selectors.playerCurrentTimeSelector);
  const isMuted = useSelector(selectors.playerIsMutedSelector);
  const podcastId = useSelector(selectors.playerPodcastIdSelector);
  const podcastTitle = useSelector(selectors.playerPodcastTitleSelector);
  const episodeId = useSelector(selectors.playerEpisodeIdSelector);
  const canPlay = useSelector(selectors.playerCanPlaySelector);

  const popoverLabelText = isExpanded ? 'Minify player' : 'Expand player';
  const PopoverIcon = isExpanded ? PopoverExpandedIcon : PopoverClosedIcon;

  const playerClass = classNames('player', {
    'player--full': isExpanded,
    'player--mini': !isExpanded
  });

  const togglePlayerView = () => setIsExpanded((v) => !v);

  const setCurrentTime = (value) => {
    audio.current.currentTime = value;
  };

  const onCanPlay = () => {
    if (!canPlay) {
      setCurrentTime(currentTime);
      dispatch(actions.playerCanPlay());
    }
  };

  const onTimeUpdate = () => {
    if (canPlay) {
      const time = Math.round(audio.current.currentTime);
      if (time !== currentTime) {
        dispatch(actions.playerUpdateTime(episodeId, time));
      }
    }
  };

  const onVolumeChange = () => {
    const { volume, muted: audioMuted } = audio.current;

    if (audioMuted !== isMuted) {
      dispatch(actions.playerToggleMute());
    } else {
      dispatch(actions.playerChangeVolume(volume));
    }
  };

  const onRateChange = () => {
    const value = audio.current.playbackRate;
    dispatch(actions.playerChangePlaybackRate(value));
  };

  const onEnded = () => {
    dispatch(actions.playerEpisodeEnded(episodeId));
  };

  useEffect(() => {
    if (isShowing && canPlay) {
      if (isPlaying) {
        audio.current.play();
      } else {
        audio.current.pause();
      }
    }
  }, [isShowing, canPlay, isPlaying]);

  useEffect(() => {
    if (url) {
      // Safari fix
      audio.current.play();
    }
  }, [url]);

  if (!isShowing) {
    return null;
  }

  return (
    <div className={playerClass}>
      {
        canPlay &&
          <button
            className="player__popover"
            type="button"
            onClick={togglePlayerView}
            aria-label={popoverLabelText}
          >
            <PopoverIcon
              className="player__popover-icon"
              width="38"
              height="17"
              aria-hidden="true"
            />
          </button>
      }
      <audio
        ref={audio}
        src={url}
        onCanPlay={onCanPlay}
        onTimeUpdate={onTimeUpdate}
        onVolumeChange={onVolumeChange}
        onRateChange={onRateChange}
        onEnded={onEnded}
        preload="metadata"
        autoPlay={false}
      />
      { isLoading ?
        <p className="player__spinner">Loading...</p>
        :
        <div className="player__inner">
          <img
            className="player__image"
            src={coverUrl600}
            width="72"
            height="72"
            alt={`Podcast ${podcastTitle} cover`}
          />
          <div className="player__play-controls">
            <SkipControl ref={audio} value={-15} />
            <PlayControl
              theme="player"
              size="big"
              selectedEpisodeData={{
                episodeId
              }}
            />
            <SkipControl ref={audio} value={30} />
          </div>
          <div className="player__controls">
            <div className="player__info">
              <h3 className="player__title">
                <Link
                  className="player__title-link"
                  to={`/podcast/${podcastId}/${episodeId}`}
                  onClick={togglePlayerView}
                >
                  {title}
                </Link>
              </h3>
              <Link
                className="player__author"
                to={`/podcast/${podcastId}`}
                onClick={togglePlayerView}
              >
                {podcastTitle}
              </Link>
            </div>
            <ProgressControl ref={audio} />
          </div>
          <SpeedControl ref={audio} className="player__speed" />
          <VolumeControl ref={audio} className="player__volume" />
        </div>
      }
    </div>
  );
};

export default Player;
