// import Cookie from "js-cookie";
import {
  reqToken,
  validateToken,
  createSession,
  deleteSession,
  accountDetails
} from "@/api";

export const state = () => ({
  token: null,
  user_id: null
});

export const getters = {
  token(state) {
    return state.token;
  },
  isLogged(state) {
    return !!state.token;
  },
  userID(state) {
    return state.user_id;
  }
};

export const mutations = {
  setToken(state, auth) {
    state.token = auth.token;
    state.user_id = auth.id;
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
    const userInfo = await this.$axios.$get(accountDetails(session.session_id));
    //Storing Session ID with Cookies (localStorage is not supported for SSR)
    this.$cookies.set("token", session.session_id);
    this.$cookies.set("user_id", userInfo.id);
    //Saving the Session ID in VUEX Store
    commit("setToken", { token: session.session_id, id: userInfo.id });
  },

  async logout({ getters, commit }) {
    const token = getters.token;
    const logout = await this.$axios.$delete(deleteSession(), {
      data: { session_id: token }
    });
    console.log(logout);
    this.$cookies.remove("token");
    this.$cookies.remove("user_id");
    commit("setToken", { token: null, id: null });
  },
  tryLogin({ commit }, payload) {
    //Setting the token to VUEX Store
    commit("setToken", payload);
  }
};
