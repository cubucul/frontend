import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'next/link';
import classNames from 'classnames';
import * as actions from '../../actions/player';
import * as selectors from '../../selectors/player';
import SkipControl from './skip-control';
import SpeedControl from './speed-control';
import VolumeControl from './volume-control';
import ProgressControl from './progress-control';
import PlayControl from '../common/play-control';
import { ReactComponent as PopoverClosedIcon } from './popover.svg'
import { ReactComponent as PopoverExpandedIcon } from './popover-expanded.svg'
import styles from './player.module.css';

const Player = () => {
  const [expanded, setExpanded] = useState(false);
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
  const canPlay = useSelector(selectors.playerCanPlaySelector);

  const popoverLabelText = expanded ? 'Minify player' : 'Expand player';
  const PopoverIcon = expanded ? PopoverExpandedIcon : PopoverClosedIcon;

  const playerClass = classNames(styles.player, {
    [styles.full]: expanded,
    [styles.mini]: !expanded
  });


  const togglePlayerView = () => setExpanded(v => !v);

  const setCurrentTime = (value) => {
    audio.current.currentTime = value;
  };

  const onPlay = () => {
    dispatch(actions.playerPlay());
  };

  const onCanPlay = () => {
    if (!canPlay) {
      setCurrentTime(currentTime);
    }
    dispatch(actions.playerCanPlay());
    onPlay();
  };

  const onPause = () => {
    dispatch(actions.playerPause());
  };

  const onTimeUpdate = () => {
    if (canPlay) {
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
    if (show && canPlay) {
      if (playing) {
        audio.current.play();
      } else {
        audio.current.pause();
      }
    }
  }, [show, canPlay, playing]);

  useEffect(() => {
    if (url) {
      // Safari fix
      audio.current.play();
    }
  }, [url]);

  if (!show) {
    return null;
  }

  return (
    <div className={playerClass}>
      <div className={styles.widget}>
        {
          canPlay &&
            <button
              className={styles.popover}
              type="button"
              onClick={togglePlayerView}
              aria-label={popoverLabelText}
            >
              <PopoverIcon
                className={styles.popoverIcon}
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
          onPlay={onPlay}
          onPause={onPause}
          onTimeUpdate={onTimeUpdate}
          onVolumeChange={onVolumeChange}
          onRateChange={onRateChange}
          onEnded={onEnded}
          preload="metadata"
          autoPlay={false}
        />
        { loading ?
          <p className={styles.spinner}>Loading...</p>
          :
          <div className={styles.inner}>
            <img
              className={styles.image}
              src={coverUrl600}
              width="72"
              height="72"
              alt={`Podcast ${podcastTitle} cover`}
            />
            <div className={styles.playControls}>
              <SkipControl ref={audio} value={-15} />
              <PlayControl
                theme="fill"
                selectedEpisodeData={{
                  episodeId
                }}
              />
              <SkipControl ref={audio} value={30} />
            </div>
            <div className={styles.controls}>
              <div className={styles.info}>
                <h3 className={styles.title}>
                  <Link
                    href={`/podcast/${podcastId}/${episodeId}`}
                  >
                    <a className={styles.titleLink}>{title}</a>
                  </Link>
                </h3>
                <Link
                  href={`/podcast/${podcastId}`}
                >
                  <a className={styles.author}>{podcastTitle}</a>
                </Link>
              </div>
              <ProgressControl ref={audio} />
            </div>
            <div className={styles.speed}>
              <SpeedControl ref={audio} />
            </div>
            <div className={styles.volume}>
              <VolumeControl ref={audio} />
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default Player;
