import React from 'react';
import PropTypes from 'prop-types';
import styles from './episode-list.module.css';

export const EpisodeList = ({ children }) => (
  <ul className={styles.list}>{children}</ul>
);

export const EpisodeListItem = ({ children }) => (
  <li className={styles.item}>{children}</li>
);

EpisodeList.propTypes = {
  children: PropTypes.node.isRequired
};

EpisodeListItem.propTypes = {
  children: PropTypes.node.isRequired
};
