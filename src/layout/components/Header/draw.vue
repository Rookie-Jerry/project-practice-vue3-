<template>
  <el-drawer
    v-model="drawer"
    class="draw"
    size="45%"
    title="修改密码"
    :before-close="handleClose"
  >
    <el-main>
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
    </el-main>
    <el-footer>
      <el-button type="primary" @click="onsubmit()" :loading="loading"
        >确定</el-button
      >
      <el-button type="primary" @click="handleClose()">取消</el-button>
    </el-footer>
  </el-drawer>
</template>

<script lang="ts" setup>
import { FormInstance, FormRules } from "element-plus";
import { reactive, ref } from "vue";
import showMessageBox from "../../../utils/messageBox";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const drawer = ref<boolean>(false);
const refForm = ref<FormInstance>();
interface IpassWord {
  oldpassword: string;
  password: string;
  repassword: string;
}
const passForm = reactive<IpassWord>({
  oldpassword: "",
  password: "",
  repassword: "",
});
const handleClose = (done?: () => void) => {
  showMessageBox("确定关闭修改密码弹窗吗")
    .then(() => {
      drawer.value = false;
    })
    .catch(() => {
      // catch error
    });
};
const rules = reactive<FormRules>({
  oldpassword: [{ required: true, message: "旧密码不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
  repassword: [{ required: true, message: "新密码不能为空", trigger: "blur" }],
});
const loading = ref<boolean>(false);
const onsubmit = () => {
  refForm.value?.validate((valid) => {
    if (!valid) return;
    loading.value = true;
    store
      .dispatch("updatepassword", passForm)
      .then((res) => {
        router.push("/login");
      })
      .finally(() => (loading.value = false));
  });
};
defineExpose({
  drawer,
});
</script>
