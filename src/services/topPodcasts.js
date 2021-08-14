import { fetchData } from './api';

export const getPodcastByGenre = async (genre = 'all', count = 25) => {
  const data = await fetchData(`/top?genre=${genre}&count=${count}`);
  return data;
};
