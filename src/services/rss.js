const baseUrl = process.env.REACT_APP_URL_API;

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchPodcastPageData = async (podcastId) => {
  const data = await fetchData(`${baseUrl}?podcastId=${podcastId}`);
  return data;
};
