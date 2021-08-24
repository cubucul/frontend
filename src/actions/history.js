import * as types from '../types/history';

export const addEpisodeToHistory = (episodeData) => ({
  type: types.HISTORY_ADD_EPISODE,
  episodeData
});

export const updateEpisodeTimeInHistory = (episodeId, currentTime) => ({
  type: types.HISTORY_UPDATE_EPISODE_TIME,
  episodeId,
  currentTime
});

export const setIsArchived = (episodeId, isArchived) => ({
  type: types.HISTORY_SET_IS_ARCHIVED,
  episodeId,
  isArchived
});
