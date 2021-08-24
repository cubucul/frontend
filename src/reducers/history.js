import * as types from '../types/history';

const initialState = [];

const getEpisodeIndex = (state, episodeId) => {
  return state.findIndex((e) => e.episodeId === episodeId);
};

export const history = (state = initialState, action) => {
  switch (action.type) {
    case types.HISTORY_ADD_EPISODE: {
      const newEpisode = {
        ...action.episodeData,
        isArchived: false
      };

      return [
        newEpisode,
        ...state
      ];
    }
    case types.HISTORY_UPDATE_EPISODE_TIME: {
      const { episodeId, currentTime } = action;
      const episodeIndex = getEpisodeIndex(state, episodeId);

      const newState = [...state];
      newState[episodeIndex].currentTime = currentTime;

      return newState;
    }
    case types.HISTORY_SET_IS_ARCHIVED: {
      const { episodeId, isArchived } = action;
      const episodeIndex = getEpisodeIndex(state, episodeId);

      const newState = [...state];
      newState[episodeIndex].isArchived = isArchived;

      return newState;
    }
    default:
      return state;
  }
};
