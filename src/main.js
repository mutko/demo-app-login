import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import store from "./store";
import { routes } from "./router";
import axios from "axios";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes
});

axios.defaults.baseURL =
  "https://cors-anywhere.herokuapp.com/http://comtrade.sytes.net/api";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
