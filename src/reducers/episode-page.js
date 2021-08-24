import * as types from '../types/episode-page';

const initialState = {
  isLoading: false,
  error: null,
  data: {
    id: '',
    coverUrl600: '',
    title: '',
    author: '',
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

export const episodePage = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_EPISODE_PAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case types.FETCH_EPISODE_PAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case types.FETCH_EPISODE_PAGE_SUCCESS:
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
