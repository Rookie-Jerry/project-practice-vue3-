import NProgress from "nprogress";

export function loadingStart(){
    return NProgress.start();
}

export function loadingEnd(){
    return NProgress.done();
}