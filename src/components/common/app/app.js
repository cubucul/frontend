import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header';
import Player from '../../player';
import styles from './app.module.css';

const App = ({ children }) => {
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

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
