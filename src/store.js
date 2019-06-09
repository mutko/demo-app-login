import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    token: ""
  },
  mutations: {
    authUser(state, userData) {
      state.access_token = userData.token;
    },
    setUsers: (state, users) => (state.users = users)
  },
  actions: {
    logIn({ commit }, authData) {
      axios
        .post("/auth/login", authData)
        .then(res => {
          console.log(res);
          commit("authUser", { token: res.data.access_token });
        })
        .catch(e => console.log(e));
    },
    signUp({ commit }, authData) {
      axios
        .post("/auth/signup", authData)
        .then(x => console.log(x))
        .catch(e => console.log(e));
    },

    async fetchUsers({ commit }) {
      const response = await axios.get("/users");
      console.log(response);
      commit("setUsers", response.data.data.data);
    }
  },
  getters: {
    allUsers: state => state.users
  }
});
