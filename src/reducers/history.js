import * as types from '../types/history';

const initialState = [];

const getEpisodeIndex = (state, episodeId) => {
  return state.findIndex((e) => e.episodeId === episodeId);
};

const setValueInEpisode = (state, episodeId, property, value) => {
  const episodeIndex = getEpisodeIndex(state, episodeId);
  const newState = [...state];
  newState[episodeIndex][property] = value;
  return newState;
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
      return setValueInEpisode(state, episodeId, 'currentTime', currentTime);
    }
    case types.HISTORY_SET_IS_ARCHIVED: {
      const { episodeId, isArchived } = action;
      return setValueInEpisode(state, episodeId, 'isArchived', isArchived);
    }
    default:
      return state;
  }
};
