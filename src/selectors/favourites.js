import { createSelector } from 'reselect';

export const hasEpisodeInFavourites = createSelector(
  (state) => state,
  (_, episodeId) => episodeId,
  (state, episodeId) => {
    const episodeIndex = state.favourites.findIndex((e) => e.episodeId === episodeId);
    return episodeIndex !== -1;
  }
);

export const favouritesSelector = (state) => state.favourites;
