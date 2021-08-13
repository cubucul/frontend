const baseUrl = process.env.REACT_APP_URL_API;

const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();

  if (data.resultCount === 0) {
    throw new Error('Podcasts not found');
  }

  return data.results;
};

export const fetchPodcasts = async (term, options) => {
  const podcasts = await fetchData(`${baseUrl}/search?term=${term}`, options);
  return podcasts;
};
