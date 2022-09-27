<template>
  <el-result
    icon="warning"
    class="notFound"
    title="404提示"
    sub-title="你找的页面走丢了~"
  >
    <template #extra>
      <el-button type="primary" @click="back">返回首页</el-button>
    </template>
  </el-result>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const back = () => {
  router.push('/');
};
</script>

<style lang="scss" scoped>
.notFound {
  width: 100%;
  height: 100%;
}
</style>
