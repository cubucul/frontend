import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './podcast-card.module.css';

const PodcastCard = ({ id, title, author, coverUrl100, coverUrl600, withoutInfo }) => {
  const infoClass = classNames({
    [styles.withoutInfo]: withoutInfo
  });

  return (
    <Link
      className={styles.card}
      to={`/podcast/${id}`}
    >
      <img
        className={styles.image}
        src={coverUrl100 || coverUrl600}
        width="131"
        height="131"
        alt={title}
      />
      <div className={infoClass}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.author}>{author}</p>
      </div>
    </Link>
  );
};

PodcastCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  coverUrl100: PropTypes.string,
  coverUrl600: PropTypes.string,
  withoutInfo: PropTypes.bool
};

export default PodcastCard;
