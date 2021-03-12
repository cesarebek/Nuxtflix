export const state = () => ({
  popularActors: []
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
