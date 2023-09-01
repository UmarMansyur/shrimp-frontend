import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useSessionStore } from "../stores/session";
import { ref } from 'vue';
const isAdmin = ref<Boolean>(false);

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
    path: "/pond/:id",
    name: 'Edit Tambak',
    meta: {
      title: 'Edit Tambak'
    },
    component: () => import("../views/pond/Edit.vue"),
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
    path: "/pool/:id",
    name: 'Edit Kolam',
    meta: {
      title: 'Edit Kolam'
    },
    component: () => import("../views/pool/Edit.vue"),
  },
  {
    path: "/pool/detail/:id",
    name: 'Detail Kolam',
    meta: {
      title: 'Detail Kolam'
    },
    component: () => import("../views/pool/Detail.vue"),
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
    path: '/profile/edit',
    name: 'Edit Profile',
    meta: {
      title: 'Edit Profile'
    },
    component: () => import("../views/profile/EditProfile.vue"),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    meta: {
      title: 'Not Found'
    },
    component: () => import("../views/NotFound.vue"),
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'Login'
    },
    component: () => import("../views/authentication/Parent.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from) => {
  document.title = to.meta.title as string + ' | Bincang Budidaya Udang';
  const { setUser, getUser } = useSessionStore();
  if (to.name != 'Login' && (!sessionStorage.getItem('token') || sessionStorage.getItem('token')!.length <= 13)) {
    return { path: '/login' };
  }

  if (sessionStorage.getItem('token') && to.name == 'Login') {
    return { path: '/' };
  }
  if (sessionStorage.getItem('token')  && to.name != 'login' && to.name != 'NotFound') {
    if (getUser.id === 0) {
      await setUser();
      isAdmin.value = getUser.role == 'Administrator' ? true : false;
    }
  }
});


export default router;

