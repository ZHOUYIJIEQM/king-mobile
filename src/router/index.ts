import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Main from "../views/Main.vue";
import Home from "../views/Home.vue";
import Strategy from '../views/Strategy.vue'
import Race from '../views/Race.vue'
import HeroDetail from '../views/HeroDetail.vue'
import ArticleDetail from '../views/ArticleDetail.vue'
import VideoDetail from '../views/VideoDetail.vue'
import HeroList from '../views/HeroList.vue'

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
  {
    path: "/heroDetail/:heroName",
    name: 'heroDetail',
    component: HeroDetail
  },
  {
    path: '/articleDetail/:articleId',
    name: 'articleDetail',
    component: ArticleDetail
  },
  {
    path: '/videoDetail/:videoId',
    name: 'videoDetail',
    component: VideoDetail
  },
  {
    path: '/heroList',
    name: 'HeroList',
    component: HeroList
    // component: () => import('../views/HeroList.vue')
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
