import { useMemo } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'

let store;

const localStorageKey = 'react-podcasts';
const persistedStateFromLocalStorage =
  typeof window !== 'undefined' && localStorage.getItem(localStorageKey);
let preloadedStateFromLocalStorage;

if (persistedStateFromLocalStorage) {
  preloadedStateFromLocalStorage = {
    ...JSON.parse(persistedStateFromLocalStorage)
  };
}

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initStore = (preloadedState) => {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk)
  );
};

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState
    });
    store = undefined;
  }

  if (typeof window === 'undefined') {
    return _store;
  }

  if (!store) {
    store = _store;
  }

  return _store;
};

const initialStore = initializeStore(preloadedStateFromLocalStorage);

initialStore.subscribe(() => {
  const { subscriptions, history } = initialStore.getState();
  typeof window !== 'undefined' && localStorage.setItem(localStorageKey, JSON.stringify({
    subscriptions,
    history
  }));
});

export const useStore = (initialState) => {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
};
