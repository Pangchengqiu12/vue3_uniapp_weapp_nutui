<template>
  <view class="page index">
    <view class="main">
      <input type="text" />
      <!-- <button @click="navChange">点击</button> -->
      <view class="demo">
        <view class="list" v-for="(item, index) in 20" :key="index">{{ item }}</view>
      </view>
      <nut-button type="primary" @click="navChange">主要按钮</nut-button>
    </view>
  </view>
</template>

<script setup></script>

<style lang="scss" scoped>
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
