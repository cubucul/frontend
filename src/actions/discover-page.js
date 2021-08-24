import * as types from '../types/discover-page';
import { getPodcastByGenre } from '../services/topPodcasts';

const discoverPageRequested = () => ({
  type: types.FETCH_DISCOVER_PAGE_REQUEST
});

const discovertPageError = (error) => ({
  type: types.FETCH_DISCOVER_PAGE_FAILURE,
  error
});

const discoverPageSuccess = (data) => ({
  type: types.FETCH_DISCOVER_PAGE_SUCCESS,
  data
});

export const getDiscoverPageData = (genre, count) => (dispatch) => {
  dispatch(discoverPageRequested());
  getPodcastByGenre(genre, count)
    .then((data) => dispatch(discoverPageSuccess(data)))
    .catch((error) => dispatch(discovertPageError(error)));
};
