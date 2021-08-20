export const getEpisodeIndex = (season, number, episodeType) => {
  let index = '';

  if (season) {
    index += `S${season} `;
  }

  if (number) {
    index += `E${number}`;
  }

  if (episodeType && episodeType !== 'full') {
    index = episodeType.toUpperCase();
  }

  return index;
};
