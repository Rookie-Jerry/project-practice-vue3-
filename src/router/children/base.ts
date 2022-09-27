import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/layout/admin.vue"),
    children: [
      {
        path: "/",
        component: () => import("@/views/home.vue"),
        meta: {
          title: "后台首页",
        },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
    meta: {
      title: "登录页",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/404.vue"),
    meta: {
      title: "404页面",
    },
  },
];

export default routes;
