import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/dashboard",
    name: 'Dashboard',
    meta: {
      title: 'Dashboard'
    },
    component: () => import("../views/dashboard/Index.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;

