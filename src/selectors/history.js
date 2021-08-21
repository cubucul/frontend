import { createSelector } from 'reselect';

export const historySelector = (state) => state.history;

export const selectEpisodeById = createSelector(
  historySelector,
  (_, episodeId) => episodeId,
  (history, episodeId) => history.find((episode) => episode.episodeId === episodeId)
);

export const selectCurrentTimeById = createSelector(
  historySelector,
  (_, episodeId) => episodeId,
  (history, episodeId) => {
    const episode = history.find((episode) => episode.episodeId === episodeId);
    return episode ? episode.currentTime : 0;
  }
);
