import React from 'react';
import PropTypes from 'prop-types';
import PodcastCard from '../podcast-card';
import './podcasts-grid.css';

const PodcastsGrid = ({ podcasts, withoutInfo }) => {
  return (
    <ul className="podcasts-grid">
      {
        podcasts.map((podcast) => {
          return (
            <li key={podcast.id}>
              <PodcastCard {...podcast} withoutInfo={withoutInfo} />
            </li>
          );
        })
      }
    </ul>
  );
}

PodcastsGrid.propTypes = {
  podcasts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      coverUrl100: PropTypes.string,
      coverUrl600: PropTypes.string
    })
  ),
  withoutInfo: PropTypes.bool
};

export default PodcastsGrid;
