import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Main from "../views/Main.vue";
import Home from "../views/Home.vue";
import Strategy from '../views/Strategy.vue'
import Race from '../views/Race.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "main",
    redirect: "home",
    component: Main,
    children: [
      {
        path: "/home",
        name: "home",
        component: Home,
      },
      {
        path: "/strategy",
        name: "strategy",
        component: Strategy,
      },
      {
        path: "/race",
        name: "race",
        component: Race,
      },
    ],
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
