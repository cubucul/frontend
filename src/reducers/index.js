import { combineReducers } from 'redux';
import { search } from './search';
import { podcastPage } from './podcast-page';
import { player } from './player';
import { subscriptions } from './subscriptions';
import { history } from './history';

const rootReducer = combineReducers({
  search,
  podcastPage,
  subscriptions,
  player,
  history
});

export default rootReducer;
