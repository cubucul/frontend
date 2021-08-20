import * as types from '../types/genre-page';

const initialState = {
  loading: false,
  error: null,
  genreId: '',
  podcasts: []
};

export const genrePage = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_GENRE_PAGE_REQUEST:
      return {
        loading: true,
        error: null,
        genreId: action.genreId,
        podcasts: []
      };
    case types.FETCH_GENRE_PAGE_FAILURE:
      return {
        loading: false,
        error: action.error,
        genreId: '',
        podcasts: []
      };
    case types.FETCH_GENRE_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        podcasts: action.data
      };
    default:
      return state;
  }
};
