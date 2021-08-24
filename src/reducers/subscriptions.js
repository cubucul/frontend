import * as types from '../types/subscriptions';

const initialState = [];

export const subscriptions = (state = initialState, action) => {
  switch (action.type) {
    case types.SUBSCRIPTIONS_ADD_PODCAST:
      return [
        ...state,
        action.podcastData
      ];
    case types.SUBSCRIPTIONS_REMOVE_PODCAST: {
      const index = state.findIndex((i) => i.id === action.podcastId);

      return [
        ...state.splice(0, index),
        ...state.splice(index + 1)
      ];
    }
    default:
      return state;
  }
};
