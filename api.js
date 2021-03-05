const key = process.env.TMDB_KEY;

export const popularMovies = () => `/3/movie/popular?api_key=${key}&page=1`;
