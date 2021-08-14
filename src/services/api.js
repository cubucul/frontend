const baseURL = process.env.REACT_APP_URL_API;

export const fetchData = async (url, options) => {
  const response = await fetch(baseURL + url, options);
  const data = await response.json();
  return data;
};
