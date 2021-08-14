import { fetchData } from './api';

export const fetchPodcasts = async (term, options) => {
  const data = await fetchData(`/search?term=${term}`, options);

  if (data.resultCount === 0) {
    throw new Error('Podcasts not found');
  }

  return data.results;
};
