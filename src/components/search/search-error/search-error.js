import React from 'react';
import styles from './search-error.module.css';

const SearchError = () => {
  return (
    <div className={styles.error}>
      <h3 className={styles.title}>No podcasts found</h3>
      <p className={styles.text}>Try more general, or different, keywords</p>
    </div>
  );
};

export default SearchError;
