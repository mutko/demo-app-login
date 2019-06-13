import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import axios from "axios";
import Validate from "vuelidate";

Vue.use(Validate);

Vue.config.productionTip = false;

axios.defaults.baseURL =
  "https://cors-anywhere.herokuapp.com/http://comtrade.sytes.net/api";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
