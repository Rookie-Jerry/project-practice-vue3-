<template>
  <el-drawer
    v-model="drawer"
    class="draw"
    :size="prop.size"
    :title="prop.title"
    :destroy-on-close="destoreyEL"
    :before-close="CloseDrawer"
  >
    <el-row class="content">
      <el-row class="content-main">
        <el-col>
          <slot></slot>
        </el-col>
      </el-row>
      <el-row class="content-footer">
        <el-col>
          <el-button type="primary" @click="submit" :loading="loading"
            >确定</el-button
          >
          <el-button type="default" @click="CloseDrawer">取消</el-button>
        </el-col>
      </el-row>
    </el-row>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import showMessageBox from "../../utils/messageBox";

type Props = {
  title: string;
  size?: number | string;
  labelWidth?: number | string;
  rules: any;
};
const prop = withDefaults(defineProps<Props>(), {
  title: "标题",
  size: "45%",
  labelWidth: "90px",
  rules: () => {},
});
const _emit = defineEmits(["submit", "close"]);
const drawer = ref<boolean>(false);
// const refForm = ref<FormInstance>();
const destoreyEL = ref<boolean>(false);
const openLoading = () => (loading.value = true);
const closeLoading = () => (loading.value = false);
// 打开弹窗
const openDrawer = () => (drawer.value = true);
// 关闭弹窗
const CloseDrawer = () => {
  showMessageBox(`确定关闭${prop.title}弹窗吗？`).then(()=>{
    _emit("close");
    drawer.value = false;
  })

};
const loading = ref<boolean>(false);
const submit = () => _emit("submit");
defineExpose({
  openDrawer,
  CloseDrawer,
  submit,
  openLoading,
  closeLoading,
});
</script>

<style lang="scss" scoped>
.content{
  height: 100%;
  display: flex;
  flex-direction: column;
  &-main{
    flex: 1;
  }
  &-footer{
    justify-content: end;
    height: 40px;
  }
}
</style>
