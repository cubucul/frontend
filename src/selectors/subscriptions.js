import { createSelector } from 'reselect';

export const subscriptionsSelector = (state) => state.subscriptions;
const podcastIdSelector = (state) => state.podcastPage.data.id;

export const hasInSubscriptionsSelector = createSelector(
  subscriptionsSelector,
  podcastIdSelector,
  (subscriptions, podcastId) => subscriptions.findIndex((s) => s.id === podcastId) !== -1
);
