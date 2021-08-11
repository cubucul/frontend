export const secondsToString = (secondsString) => {
  let totalSeconds = secondsString;
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);

  if (hours) {
    return `${hours}h ${minutes}m`;
  }

  if (minutes === 0) {
    return `${totalSeconds} secs`;
  }

  return `${minutes} mins`;
};

export const secondsToHms = (secondsString) => {
  const totalSeconds = parseInt(secondsString, 10);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
      .map(v => v < 10 ? '0' + v : v)
      .filter((v, i) => v !== '00' || i > 0)
      .join(':');
}
