import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    access_token: null
  },
  mutations: {
    authUser(state, token) {
      state.access_token = token;
    },
    setUsers: (state, users) => (state.users = users),
    clearAuthData(state) {
      state.access_token = null;
    }
  },
  actions: {
    logIn({ commit }, authData) {
      axios
        .post("/auth/login", authData)
        .then(res => {
          console.log(res);
          commit("authUser", res.data.access_token);
          localStorage.setItem("token", res.data.access_token);
          localStorage.setItem("expirationDate", res.data.expires_at);
        })
        .catch(e => console.log(e));
    },
    autoLogin({ commit }) {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const expirationDate = localStorage.getItem("expirationDate");
      const now = new Date();
      if (now >= expirationDate) {
        return;
      }

      commit("authUser", token);
    },
    logout({ commit }) {
      commit("clearAuthData");
      localStorage.clear();
      router.replace("/");
    },
    signUp({ commit }, authData) {
      axios
        .post("/auth/signup", authData)
        .then(x => console.log(x))
        .catch(e => console.log(e));
    },
    fetchUsers({ commit, state }) {
      if (!state.access_token) {
        return;
      }
      axios
        .get("/users", {
          headers: { Authorization: "Bearer " + state.access_token }
        })
        .then(res => {
          console.log(res);
          commit("setUsers", res.data.data.data);
        })
        .catch(e => console.log(e));
    }
  },
  getters: {
    allUsers: state => state.users
  }
});
