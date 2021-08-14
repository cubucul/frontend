const baseUrl = process.env.REACT_APP_URL_API;

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const getPodcastByGenre = async (genre = 'all', count = 25) => {
  const data = await fetchData(`${baseUrl}/top?genre=${genre}&count=${count}`);
  return data;
};
