<template>
  <div class="header">
    <div class="left pl-10">
      <img class="logo" src="@/assets/vue.svg" />
      <h1 class="title">VUE3商城后台</h1>
    </div>
    <div class="right">
      <div class="right-left">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="伸缩"
          placement="bottom"
        >
          <el-icon class="icon-wh" @click="store.commit('SWITCH_MENUWIDTH')"><Fold /></el-icon>
        </el-tooltip>
        <el-tooltip
          class="box-item"
          effect="dark"
          content="刷新"
          placement="bottom"
        >
          <el-icon class="icon-wh" @click="fresh()"><Refresh /></el-icon>
        </el-tooltip>
      </div>
      <div class="right-right">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="全屏"
          placement="bottom"
        >
          <el-icon class="icon-wh" @click="switchScreen"
            ><FullScreen v-if="!isFullscreen" /> <Aim v-else
          /></el-icon>
        </el-tooltip>
        <el-dropdown @command="handleDropDown">
          <span class="el-dropdown-link text-light-50 flex items-center">
            <el-avatar
              class="mr-2"
              :size="25"
              :src="store.state.userInfo?.avatar"
            />
            {{ store.state.userInfo?.username }}
            <el-icon class="el-icon--right ml-1">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="changePassword"
                >修改密码</el-dropdown-item
              >
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
  <!-- <drawer ref="refDrawer"></drawer> -->
  <form-drawer
    ref="refDrawer"
    :title="'修改密码'"
    @submit="onsubmit"
    @close="CloseDrawer"
  >
    <el-form ref="refForm" :model="passForm" labelWidth="90px" :rules="rules">
      <el-form-item label="旧密码" prop="oldpassword">
        <el-input
          v-model="passForm.oldpassword"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input
          v-model="passForm.password"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input
          v-model="passForm.repassword"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
  </form-drawer>
</template>

<script setup lang="ts">
import { useFullscreen } from "@vueuse/core";
import FormDrawer from "@/components/FormDrawer/index.vue";
import { useChangePassword } from "../../../hook/useChangePassword";
import { useLogout } from "../../../hook/useLogout";
import { useStore } from "vuex";

const { isFullscreen, toggle } = useFullscreen();
const store = useStore();
const {
  refForm,
  refDrawer,
  passForm,
  rules,
  onsubmit,
  CloseDrawer,
  openDawer,
} = useChangePassword();

const { logout } = useLogout();
const fresh = () => {
  location.reload();
};
const handleDropDown = (state: string | number | object) => {
  switch (state) {
    case "changePassword":
      openDawer();
      break;
    case "logout":
      logout();
      break;
  }
};
// 切换全屏
const switchScreen = () => toggle();
</script>

<style lang="scss" scoped>
.icon-wh {
  width: 42px !important;
  height: 64px !important;
  color: #fff;
  &:hover {
    @apply bg-indigo-600;
  }
}
.header {
  @apply h-[64px] flex justify-between items-center bg-indigo-500 fixed top-0 left-0 right-0;
  .left {
    @apply w-[250px] flex items-center;
    .logo {
      @apply mr-2;
      width: 20px;
      height: 20px;
    }
    .title {
      font-size: 20px;
      color: white;
    }
  }
  .right {
    @apply flex-1 flex justify-between items-center;
    &-right {
      @apply flex items-center;
      ::v-deep(.el-dropdown) {
        margin: 0 20px;
      }
    }
  }
}
</style>
