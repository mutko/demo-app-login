import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    access_token: null,
    messages: [],
    pages: {
      firstPage: "/users?page=1",
      prevPage: "",
      nextPage: "",
      lastPage: "",
      currentPage: 1
    }
  },
  mutations: {
    authUser(state, token) {
      state.access_token = token;
    },
    clearAuthData(state) {
      state.access_token = null;
    },
    setUsers: (state, users) => (state.users = users),
    setMssg: (state, mssg) => (state.messages = mssg),

    setPrev: (state, page) => (state.pages.prevPage = page),
    setNext: (state, page) => (state.pages.nextPage = page),
    setLast: (state, page) => (state.pages.lastPage = page),
    setCurrent: (state, page) => (state.pages.currentPage = page)
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
          router.replace("/dashboard");
        })
        .catch(e => {
          alert("You have entered an invalid username or password");
        });
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
        .then(res => {
          console.log(res);
          alert("User uccessfully created!");
          router.replace("/dashboard");
        })
        .catch(e => {
          console.log(e.response);
          if (e.response.status === 422) {
            alert("The email has already been taken.");
          } else {
            alert("Not valid data. Try again.");
          }
        });
    },
    fetchUsers({ commit, state }) {
      if (!state.access_token) {
        return;
      }
      axios
        .get(state.pages.firstPage, {
          headers: { Authorization: "Bearer " + state.access_token }
        })
        .then(res => {
          console.log(res);

          commit("setUsers", res.data.data.data);
          commit("setNext", res.data.data.next_page_url);
          commit("setPrev", res.data.data.prev_page_url);
          commit("setLast", res.data.data.last_page_url);
          commit("setCurrent", res.data.data.current_page);

          console.log(state.pages.prevPage);
          console.log(state.pages.nextPage);
          console.log(state.pages.lastPage);
          console.log(state.pages.currentPage);
        })
        .catch(e => console.log(e));
    },
    fetchMssg({ commit, state }) {
      axios
        .get("/messages", {
          headers: { Authorization: "Bearer " + state.access_token }
        })
        .then(res => {
          console.log(res);
          commit("setMssg", res.data.data.data);
        })
        .catch(e => console.log(e));
    }
  },
  getters: {
    allUsers: state => state.users,
    allMessages: state => state.messages,
    allPages: state => state.pages
  }
});
