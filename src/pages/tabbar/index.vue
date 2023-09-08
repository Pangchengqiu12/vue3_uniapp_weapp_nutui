<template>
  <view class="page index">
    <view class="main">
      <input type="text" />
      <!-- <button @click="navChange">点击</button> -->
      <!-- <view class="demo">
        <view class="list" v-for="(item, index) in 20" :key="index">{{ item }}</view>
      </view> -->
      <nut-button type="primary" @click="login">登录</nut-button>
      <button class="btn">红色</button>
      <button class="btn2">新增</button>
      <navigator url="/pagesA/demo/index" open-type="navigate" hover-class="navigator-hover"> 去pagesA</navigator>
    </view>
  </view>
</template>

<script setup>
import { Login } from '@/api/demo_api';
import { useMemberStore } from '@/stores';
let { setUserInfo } = useMemberStore();
async function login() {
  let { code, data } = await Login({
    username: 125000014,
    password: 125000014,
  });
  console.log(1111111);
  code === 0 ? setUserInfo(data) : '';
}
</script>

<style lang="scss" scoped>
.btn {
  background-color: $btnColor;
}
.btn2 {
  background-color: $tabbarColorChecked;
}
.page {
  height: 100%;
  overflow-y: auto;
}
.demo {
  .list {
    padding: 50rpx;
  }
}
</style>
