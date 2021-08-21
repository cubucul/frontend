import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEpisodeArchived } from '../../../selectors/history';
import { secondsToString } from '../../../utils/time';
import { getEpisodeIndex } from '../../../utils/helpers';
import PlayControl from '../../common/play-control';
import './episode-card.css';

const EpisodeCard = ({ episodeData, noImage, noPodcastLink }) => {
  const {
    podcastId,
    episodeId,
    title,
    podcastTitle,
    coverUrl600,
    duration,
    published,
    url,
    season,
    number,
    episodeType
  } = episodeData;
  const isArchived = useSelector((state) => isEpisodeArchived(state, episodeId));

  const titleClass = classNames('episode-card__title', {
    'episode-card__title--regular': noPodcastLink
  });

  const episodeIndex = getEpisodeIndex(season, number, episodeType);
  const episodeCardClass = classNames('episode-card', {
    'episode-card--noindex': noImage && !episodeIndex,
    'episode-cart--with-image': !noImage,
    'episode-card--archived': isArchived
  });

  return (
    <div className={episodeCardClass}>
      { !noImage &&
        <img
          className="episode-card__image"
          src={coverUrl600}
          width="60"
          height="60"
          alt={title}
        />
      }
      { noImage && episodeIndex &&
        <span className="episode-card__index">{episodeIndex}</span>
      }
      <h3 className={titleClass}>
        <Link
          className="episode-card__link"
          to={`/podcast/${podcastId}/${episodeId}`}
        >{title}</Link>
      </h3>
      <p className="episode-card__published">{published}</p>
      <span className="episode-card__duration">
        {secondsToString(duration)}
      </span>
      <PlayControl
        isArchived={isArchived}
        className="episode-card__control"
        selectedEpisodeData={{
          episodeId,
          title,
          duration,
          published,
          url,
          podcastId,
          podcastTitle,
          coverUrl600
        }}
      />
    </div>
  );
};

EpisodeCard.propTypes = {
  noImage: PropTypes.bool,
  noPodcastLink: PropTypes.bool,
  episodeData: PropTypes.shape({
    podcastId: PropTypes.string,
    episodeId: PropTypes.string,
    title: PropTypes.string,
    podcastTitle: PropTypes.string,
    coverUrl600: PropTypes.string,
    duration: PropTypes.number,
    published: PropTypes.string,
    url: PropTypes.string,
    season: PropTypes.number,
    number: PropTypes.number,
    episodeType: PropTypes.string
  })
};

export default EpisodeCard;
