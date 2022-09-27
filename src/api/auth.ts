import { useCookies } from "@vueuse/integrations/useCookies";
// import

const tokenKey: string = "token";
const cookie = useCookies();
/**
 * 获取token
 */
export  function getToken(){
  return cookie.get(tokenKey);
};
/**
 * 设置token
 */
export function setToken(token:any){
    return cookie.set(tokenKey,token)
}
export function delToken(){
    return cookie.remove(tokenKey)
}
