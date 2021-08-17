import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../header';
import Player from '../../player';
import HomePage from '../../../pages/home-page';
import PodcastPage from '../../../pages/podcast-page';
import EpisodePage from '../../../pages/episode-page';
import DiscoverPage from '../../../pages/discover-page';
import GenrePage from '../../../pages/genre-page';
import NewReleasesPage from '../../../pages/new-releases-page';
import InProgressPage from '../../../pages/in-progress-page';
import StarredPage from '../../../pages/starred-page';
import ListeningHistoryPage from '../../../pages/listening-history-page';
import styles from './app.module.css';

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <main>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/podcast/:podcastId" exact component={PodcastPage} />
          <Route path="/podcast/:podcastId/:episodeId" component={EpisodePage} />
          <Route path="/discover" exact component={DiscoverPage} />
          <Route path="/discover/genre/:genreId" component={GenrePage} />
          <Route path="/new-releases" component={NewReleasesPage} />
          <Route path="/in-progress" component={InProgressPage} />
          <Route path="/starred" component={StarredPage} />
          <Route path="/listening-history" component={ListeningHistoryPage} />
        </Switch>
      </main>
      <Player />
    </div>
  );
};

export default App;
