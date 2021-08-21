import { fetchEpisodePageData } from '../services/rss';
import * as types from '../types/episode-page';

const episodePageRequested = () => ({
  type: types.FETCH_EPISODE_PAGE_REQUEST
});

const episodePageError = (error) => ({
  type: types.FETCH_EPISODE_PAGE_FAILURE,
  error
});

const episodePageSuccess = (data) => ({
  type: types.FETCH_EPISODE_PAGE_SUCCESS,
  data
});

export const getEpisodePageData = (podcastId, episodeId) => (dispatch) => {
  dispatch(episodePageRequested());
  fetchEpisodePageData(podcastId, episodeId)
    .then((data) => dispatch(episodePageSuccess(data)))
    .catch((error) => dispatch(episodePageError(error)));
};
