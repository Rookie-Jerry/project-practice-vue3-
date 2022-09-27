<template>
  <div class="aside" :style="{ width: store.state.menuWidth }">
    <el-menu
      :default-active="defaultActive"
      :collapse="isCollapse"
      :collapse-transition="false"
      :unique-opened="true"
      @select="click"
    >
      <template v-for="item in data" :key="item.id">
        <el-sub-menu
          v-if="item.child && item.child.length > 0"
          :index="item.name"
        >
          <template #title>
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="item2 in item.child"
            :index="item2.frontpath"
            :key="item2.id"
          >
            <template #title>
              <el-icon><component :is="item2.icon" /></el-icon>
              <span>{{ item2.name }}</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item :index="item.frontpath" v-else>
          <el-icon><component :is="item.icon" /></el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import {  ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
// 默认选中
const defaultActive = ref(route.path);
const router = useRouter();
const store = useStore();
const isCollapse = computed(() => store.state.menuWidth !== "250px");
const data = computed(()=> store.state.menus)

const click = (e:any) => {
  router.push(e);
};
</script>

<style lang="scss" scoped>
.aside {
  @apply h-full shadow;
  background: #fff;
  transition: width 0.6s;
  overflow: auto;
  ::v-deep(.el-menu) {
    border: none;
    position: static;
  }
}
</style>
