import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const localStorageKey = 'react-podcasts';
const persistedState = localStorage.getItem(localStorageKey);
let preloadedState;

if (persistedState) {
  preloadedState = {
    ...JSON.parse(persistedState)
  };
}

const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) || compose;

const store = createStore(rootReducer, preloadedState, composeEnhancers(
  applyMiddleware(thunk)
));

store.subscribe(() => {
  const { subscriptions, history, favourites } = store.getState();
  localStorage.setItem(localStorageKey, JSON.stringify({
    subscriptions,
    history,
    favourites
  }));
});

export default store;
