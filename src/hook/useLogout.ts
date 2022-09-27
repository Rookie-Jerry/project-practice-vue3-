import { useRouter } from "vue-router";
import { useStore } from "vuex";
import showMessageBox from "../utils/messageBox";
import toast from "../utils/toast";

export function useLogout(){
    const store = useStore();
    const router = useRouter();
    const logout = ()=>{
        showMessageBox("确定退出登录吗？").then(() => {
            store.dispatch("logout").then(() => {
              toast("退出登录成功");
              router.push("/login");
            });
          });
    }
    return {
        logout
    }
}