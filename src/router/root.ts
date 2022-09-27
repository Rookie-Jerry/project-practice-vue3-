import router from "./index";
import { getToken } from "../api/auth";
import toast from "../utils/toast";
import store from "../store";
import { loadingEnd, loadingStart } from "../utils/fullLoading";
// 全局前置路由守卫
router.beforeEach(async (to, from, next) => {
  loadingStart()
  //to:要去的页面，from:从哪页面来
  console.log("全局前置路由守卫", to, from);
  const token = getToken();
  //   如果不是跳转到登录页则判断是否存在token，不存在则跳转至登录页面
  if (!token && to.path !== "/login") {
    toast("请先登录", "error");
    next("/login");
  }

  //   如果用户登录了，则获取用户信息
  if (token) {
    await store.dispatch('getInfo')
  }
  // 设置标题
  const title = (to.meta.title?to.meta.title:'') + '-vue3商城后台';
  document.title = title
  next();
});
// 全局后置守卫
router.afterEach((to, from) => {
  console.log('全局后置守卫',to,from)
  loadingEnd()
})
