import { FormInstance, FormRules } from "element-plus";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export function useChangePassword() {
  const store = useStore();
  const router = useRouter();
  const refDrawer = ref<any>(null);
  const refForm = ref<FormInstance>();
  // 修改密码
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
  const rules = reactive<FormRules>({
    oldpassword: [
      { required: true, message: "旧密码不能为空", trigger: "blur" },
    ],
    password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
    repassword: [
      { required: true, message: "新密码不能为空", trigger: "blur" },
    ],
  });
  const onsubmit = () => {
    refForm.value?.validate((valid) => {
      if (!valid) return;
      // loading.value = true;
      refDrawer.value.openLoading();
      store
        .dispatch("updatepassword", passForm)
        .then((res) => {
          router.push("/login");
        })
        .finally(() => refDrawer.value.closeLoading());
    });
  };
  const CloseDrawer = () => {
    refForm.value?.resetFields();
  };
  const openDawer = ()=> refDrawer.value.openDrawer()
  return {
    refForm,
    passForm,
    refDrawer,
    rules,
    onsubmit,
    CloseDrawer,
    openDawer
  };
}
