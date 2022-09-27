import { UserInfo } from './../views/type';
import { url } from "inspector";
import http from "./index";
import { IpassWord } from './type';

/**
 * 登录
 */
export const login = (username:string,password:string)=>{
    return http.post('/admin/login',{
        username,
        password
    })
}
/**
 * 获取用户信息
 */
export function getInfo(){
    return http.post('/admin/getinfo')
}
/**
 * 退出登录
 */
export function logout(){
    return http.post('/admin/logout')
}
/**
 * 修改密码
 */
export function changePassword(params:IpassWord){
    return http.post('/admin/updatepassword',params)
}
