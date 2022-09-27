<template>
  <el-container class="layout">
    <el-header>
      <q-header></q-header>
    </el-header>
    <el-container>
      <q-aside></q-aside>
      <el-main>
        <!-- 标签导航栏 -->
        <q-tag></q-tag>
        <!-- 内容部分 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import QHeader from "./components/Header/index.vue";
import QAside from "./components/AsideBar/index.vue";
import QTag from "./components/TagNav/index.vue";
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  overflow: hidden;
  .el-container {
    display: flex;
    .el-main {
        flex: 1;
      background: #f3f4f6;
    }
  }
}
</style>
