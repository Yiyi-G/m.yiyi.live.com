import Vue from "vue";
import app from "./App.vue"
import router from "./router"


Vue.config.productionTip = false;

new Vue(
  {
    render: h => h(app),
    
  }
).$mount("#app");


