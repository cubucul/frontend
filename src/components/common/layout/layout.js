import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header';
import Player from '../../player';
import styles from './layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.app}>
      <Header />
      <main>
        {children}
      </main>
      <Player />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
