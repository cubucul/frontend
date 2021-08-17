import React from 'react';
import PropTypes from 'prop-types';
import styles from './episode-notes.module.css';

const EpisodeNotes = ({ description }) => {
  return (
    <pre
      className={styles.notes}
      dangerouslySetInnerHTML={{__html: description}}
    />
  );
};

EpisodeNotes.propTypes = {
  description: PropTypes.string.isRequired
};

export default EpisodeNotes;
