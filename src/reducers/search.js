import * as types from '../types/search';

const initialState = {
  loading: false,
  error: null,
  term: '',
  results: []
};

export const search = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        results: []
      };
    case types.FETCH_SEARCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        results: []
      };
    case types.FETCH_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        results: action.data
      };
    case types.CHANGE_SEARCH_TERM:
      return {
        ...state,
        term: action.term
      };
    case types.CLEAR_SEARCH_TERM:
      return initialState;
    default:
      return state;
  }
};
