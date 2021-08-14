import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './podcast-card.css';

const PodcastCard = ({ id, title, author, coverUrl100, coverUrl600 }) => {
  return (
    <Link
      className="podcast-card"
      to={`/podcast/${id}`}
    >
      <img
        className="podcast-card__image"
        src={coverUrl100 || coverUrl600}
        width="131"
        height="131"
        alt={title}
      />
      <div>
        <h3 className="podcast-card__title">{title}</h3>
        <p className="podcast-card__author">{author}</p>
      </div>
    </Link>
  );
};

PodcastCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  coverUrl100: PropTypes.string,
  coverUrl600: PropTypes.string
};

export default PodcastCard;
