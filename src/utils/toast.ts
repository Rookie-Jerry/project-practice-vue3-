import { ElNotification } from "element-plus";

export default function toast(message: string,type:any='success',duration:number=3000){
    ElNotification({
        message,
        type,
        duration,
      });
}