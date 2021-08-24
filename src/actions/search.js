import { fetchPodcasts } from '../services/search';
import * as types from '../types/search';

const searchRequested = () => ({
  type: types.FETCH_SEARCH_REQUEST
});

const searchError = (error) => ({
  type: types.FETCH_SEARCH_FAILURE,
  error
});

const searchLoaded = (data) => ({
  type: types.FETCH_SEARCH_SUCCESS,
  data
});

export const changeSearchTerm = (term) => ({
  type: types.CHANGE_SEARCH_TERM,
  term
});

export const resetSearch = () => ({
  type: types.RESET_SEARCH
});

export const findPodcasts = (term, options) => (dispatch) => {
  dispatch(searchRequested());
  fetchPodcasts(term, options)
    .then((data) => dispatch(searchLoaded(data)))
    .catch((error) => {
      if (error.message !== 'Fetch is aborted') {
        dispatch(searchError(error));
      }
    });
};
