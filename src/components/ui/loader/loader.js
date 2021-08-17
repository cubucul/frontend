import React from 'react';
import { ReactComponent as LoaderIcon } from './loader.svg';
import styles from './loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <LoaderIcon
        className={styles.icon}
        width="24"
        height="24"
        aria-hidden="true"
      />
      <span className={styles.text}>Loading...</span>
    </div>
  );
};

export default Loader;
