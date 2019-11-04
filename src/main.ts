import Vue from "vue";
import App from "./App.vue";
import Header from "./components/Header.vue"

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

new Vue({
  render:h=>h(Header)
}).$mount("#header")
