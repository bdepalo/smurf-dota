import {RouteRecordRaw, createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue"
const routes: Array<RouteRecordRaw> = [
  {
    path: "/smurf/",
    name: "Home",
    component: Home
  },
  {
    path: "/smurf/about",
    name: "About",
    component: About
  },
  {path: "/smurf/:catchAll(.*)", redirect: "/smurf/about"}
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router