<template>
  <view class="shop">
    <custom bgColor="" :isBack="false">
      <!-- <template #backText> 返回 </template> -->
      <template #content> 商城 </template>
    </custom>
    <view class="main">
      <nut-icon name="left"></nut-icon>
      <nut-animate type="shake" :loop="true">
        <nut-button type="primary">shake-抖动</nut-button>
      </nut-animate>
    </view>
  </view>
</template>

<script setup></script>

<style lang="scss" scoped></style>
