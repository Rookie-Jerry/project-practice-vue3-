<template>
  {{ store.state.userInfo }}
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { delToken } from "../api/auth";
import showMessageBox from "../utils/messageBox";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();
const loginOut = () => {
  showMessageBox("是否推出登录").then(async () => {
    await store.dispatch('logout',{})
    router.push('/login');
  });
};
// console.log
</script>

<style lang="sass" scoped></style>
