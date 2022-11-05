import {RouteRecordRaw, createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue"
const routes: Array<RouteRecordRaw> = [
  {
    path: "/*",
    name: "Home",
    component: Home
  },
  // {
  //   path: "/*",
  //   name: "About",
  //   component: About
  // }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router