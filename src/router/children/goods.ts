import { RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/goods",
    component: () => import("@/layout/admin.vue"),
    children: [
      {
        path: "/goods/list",
        component: () => import("@/views/goods/goods.vue"),
        meta: {
          title: "商品管理",
        },
      },
      {
        path: "/category/list",
        component: () => import("@/views/goods/category.vue"),
        meta: {
          title: "分类管理",
        },
      },
      {
        path: "/skus/list",
        component: () => import("@/views/goods/skus.vue"),
        meta: {
          title: "规格管理",
        },
      },
      {
        path: "/coupon/list",
        component: () => import("@/views/goods/coupon.vue"),
        meta: {
          title: "优惠券管理",
        },
      },
    ],
  },
];

export default routes;