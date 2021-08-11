import React, { useRef, useEffect } from 'react';
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
import './player.css';

const Player = () => {
  const audio = useRef();
  const dispatch = useDispatch();
  const show = useSelector(selectors.playerShowSelector);
  const loading = useSelector(selectors.playerLoadingSelector);
  const playing = useSelector(selectors.playerPlayingSelector);
  const url = useSelector(selectors.playerUrlSelector);
  const title = useSelector(selectors.playerTitleSelector);
  const coverUrl600 = useSelector(selectors.playerCoverUrl600Selector);
  const currentTime = useSelector(selectors.playerCurrentTimeSelector);
  const muted = useSelector(selectors.playerMutedSelector);
  const podcastId = useSelector(selectors.playerPodcastIdSelector);
  const podcastTitle = useSelector(selectors.playerPodcastTitleSelector);
  const episodeId = useSelector(selectors.playerEpisodeIdSelector);

  const playerClass = classNames('player', 'player--mini');

  const onCanPlayThrough = () => {
    dispatch(actions.playerCanPlayThrough());
  };

  const onPlay = () => {
    audio.current.currentTime = currentTime;
  };

  const onPause = () => {
    dispatch(actions.playerPause());
  };

  const onTimeUpdate = () => {
    if (!loading) {
      const time = Math.round(audio.current.currentTime);
      dispatch(actions.playerUpdateTime(episodeId, time));
    }
  };

  const onVolumeChange = () => {
    const { volume, muted: audioMuted } = audio.current;

    if (audioMuted !== muted) {
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
    dispatch(actions.playerEpisodeEnded());
  };

  useEffect(() => {
    if (show && !loading && playing) {
      audio.current.play();
    } else if (show && !loading && !playing) {
      audio.current.pause();
    }
  }, [show, loading, playing]);

  if (!show) {
    return null;
  }

  return (
    <div className={playerClass}>
      <audio
        ref={audio}
        src={url}
        onCanPlayThrough={onCanPlayThrough}
        onPlay={onPlay}
        onPause={onPause}
        onTimeUpdate={onTimeUpdate}
        onVolumeChange={onVolumeChange}
        onRateChange={onRateChange}
        onEnded={onEnded}
      />
      { loading ?
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
              theme="fill"
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
                >
                  {title}
                </Link>
              </h3>
              <Link
                className="player__author"
                to={`/podcast/${podcastId}`}
              >
                {podcastTitle}
              </Link>
            </div>
            <ProgressControl ref={audio} />
          </div>
          <div className="player__speed">
            <SpeedControl ref={audio} />
          </div>
          <div className="player__volume">
            <VolumeControl ref={audio} />
          </div>
        </div>
      }
    </div>
  );
};

export default Player;
