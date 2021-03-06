export const state = () => ({
  popularActors: [],
  specificActor: null
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
