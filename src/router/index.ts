import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: 'Beranda',
    meta: {
      title: 'Beranda'
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
  },
  {
    path: "/monitoring",
    name: 'Monitoring',
    meta: {
      title: 'Monitoring'
    },
    component: () => import("../views/monitoring/Index.vue"),
  },
  {
    path: '/report/',
    name: 'Laporan',
    meta: {
      title: 'Laporan'
    },
    component: () => import("../views/report/Index.vue"),
  },
  {
    path: '/profile/',
    name: 'Profile',
    meta: {
      title: 'Profile'
    },
    component: () => import("../views/profile/Index.vue"),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    meta: {
      title: 'Not Found'
    },
    component: () => import("../views/NotFound.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title as string
  next();
})


export default router;

