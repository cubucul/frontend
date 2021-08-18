import { fetchEpisodePageData } from '../services/rss';
import * as types from '../types/podcast-page';

const podcastPageRequested = () => ({
  type: types.FETCH_PODCAST_PAGE_REQUEST
});

const podcastPageError = (error) => ({
  type: types.FETCH_PODCAST_PAGE_FAILURE,
  error
});

export const podcastPageSuccess = (data) => ({
  type: types.FETCH_PODCAST_PAGE_SUCCESS,
  data
});

export const getPodcastPageData = (podcastId, episodeId) => (dispatch) => {
  dispatch(podcastPageRequested());
  fetchEpisodePageData(podcastId, episodeId)
    .then((data) => dispatch(podcastPageSuccess(data)))
    .catch((error) => dispatch(podcastPageError(error)));
};
