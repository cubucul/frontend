import * as types from '../types/discover-page';

const initialState = {
  isLoading: false,
  error: null,
  podcasts: []
};

export const discoverPage = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_DISCOVER_PAGE_REQUEST:
      return {
        isLoading: true,
        error: null,
        podcasts: []
      };
    case types.FETCH_DISCOVER_PAGE_FAILURE:
      return {
        isLoading: false,
        error: action.error,
        podcasts: []
      };
    case types.FETCH_DISCOVER_PAGE_SUCCESS:
      return {
        isLoading: false,
        error: null,
        podcasts: action.data
      };
    default:
      return state;
  }
};
