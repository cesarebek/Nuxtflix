//State is a function to avoid unwanted state use in DOM
export const state = () => ({
  popularMovies: []
});

export const getters = {};

export const mutations = {
  setPopularMovies(state, movies) {
    state.popularMovies = movies;
  }
};

export const actions = {
  async loadPopularMovies({ commit }, movies) {
    commit("setPopularMovies", movies);
  }
};
