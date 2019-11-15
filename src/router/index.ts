import Vue from 'vue'
import Router from 'vue-router'
import KeepFitMain from "../page/KeepFitMain"

Vue.use(Router);

export default new Router({
    routers:[{
        path:"/fit_main",
        name:"fit_main",
        component:KeepFitMain,
        alias:'fit_main'
    }]
})