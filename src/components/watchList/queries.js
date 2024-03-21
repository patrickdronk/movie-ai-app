import apiClient from '../../config/apiClient.js';

export const getMovieByIds = async ids => {
  const idQuery = ids.map(id => `id=${id}`).join('&');
  return apiClient.get(`/movies?${idQuery}`);
};

export const getWatchListByUserId = async () => {
  return apiClient.get(`/watchlist`);
}

export const createWatchList = async (watchListId) => {
  return apiClient.post('/watchlist', {id: watchListId})
}
