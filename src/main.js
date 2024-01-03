import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import * as VueGoogleMaps from "vue2-google-maps";
import VueMqtt from "vue-mqtt";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";

const credentials = {
  username: process.env.VUE_APP_USERNAME,
  password: process.env.VUE_APP_PASSWORD,
};

Vue.use(BootstrapVue);

Vue.prototype.$http = axios
Vue.config.productionTip = false;

Vue.use(VueMqtt, "ws://localhost:8884", credentials);
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_API_KEY,
  },
});

new Vue({
  router,
  axios,
  render: (h) => h(App)
}).$mount("#app");
