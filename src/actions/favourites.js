import { FAVOURITES_ADD_EPISODE, FAVOURITES_REMOVE_EPISODE } from '../types/favourites';

export const addToFavourites = (episodeData) => ({
  type: FAVOURITES_ADD_EPISODE,
  episodeData
});

export const removeFromFavourites = (episodeId) => ({
  type: FAVOURITES_REMOVE_EPISODE,
  episodeId
});
