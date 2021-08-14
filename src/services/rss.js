import { fetchData } from './api';

export const fetchPodcastPageData = async (podcastId) => {
  const data = await fetchData(`/?podcastId=${podcastId}`);
  return data;
};
