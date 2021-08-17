import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { playerPlayControl } from '../../../actions/player';
import { playerPlayingSelector, playerEpisodeIdSelector } from '../../../selectors/player';
import Heading from '../../ui/heading';
import Button from '../../ui/button';
import styles from './episode-head.module.css';

const EpisodeHead = (props) => {
  const { podcastId, episodeId, podcastTitle, episodeTitle, coverUrl600, published, url, duration } = props;
  const dispatch = useDispatch();
  const playing = useSelector(playerPlayingSelector);
  const playingEpisodeId = useSelector(playerEpisodeIdSelector);
  const selectedEpisodeData={
    episodeId,
    title: episodeTitle,
    duration,
    published,
    url,
    podcastId,
    podcastTitle,
    coverUrl600
  };
  const buttonText = playing && episodeId === playingEpisodeId ? 'Pause' : 'Play';

  const handleClick = () => dispatch(playerPlayControl(selectedEpisodeData));

  return (
    <div className={styles.head}>
      <img
        className={styles.image}
        src={coverUrl600}
        width="210"
        height="210"
        alt={podcastTitle}
      />
      <Button
        onClick={handleClick}
      >{buttonText}</Button>
      <div className={styles.content}>
        <Link
          className={styles.author}
          to={`/podcast/${podcastId}`}
        >{podcastTitle}</Link>
        <Heading
          className={styles.title}
          size="h5"
        >{episodeTitle}</Heading>
        <p className={styles.published}>{published}</p>
      </div>
    </div>
  );
};

EpisodeHead.propTypes = {
  podcastId: PropTypes.string,
  episodeId: PropTypes.string,
  podcastTitle: PropTypes.string,
  episodeTitle: PropTypes.string,
  coverUrl600: PropTypes.string,
  published: PropTypes.string,
  url: PropTypes.string,
  duration: PropTypes.number
};

export default EpisodeHead;
