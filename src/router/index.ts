import { createRouter,createWebHashHistory,RouteRecordRaw } from "vue-router";
import base from './children/base';
import goods from './children/goods';
const routes:Array<RouteRecordRaw> = [
    ...goods,
    ...base
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router