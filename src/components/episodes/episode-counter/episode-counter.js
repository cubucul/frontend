import React from 'react';
import PropTypes from 'prop-types';
import './episode-counter.css';

const EpisodeCounter = ({ count }) => {
  const text = count > 1 ? 'episodes' : 'episode';

  return (
    <div className="episode-counter">{count} {text}</div>
  );
};

EpisodeCounter.propTypes = {
  count: PropTypes.number.isRequired
};

export default EpisodeCounter;
