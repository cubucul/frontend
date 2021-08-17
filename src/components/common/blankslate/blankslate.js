import React from 'react';
import PropTypes from 'prop-types';
import Heading from '../../ui/heading';
import styles from './blankslate.module.css';

const Blankslate = ({ title, text }) => {
  return (
    <div className={styles.blankslate}>
      <div className={styles.title}>
        <Heading size="h5">{title}</Heading>
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

Blankslate.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default Blankslate;
