import { combineReducers } from 'redux';
import { search } from './search';
import { podcastPage } from './podcast-page';
import { episodePage } from './episode-page';
import { player } from './player';
import { subscriptions } from './subscriptions';
import { discoverPage } from './discover-page';
import { genrePage } from './genre-page';
import { history } from './history';

const rootReducer = combineReducers({
  search,
  podcastPage,
  episodePage,
  subscriptions,
  player,
  discoverPage,
  genrePage,
  history
});

export default rootReducer;
