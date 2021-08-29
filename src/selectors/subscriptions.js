import { createSelector } from 'reselect';

export const subscriptionsSelector = (state) => state.subscriptions;

export const hasPodcastInSubscriptions = createSelector(
  subscriptionsSelector,
  (_, podcastId) => podcastId,
  (subscriptions, podcastId) => {
    const podcastIndex = subscriptions.findIndex((s) => s.id === podcastId);
    return podcastIndex !== -1;
  }
);
