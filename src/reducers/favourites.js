import { FAVOURITES_ADD_EPISODE, FAVOURITES_REMOVE_EPISODE } from '../types/favourites';

const getEpisodeIndex = (state, episodeId) => {
  return state.findIndex((e) => e.episodeId === episodeId);
};

const initialState = [];

export const favourites = (state = initialState, action) => {
  switch (action.type) {
    case FAVOURITES_ADD_EPISODE: {
      return [ action.episodeData, ...state ];
    }
    case FAVOURITES_REMOVE_EPISODE: {
      const { episodeId } = action;
      const episodeIndex = getEpisodeIndex(state, episodeId);

      return [
        ...state.splice(0, episodeIndex),
        ...state.splice(episodeIndex + 1)
      ];
    }
    default:
      return state;
  }
};
