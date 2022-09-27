<template>
  <h3>随机选座</h3>
  <el-button type="primary" @click="open">选票</el-button>
  <div class="sitMap">
    <div class="left">
      <div class="row" v-for="(item, index) in A">
        <div class="col" v-for="item2 in item.col">
          <span class="content" v-if="arr.includes(item2.id)">
            {{ item2.position }}
          </span>
        </div>
      </div>
    </div>
    <div class="span"></div>
    <div class="right">
      <div class="row" v-for="(item, index) in B">
        <div class="col" v-for="item2 in item.col">
          <span class="content" v-if="arr.includes(item2.id)">
            {{ item2.position }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Action, ElMessage, ElMessageBox } from "element-plus";
import { reactive, ref } from "vue";
let isShow = ref("red");
let sum = 0;
const mapData = ref(
  Array.apply(null, { length: 20 } as number[]).map((item, index) => {
    console.log(index);
    let col = [];

    if (index > 9) {
      for (let i = 0; i < index - 5; i++) {
        sum++;
        col.push({
          id: sum,
          position: `${index - 9}排${i + 1}列`,
        });
      }
    } else {
      for (let i = 0; i < 5 + index; i++) {
        sum++;
        col.push({
          id: sum,
          position: `${index + 1}排${i + 1}列`,
        });
      }
    }

    let position = index > 9 ? "B" : "A";
    return {
      id: index,
      position,
      col,
    };
  })
);
const A = reactive(mapData.value.slice(0, 10));
const B = reactive(mapData.value.slice(10, 20));
type Person = {
  list?: Array<number>;
};
let arr = ref<number[]>([]);
const random = (n: number) => {
  arr.value = [];
  for (let i = 0; i < n; i++) {
    let randomNum = Math.ceil(Math.random() * 190);
    if (arr.value.includes(randomNum)) {
      randomNum = Math.ceil(Math.random() * 190);
    }
    arr.value.push(randomNum);
  }
  console.log(arr);
};

const open = () => {
  ElMessageBox.prompt("请输入购票张树", "购票提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    inputPattern: /^[1-5]/,
    inputErrorMessage: "请输入1~5的数字",
  })
    .then(({ value }) => {
      random(Number(value));
      ElMessage({
        type: "success",
        message: `成功购买${value}张票`,
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消输入",
      });
    });
};
</script>

<style lang="scss" scoped>
.sitMap {
  width: 1600px;
  height: 810px;
  overflow: auto;
  display: flex;
  justify-content: space-between;

  .left {
    width: 48%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column-reverse;
    justify-content: flex-end;
    .row {
      margin-bottom: 20px;
      .col {
        width: 40px;
        height: 40px;
        float: right;
        border: 1px solid #ccc;
        margin-right: 10px;
        font-size: 12px;
        .content {
          display: block;
          height: 100%;
          font-size: 12px;
          background: skyblue;
        }
      }
    }
  }
  .span {
    display: block;
    width: 1px;
    height: 100%;
    border: 1px dashed black;
  }
  .right {
    // display: flex;
    width: 48%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column-reverse;
    justify-content: flex-end;
    .row {
      margin-bottom: 20px;
      width: 100%;
      .col {
        width: 40px;
        height: 40px;
        float: left;
        border: 1px solid #ccc;
        margin-right: 10px;
        font-size: 12px;
        .content {
          display: block;
          height: 100%;
          font-size: 12px;
          background: skyblue;
        }
      }
    }
  }
}
</style>
