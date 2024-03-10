import apiClient from '../../config/apiClient.js';

export const searchMovies = async query => {
  return apiClient.get(`/movies/search?query=${query}`);
};
