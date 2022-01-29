export const state = () => ({
  popularActors: []

  //test
});

export const getters = {
  popularActors(state) {
    return state.popularActors;
  }
};

export const mutations = {
  setActors(state, actors) {
    state.popularActors = actors.popular;
  }
};

export const actions = {};
