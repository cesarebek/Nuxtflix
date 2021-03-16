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
  `/3/account?api_key=${key}&session_id=${session_id}`;
//Account states for each title
export const titleStates = (media, title_id, token) =>
  `/3/${media}/${title_id}/account_states?api_key=${key}&session_id=${token}`;
//Mark as Favorite
export const markFavorite = (account_id, token) =>
  `3/account/${account_id}/favorite?api_key=${key}&session_id=${token}`;
//Add to Watchlist
export const addWatchlist = (account_id, token) =>
  `3/account/${account_id}/watchlist?api_key=${key}&session_id=${token}`;
//Rate
export const rateTitle = (media, title_id, token) =>
  `/3/${media}/${title_id}/rating?api_key=${key}&session_id=${token}`;
//Get Favorite Titles
export const favoriteTitles = (account_id, media, token) =>
  `/3/account/${account_id}/favorite/${media}?api_key=${key}&session_id=${token}&sort_by=created_at.asc&page=1`;
//Get Watchlist Titles
export const watchlist = (account_id, media, token) =>
  `/3/account/${account_id}/watchlist/${media}?api_key=${key}&session_id=${token}&sort_by=created_at.asc&page=1`;
//Get Rating Titles
export const titleRating = (account_id, media, token) =>
  `/3/account/${account_id}/rated/${media}?api_key=${key}&session_id=${token}&sort_by=created_at.asc&page=1`;

//
//**** Movies & TV-Series lists **** //
//
export const popularTitles = media => `/3/${media}/popular?api_key=${key}`;
export const topRatedTitles = media => `/3/${media}/top_rated?api_key=${key}`;
//Now Playing Movies at Theater
export const nowPlayingMovies = () => `/3/movie/now_playing?api_key=${key}`;
//Airing Today Tv Shows
export const airingSeries = () =>
  `/3/tv/airing_today?api_key=${key}&region=ISO%203166-2%3AIT`;
//Titles Genres
export const titlesGenres = media => `/3/genre/${media}/list?api_key=${key}`;
//Filter by Genre ID
export const searchByGenre = (media, page, genre) =>
  `/3/discover/${media}?api_key=${key}&sort_by=popularity.desc&page=${page}&with_genres=${genre}`;

//
//**** Movie || Tv Show Details **** //
//
//Movie || Tv Show Details by ID
export const movieDetails = (media_type, id) =>
  `/3/${media_type}/${id}?api_key=${key}`;
//Videos that have been added to a movie || Tv Show (YT)
export const movieVideos = (media_type, id) =>
  `/3/${media_type}/${id}/videos?api_key=${key}`;
//Movie || Tv Show Credits by ID
export const movieCredits = (media_type, id) =>
  `/3/${media_type}/${id}/credits?api_key=${key}`;
//Movie || Tv Show Recommendations by ID
export const movieReccomendations = (media_type, id) =>
  `/3/${media_type}/${id}/recommendations?api_key=${key}&page=1`;
//Movie || Tv Show Socials by ID
export const movieSocials = (media_type, id) =>
  `/3/${media_type}/${id}/external_ids?api_key=${key}`;
//Movie || Tv Show Keywords by ID
export const movieKeywords = (media_type, id) =>
  `/3/${media_type}/${id}/keywords?api_key=${key}`;

//
//**** Actors **** //
//
//Popular Actors list
export const popularActors = page =>
  `/3/person/popular?api_key=${key}&page=${page}`;
//Actor Details by ID
export const actorDetails = id => `/3/person/${id}?api_key=${key}`;
//Actor Movies by ID
export const actorMovies = id => `/3/person/${id}/movie_credits?api_key=${key}`;
//Actor TV Shows by ID
export const actorSeries = id => `/3/person/${id}/tv_credits?api_key=${key}`;
//Combined Actor Credits by ID
export const actorCombinedCredits = id =>
  `/3/person/${id}/combined_credits?api_key=${key}`;

//
//**** Custom Search **** //
//
//Searches for Movies - TV Shows - Actors
export const multipleSearch = (query, page) =>
  `/3/search/multi?api_key=${key}&query=${query}&page=${page}`;
export const queryKeywordBySearch = query =>
  `/3/search/keyword?api_key=${key}&query=${query}&page=1`;
//Discover by Keyword search
export const titlesByKeyword = (media_type, keyword, page) =>
  `3/discover/${media_type}?api_key=${key}&sort_by=popularity.desc&page=${page}&with_keywords=${keyword}`;
