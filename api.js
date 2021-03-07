const key = process.env.TMDB_KEY;

//Movies URLs
export const popularMovies = () => `/3/movie/popular?api_key=${key}&page=1`;
export const topRatedMovies = () => `/3/movie/top_rated?api_key=${key}&page=1`;
export const upcomingMovies = () => `/3/movie/upcoming?api_key=${key}&page=1`;
export const nowPlayingMovies = () =>
  `/3/movie/now_playing?api_key=${key}&page=1`;

//Movie Details
export const movieDetails = id => `/3/movie/${id}?api_key=${key}`;
export const movieVideos = id => `/3/movie/${id}/videos?api_key=${key}`;

//Actors URLs
export const popularActors = () => `/3/person/popular?api_key=${key}&page=1`;
export const specificActor = id => `/3/person/${id}?api_key=${key}`;
