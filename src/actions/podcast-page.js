import { fetchPodcastPageData, fetchEpisodePageData } from '../services/rss';
import * as types from '../types/podcast-page';

const podcastPageRequested = () => ({
  type: types.FETCH_PODCAST_PAGE_REQUEST
});

const podcastPageError = (error) => ({
  type: types.FETCH_PODCAST_PAGE_FAILURE,
  error
});

const podcastPageSuccess = (data) => ({
  type: types.FETCH_PODCAST_PAGE_SUCCESS,
  data
});

export const getPodcastPageData = (podcastId) => (dispatch) => {
  dispatch(podcastPageRequested());
  fetchPodcastPageData(podcastId)
    .then((data) => dispatch(podcastPageSuccess(data)))
    .catch((error) => dispatch(podcastPageError(error)));
};

export const getEpisodePageData = (podcastId, episodeId) => (dispatch) => {
  dispatch(podcastPageRequested());
  fetchEpisodePageData(podcastId, episodeId)
    .then((data) => dispatch(podcastPageSuccess(data)))
    .catch((error) => dispatch(podcastPageError(error)));
};
