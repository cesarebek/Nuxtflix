const key = process.env.TMDB_KEY;

//
//**** User Authentication **** //
//
//1. Create a temporary request token | GET
export const reqToken = () => `/3/authentication/token/new?api_key=${key}`;
//2. Token validation by entering a username and password | POST
export const validateToken = () =>
  `/3/authentication/token/validate_with_login?api_key=${key}`;
//3. Create a valid session ID once a user has validated the request token | POST
export const createSession = () =>
  `/3/authentication/session/new?api_key=${key}`;
//4. Logout from session ID | DELETE
export const deleteSession = () => `/3/authentication/session?api_key=${key}`;

//
//**** User Details **** //
//
//User Authenticated Details
export const accountDetails = session_id =>
  `https://api.themoviedb.org/3/account?api_key=${key}&session_id=${session_id}`;

//
//**** Movies & TV-Series lists **** //
//
export const popularMovies = () => `/3/movie/popular?api_key=${key}&page=1`;
export const topRatedMovies = () => `/3/movie/top_rated?api_key=${key}&page=1`;
export const upcomingMovies = () => `/3/movie/upcoming?api_key=${key}&page=1`;
export const nowPlayingMovies = () =>
  `/3/movie/now_playing?api_key=${key}&page=1`;

//
//**** Movie Details **** //
//
//Movie Details by ID
export const movieDetails = (media_type, id) =>
  `/3/${media_type}/${id}?api_key=${key}`;
//Videos that have been added to a movie (YT)
export const movieVideos = (media_type, id) =>
  `/3/${media_type}/${id}/videos?api_key=${key}`;
//Movie Credits by ID
export const movieCredits = (media_type, id) =>
  `/3/${media_type}/${id}/credits?api_key=${key}`;
//Movie Recommendations by ID
export const movieReccomendations = (media_type, id) =>
  `/3/${media_type}/${id}/recommendations?api_key=${key}&page=1`;
//Movie Socials by ID
export const movieSocials = (media_type, id) =>
  `/3/${media_type}/${id}/external_ids?api_key=${key}`;
//Movie Keywords by ID
export const movieKeywords = (media_type, id) =>
  `/3/${media_type}/${id}/keywords?api_key=${key}`;

//
//**** Actors **** //
//
//Popular Actors list
export const popularActors = () => `/3/person/popular?api_key=${key}&page=1`;
//Actor Details by ID
export const specificActor = id => `/3/person/${id}?api_key=${key}`;

//
//**** Custom Search **** //
//
//Searches for Movies - TV Shows - Actors
export const multipleSearch = query =>
  `/3/search/multi?api_key=${key}&query=${query}&page=1`;
