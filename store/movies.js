//State is a function to avoid unwanted state use in DOM
export const state = () => ({
  popularMovies: [],
  topRatedMovies: [],
  upcomingMovies: [],
  nowPlayingMovies: []
});

export const getters = {
  popularMovies(state) {
    return state.popularMovies;
  },
  topRatedMovies(state) {
    return state.topRatedMovies;
  },
  upcomingMovies(state) {
    return state.upcomingMovies;
  },
  nowPlayingMovies(state) {
    return state.nowPlayingMovies;
  }
};

export const mutations = {
  setMovies(state, movies) {
    state.popularMovies = movies.popular;
    state.topRatedMovies = movies.topRated;
    state.upcomingMovies = movies.upcoming;
    state.nowPlayingMovies = movies.nowPlaying;
  }
};

export const actions = {};
