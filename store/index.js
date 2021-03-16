import { popularTitles, popularActors } from "@/api";

export const actions = {
  async nuxtServerInit({ dispatch, commit }, { $axios, app }) {
    //Get Movies
    const resPopularMovies = await $axios.$get(popularTitles("movie"));
    const resPopularSeries = await $axios.$get(popularTitles("tv"));
    //Get Actors
    const resActors = await $axios.$get(popularActors(1));
    commit("movies/setMovies", {
      popularMovies: resPopularMovies.results,
      popularSeries: resPopularSeries.results
    });
    commit("actors/setActors", {
      popular: resActors.results
    });
    if (app.$cookies.get("token")) {
      const userToken = app.$cookies.get("token");
      const userId = app.$cookies.get("user_id");
      dispatch("authentication/tryLogin", {
        token: userToken,
        id: userId
      });
    }
  }
};
