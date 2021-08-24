import * as types from '../types/genre-page';
import { getPodcastByGenre } from '../services/topPodcasts';

const genrePageRequested = (genreId) => ({
  type: types.FETCH_GENRE_PAGE_REQUEST,
  genreId
});

const genrePageError = (error) => ({
  type: types.FETCH_GENRE_PAGE_FAILURE,
  error
});

const genrePageSuccess = (data) => ({
  type: types.FETCH_GENRE_PAGE_SUCCESS,
  data
});

export const getGenrePageData = (genre, count) => (dispatch) => {
  dispatch(genrePageRequested(genre));
  getPodcastByGenre(genre, count)
    .then((data) => dispatch(genrePageSuccess(data)))
    .catch((error) => dispatch(genrePageError(error)));
};
