<template>
  <el-row class="login">
    <el-col :lg="16" :md="12" class="login-left">
      <div class="left-con">
        <div class="con-title">欢迎光临</div>
        <div class="con-des">此站点是《Vue3商城后台管理系统开发》</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="login-right">
      <div class="login-right-container">
        <div class="login-right-container-header">欢迎回来</div>
        <div class="login-right-container-title">
          <span class="line"></span>
          <span>账号密码登录</span>
          <span class="line"></span>
        </div>
        <el-form
          ref="ruleFormRef"
          class="login-right-container-form"
          :model="ruleForm"
          :rules="rules"
        >
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username" placeholder="请输入账号">
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              placeholder="请输入密码"
              type="password"
              show-password
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loginLoading"
              color="#626AEF"
              round
              type="primary"
              @click="submitForm(ruleFormRef)"
              >登 录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted } from "vue";
import { FormInstance, FormRules } from "element-plus";
import { UserInfo } from "./type";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<UserInfo>({
  username: "",
  password: "",
});
const loginLoading = ref<boolean>(false);
const rules = reactive<FormRules>({
  username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, _fields) => {
    if (valid) {
      loginLoading.value = true;
      await store
        .dispatch("login", ruleForm)
        .then(() => {
          // 跳转后天首页
          router.push("/");
        })
        .finally(() => {
          loginLoading.value = false;
        });
    }
  });
};
const onKeyUp = (e: any) => {
  if (e.key === "Enter") {
    submitForm(ruleFormRef.value);
  }
};
onMounted(() => {
  document.addEventListener("keyup", onKeyUp);
});
</script>

<style lang="scss" scoped>
.login {
  //   height: 100vh;
  // 使用windicss插件
  @apply min-h-screen;
  &-left {
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
    // 使用windicss插件
    @apply bg-indigo-500 flex flex-col justify-center items-center;
    .left-con {
      // @apply
      .con-title {
        // font-size: 2.25rem;
        // font-weight: bold;
        // color: #fff;
        @apply text-light-50 text-5xl font-bold mb-4;
      }
      .con-des {
        // font-size: 0.75rem;
        // color: #fff;
        @apply text-light-50 text-sm;
      }
    }
  }
  &-right {
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
    // 使用windicss插件
    @apply bg-light-50 flex flex-col justify-center items-center;
    &-container {
      @apply flex flex-col justify-center items-center;
      &-header {
        @apply text-gray-900 text-3xl font-bold;
      }
      &-title {
        @apply flex items-center my-5 text-gray-300 space-x-2;
        .line {
          @apply h-[1px] w-16 bg-gray-200;
        }
      }
      &-form {
        @apply w-[250px] flex flex-col items-center;
        ::v-deep(.el-input) {
          @apply w-[250px];
        }
        ::v-deep(.el-button) {
          @apply w-[250px];
        }
      }
    }
  }
}
</style>
