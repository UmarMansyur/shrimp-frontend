import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/dashboard",
    name: 'Dashboard',
    meta: {
      title: 'Dashboard'
    },
    component: () => import("../views/dashboard/Index.vue"),
  },
  {
    path: "/pond",
    name: 'Tambak',
    meta: {
      title: 'Tambak'
    },
    component: () => import("../views/pond/Index.vue"),
  },
  {
    path: "/pond/create",
    name: 'Tambah Tambak',
    meta: {
      title: 'Tambah Tambak'
    },
    component: () => import("../views/pond/Add.vue"),
  },
  {
    path: "/pool",
    name: 'Data Kolam',
    meta: {
      title: 'Data Kolam'
    },
    component: () => import("../views/pool/Index.vue"),
  },
  {
    path: "/pool/create",
    name: 'Tambah Kolam',
    meta: {
      title: 'Tambah Kolam'
    },
    component: () => import("../views/pool/Add.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;

