import { ElMessageBox } from "element-plus";
import { messageType  } from 'element-plus'
// 封装确定消息提示框 
export default function showMessageBox(content: string = "提示内容",type: messageType  | undefined ='warning',title: string = "") {
  return ElMessageBox.confirm(
            content,
            title, 
            {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: type,
        });
  
}
