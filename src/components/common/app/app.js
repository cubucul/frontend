import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { playerIsShowingSelector } from '../../../selectors/player';
import Header from '../header';
import Player from '../../player';
import HomePage from '../../../pages/home-page';
import PodcastPage from '../../../pages/podcast-page';
import EpisodePage from '../../../pages/episode-page';
import DiscoverPage from '../../../pages/discover-page';
import GenrePage from '../../../pages/genre-page';
import NewReleasesPage from '../../../pages/new-releases-page';
import InProgressPage from '../../../pages/in-progress-page';
import FavouritesPage from '../../../pages/favourites-page';
import ListeningHistoryPage from '../../../pages/listening-history-page';
import './app.css';

const App = () => {
  const isPlayerShowing = useSelector(playerIsShowingSelector);

  const appClass = classNames('app', {
    'app--with-player': isPlayerShowing
  });

  return (
    <div className={appClass}>
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
          <Route path="/favourites" component={FavouritesPage} />
          <Route path="/listening-history" component={ListeningHistoryPage} />
        </Switch>
      </main>
      <Player />
    </div>
  );
};

export default App;
