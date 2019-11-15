import Vue from "vue"
import Router from "vue-router"
import FitMain from "../page/KeepFitMain.vue"
import AddDiary from "../page/AddDiary.vue"

Vue.use(Router);
export default new Router({
    routes: [
    {
        name: "addDiary",
        path: "/",
        component: AddDiary
    },
    {
        name: "fit_main",
        path: "/main",
        component: FitMain
    },]

})