import { fetchData } from './api';

export const fetchPodcastPageData = async (podcastId) => {
  const data = await fetchData(`/getPodcast/${podcastId}`);
  return data;
};

export const fetchEpisodePageData = async (podcastId, episodeId) => {
  const data = await fetchData(`/getEpisode/${podcastId}/${episodeId}`);
  return data;
};
