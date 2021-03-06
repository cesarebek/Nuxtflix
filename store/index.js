import {
  popularMovies,
  topRatedMovies,
  upcomingMovies,
  nowPlayingMovies,
  popularActors
} from "@/api";

export const actions = {
  async nuxtServerInit({ commit }, { $axios }) {
    //Get Movies
    const resPopular = await $axios.$get(popularMovies());
    const resTopRated = await $axios.$get(topRatedMovies());
    const resUpcoming = await $axios.$get(upcomingMovies());
    const resNowPlaying = await $axios.$get(nowPlayingMovies());
    //Get Actors
    const resActors = await $axios.$get(popularActors());
    commit("movies/setMovies", {
      popular: resPopular.results,
      topRated: resTopRated.results,
      upcoming: resUpcoming.results,
      nowPlaying: resNowPlaying.results
    });
    commit("actors/setActors", {
      popular: resActors.results
    });
  }
};
