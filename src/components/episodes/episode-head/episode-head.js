import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { playerPlayControl } from '../../../actions/player';
import { playerPlayingSelector, playerEpisodeIdSelector } from '../../../selectors/player';
import Heading from '../../ui/heading';
import Button from '../../ui/button';
import './episode-head.css';

const EpisodeHead = (props) => {
  const {
    podcastId, episodeId, podcastTitle, episodeTitle, coverUrl600, published, url, duration
  } = props;
  const dispatch = useDispatch();
  const playing = useSelector(playerPlayingSelector);
  const playingEpisodeId = useSelector(playerEpisodeIdSelector);
  const selectedEpisodeData = {
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
    <div className="episode-head">
      <img
        className="episode-head__image"
        src={coverUrl600}
        width="210"
        height="210"
        alt={podcastTitle}
      />
      <Button
        className="episode-head__play-button"
        onClick={handleClick}
      >{buttonText}</Button>
      <div className="episode-head__content">
        <Link
          className="episode-head__author"
          to={`/podcast/${podcastId}`}
        >{podcastTitle}</Link>
        <Heading
          className="episode-head__title"
          size="h5"
        >{episodeTitle}</Heading>
        <p className="episode-head__published">{published}</p>
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
