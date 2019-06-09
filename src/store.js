import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

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
    setUsers: (state, users) => (state.users = users)
  },
  actions: {
    logIn({ commit }, authData) {
      axios
        .post("/auth/login", authData)
        .then(res => {
          console.log(res);
          commit("authUser", res.data.access_token);
        })
        .catch(e => console.log(e));
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
