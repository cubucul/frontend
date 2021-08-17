import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PodcastCard from '../podcast-card';
import styles from './podcasts-grid.module.css';

const PodcastsGrid = ({ podcasts, withoutInfo, showCounter }) => {
  const itemClass = classNames({
    [styles.withCounter]: showCounter
  });

  return (
    <ul className={styles.grid}>
      {
        podcasts.map((podcast, index) => {
          return (
            <li key={podcast.id} className={itemClass}>
              {
                showCounter &&
                  <span className={styles.counter}>{index + 1}</span>
                }
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
  withoutInfo: PropTypes.bool,
  showCounter: PropTypes.bool
};

export default PodcastsGrid;
