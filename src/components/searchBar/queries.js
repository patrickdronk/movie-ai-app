import apiClient from '../../config/apiClient.js';

export const searchMovies = async query => {
  return apiClient.get(`/movies/search?query=${query}`);
};

export const addMovieToWatchList = async (watchListId, imdbId) => {
  return apiClient.post(`/watchlist/add-movie-to-watchlist`, {watchListId, imdbId})
}
