const baseUrl = process.env.REACT_APP_URL_API;

const transformPodcastData = (podcast) => {
  return {
    id: podcast.trackId,
    title: podcast.trackName,
    author: podcast.artistName,
    coverUrl60: podcast.artworkUrl60
  };
};

const transformFeedData = (podcast) => {
  return {
    feed: podcast.feedUrl,
    coverUrl600: podcast.artworkUrl600
  };
};

const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();

  if (data.resultCount === 0) {
    throw new Error('Podcasts not found');
  }

  return data.results;
};

export const fetchDataById = async (podcastId) => {
  const data = await fetchData(`${baseUrl}/lookup?id=${podcastId}`);
  return transformFeedData(data[0]);
};

export const fetchPodcasts = async (term, options) => {
  const podcasts = await fetchData(`${baseUrl}/search?term=${term}`, options);
  return podcasts.map(transformPodcastData);
};
