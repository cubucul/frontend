export const genres = [
  { id: '1301', label: 'Arts' },
  { id: '1321', label: 'Business' },
  { id: '1303', label: 'Comedy' },
  { id: '1304', label: 'Education' },
  { id: '1483', label: 'Fiction' },
  { id: '1511', label: 'Government' },
  { id: '1512', label: 'Health & Fitness' },
  { id: '1487', label: 'History' },
  { id: '1305', label: 'Kids & Family' },
  { id: '1502', label: 'Leisure' },
  { id: '1310', label: 'Music' },
  { id: '1489', label: 'News' },
  { id: '1314', label: 'Religion & Spirituality' },
  { id: '1533', label: 'Science' },
  { id: '1324', label: 'Society & Culture' },
  { id: '1545', label: 'Sports' },
  { id: '1309', label: 'TV & Film' },
  { id: '1318', label: 'Technology', slug: 'technology' },
  { id: '1488', label: 'True Crime' }
];

export const getGenreTitle = (id) => {
  return genres.find((genre) => genre.id === id).label;
};
