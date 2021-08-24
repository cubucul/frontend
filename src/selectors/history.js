import { createSelector } from 'reselect';

export const historySelector = (state) => state.history;

export const selectEpisodeById = createSelector(
  historySelector,
  (_, episodeId) => episodeId,
  (history, episodeId) => history.find((episode) => episode.episodeId === episodeId)
);

export const selectCurrentTimeById = createSelector(
  (state) => state,
  (_, episodeId) => episodeId,
  (history, episodeId) => {
    const episode = selectEpisodeById(history, episodeId);
    return episode ? episode.currentTime : 0;
  }
);

export const isEpisodeArchived = createSelector(
  (state) => state,
  (_, episodeId) => episodeId,
  (history, episodeId) => {
    const episode = selectEpisodeById(history, episodeId);
    return episode ? episode.duration === episode.currentTime : false;
  }
);

export const selectActiveEpisodes = (state) =>
  state.history.filter((episode) => episode.duration !== episode.currentTime);
