import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { secondsToString } from '../../../utils/time';
import PlayControl from '../../common/play-control';
import styles from './episode-card.module.css';

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
  const titleClass = classNames(styles.title, {
    [styles.regular]: noPodcastLink
  });

  const getEpisodeIndex = () => {
    let index = '';

    if (season) {
      index += `S${season} `;
    }

    if (number) {
      index += `E${number}`;
    }

    if (episodeType && episodeType !== 'full') {
      index = episodeType.toUpperCase();
    }

    return index;
  };

  const episodeIndex = getEpisodeIndex();
  const episodeCardClass = classNames(styles.card, {
    [styles.noIndex]: noImage && !episodeIndex,
    [styles.withImage]: !noImage
  });

  return (
    <div className={episodeCardClass}>
      { !noImage &&
        <div className={styles.cover}>
          <Image
            src={coverUrl600}
            width="60"
            height="60"
            alt={title}
          />
        </div>
      }
      { noImage && episodeIndex &&
        <span className={styles.index}>{episodeIndex}</span>
      }
      <div className={styles.heading}>
        <h3 className={titleClass}>
          <Link href={`/podcast/${podcastId}/${episodeId}`}>
            <a className={styles.link}>{title}</a>
          </Link>
        </h3>
      </div>
      <p className={styles.published}>{published}</p>
      <span className={styles.duration}>
        {secondsToString(duration)}
      </span>
      <div className={styles.control}>
        <PlayControl
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
