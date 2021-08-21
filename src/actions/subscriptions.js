import * as types from '../types/subscriptions';
import { podcastDataSelector } from '../selectors/podcast-page';

const subscriptionsAddPodcast = (podcastData) => ({
  type: types.SUBSCRIPTIONS_ADD_PODCAST,
  podcastData
});

const subscriptionsRemovePodcast = (podcastId) => ({
  type: types.SUBSCRIPTIONS_REMOVE_PODCAST,
  podcastId
});

export const subscriptionsChange = (podcastId, subscribed) => (dispatch, getState) => {
  const store = getState();
  const { title, author, coverUrl600 } = podcastDataSelector(store);

  if (subscribed) {
    dispatch(subscriptionsRemovePodcast(podcastId));
  } else {
    const podcastData = {
      id: podcastId,
      title,
      author,
      coverUrl600
    };
    dispatch(subscriptionsAddPodcast(podcastData));
  }
};
