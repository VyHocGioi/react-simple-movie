export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "1af566f85ecb6a3b7bd189b25a385be8";
export const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
export const tmdbSearchEndpoint = "https://api.themoviedb.org/3/search/movie";
export const tmdbAPI = {
  getMovieList: (type, page = 1) =>
    `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieDetail: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,
  getMovieCredit: (movieId) =>
    `${tmdbEndpoint}/${movieId}/credits?api_key=${apiKey}`,
  getMovieVideos: (movieId, type) =>
    `${tmdbEndpoint}/${movieId}/${type}?api_key=${apiKey}`,
  getMovieSimilar: (movieId) =>
    `${tmdbEndpoint}/${movieId}/similar?api_key=${apiKey}`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
  getMovieSearch: (query, page) =>
    `${tmdbSearchEndpoint}?api_key=${apiKey}&query=${query}&page=${page}`,
};
