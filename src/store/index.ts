import { createStore } from "vuex";
import { delToken, setToken } from "../api/auth";
import { changePassword, getInfo, login, logout } from "../api/manager";
import router from "../router";
import toast from "../utils/toast";

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      // 用户信息
      userInfo: {},
      // 侧边栏宽度
      menuWidth:'250px',
      // 菜单信息
      menus:[],
      ruleNames:[]
    };
  },
  mutations: {
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    SWITCH_MENUWIDTH(state){
      state.menuWidth = state.menuWidth !== '250px'?'250px':'64px'
    },
    SET_MENU(state,menus){
      state.menus = menus
    },
    SET_RULENAMES(state,ruleNames){
      state.ruleNames = ruleNames
    }
  },
  actions: {
    // 登录
    login(context, { username, password }) {
      return new Promise((resolve, reject) => {
        login(username, password)
          .then((res:any) => {
            // 提示登录成功
            toast("登录成功");
            // 把token存到cookie里
            setToken(res.token);
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    // 获取当前登录用户信息
    getInfo(context) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res:any) => {
            context.commit("SET_USERINFO", res);
            context.commit('SET_MENU',res.menus);
            context.commit('SET_RULENAMES',res.ruleNames)
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    // 退出登录
    logout(context,state){
        return new Promise((resolve, reject) => {
            logout().then(res=>{
                // 清除token
                delToken()
                // 清空store里的用户信息
                context.commit('SET_USERINFO',state)
                resolve(res)
            }).catch(err=>reject(err))
        })
    },
    // 修改密码
    updatepassword(context,state){
      return new Promise((resolve, reject) => {
        changePassword(state).then(res=>{
          // 修改成功
          toast('修改成功')
          // 清除token
          delToken()
          // 重新登录
          resolve(res)
        }).catch(err=>reject(err))
      })
    }
  },
});

export default store;
