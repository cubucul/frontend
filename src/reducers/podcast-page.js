import * as types from '../types/podcast-page';

const initialState = {
  isLoading: false,
  error: null,
  data: {
    id: '',
    coverUrl600: '',
    title: '',
    author: '',
    summary: '',
    link: '',
    episodes: [
      {
        id: '',
        title: '',
        published: '',
        description: '',
        url: '',
        duration: 0
      }
    ]
  }
};

export const podcastPage = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PODCAST_PAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case types.FETCH_PODCAST_PAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case types.FETCH_PODCAST_PAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.data
      };
    default:
      return state;
  }
};
