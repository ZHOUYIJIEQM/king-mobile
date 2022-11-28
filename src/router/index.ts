import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ easing: "ease", speed: 250, showSpinner: false });

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "main",
      redirect: "home",
      component: () => import("@/views/Main.vue"),
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("@/views/Home.vue"),
        },
        {
          path: "/strategy",
          name: "strategy",
          component: () => import("@/views/Strategy.vue"),
        },
        {
          path: "/race",
          name: "race",
          component: () => import("@/views/Race.vue"),
        },
      ],
    },
    {
      path: "/heroDetail/:heroName",
      name: 'heroDetail',
      component: () => import('@/views/HeroDetail.vue')
    },
    {
      path: '/articleDetail/:articleId',
      name: 'articleDetail',
      component: () => import('@/views/ArticleDetail.vue')
    },
    {
      path: '/videoDetail/:videoId',
      name: 'videoDetail',
      component: () => import('@/views/VideoDetail.vue')
    },
    {
      path: '/heroList',
      name: 'HeroList',
      component: () => import('@/views/HeroList.vue')
      // component: () => import('../views/HeroList.vue')
    },
  ],
});

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
