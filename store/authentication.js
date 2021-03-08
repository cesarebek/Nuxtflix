// import Cookie from "js-cookie";
import { reqToken, validateToken, createSession, deleteSession } from "@/api";

export const state = () => ({
  token: null
});

export const getters = {
  token(state) {
    return state.token;
  },
  isLogged(state) {
    return !!state.token;
  }
};

export const mutations = {
  setToken(state, token) {
    state.token = token;
  }
};
export const actions = {
  async login({ commit }, credentials) {
    //Request New temporary Token
    const token = await this.$axios.$get(reqToken());
    //Validating the previous Token with user credentials
    const validationToken = await this.$axios.$post(validateToken(), {
      username: credentials.username,
      password: credentials.password,
      request_token: token.request_token
    });
    //Creating a fresh Session ID for validated token
    const session = await this.$axios.$post(createSession(), {
      request_token: validationToken.request_token
    });
    //Storing Session ID with Cookies (localStorage is not supported for SSR)
    this.$cookies.set("token", session.session_id);
    //Saving the Session ID in VUEX Store
    commit("setToken", session.session_id);
  },
  async logout({ getters, commit }) {
    const token = getters.token;
    const logout = await this.$axios.$delete(deleteSession(), {
      data: { session_id: token }
    });
    console.log(logout);
    this.$cookies.remove("token");
    commit("setToken", null);
  },
  tryLogin({ commit }, token) {
    //Setting the token to VUEX Store
    commit("setToken", token);
  }
};
