//State is a function to avoid unwanted state use in DOM
export const state = () => ({
  popularMovies: [],
  popularSeries: [],
  topRatedMovies: [],
  upcomingMovies: [],
  nowPlayingMovies: []
});

export const getters = {
  popularMovies(state) {
    return state.popularMovies;
  },
  popularSeries(state) {
    return state.popularSeries;
  },
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
    state.popularMovies = movies.popularMovies;
    state.popularSeries = movies.popularSeries;
    state.topRatedMovies = movies.topRated;
    state.upcomingMovies = movies.upcoming;
    state.nowPlayingMovies = movies.nowPlaying;
  }
};

export const actions = {};
