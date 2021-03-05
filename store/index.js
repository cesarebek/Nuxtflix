import { popularMovies } from "@/api";

export const actions = {
  async nuxtServerInit({ commit }, { $axios }) {
    const res = await $axios.$get(popularMovies());
    commit("movies/setPopularMovies", res.results);
  }
};
