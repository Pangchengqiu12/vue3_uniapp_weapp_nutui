<template>
  <view class="page index">
    <view class="nav">
      <custom bgColor="white" :isBack="false">
        <!-- <template #backText> 返回 </template> -->
        <template #content> {{ navTitle }} </template>
      </custom>
    </view>
    <view class="main">
      <index v-show="PageCur === 'index'" />
      <shop v-if="PageCur === 'shop'" ref="shopRef" />
    </view>
    <view class="tabbar">
      <view
        class="action"
        @click="navChange"
        :data-cur="item.name"
        :data-title="item.title"
        v-for="item in route"
        :key="item.name"
      >
        <view class="cuIcon-cu-image">
          <image :src="PageCur === item.name ? item.icon : item.iconSel" mode="heightFix"></image>
        </view>
        <view :class="PageCur === item.name ? 'color_main' : ''">{{ item.title }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import index from '@/pages/tabbar/index'
import shop from '@/pages/tabbar/shop'
import { onLoad } from '@dcloudio/uni-app'
import { ref, onMounted, inject } from 'vue'
import { route } from '@/common/config/index'
let PageCur = ref('index')
let navTitle = ref(route[0].title)
const shopRef = ref(null)
function navChange(e) {
  PageCur.value = e.currentTarget.dataset.cur
  navTitle.value = e.currentTarget.dataset.title
}

onLoad(() => {})
</script>

<style lang="scss" scoped>
.index {
  position: relative;
  @include flex-c;
  .main {
    flex: 1 0 0;
    overflow: hidden;
    padding-bottom: calc(100rpx + env(safe-area-inset-bottom) / 2);
  }
  .tabbar {
    width: 100%;
    height: calc(100upx + env(safe-area-inset-bottom) / 2);
    padding-bottom: calc(env(safe-area-inset-bottom) / 2);
    @include flex-r-evely-center;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2;
    color: $tabbarColor;
    text-align: center;
    font-size: $tabbarFontSize;
    background-color: $tabbarBgColor;
    > view {
      flex: 1;
    }
    // .action {
    //   @include flex-c-center-center;
    // }
    .color_main {
      color: $tabbarColorChecked;
    }
    .cuIcon-cu-image image {
      width: 50rpx;
      height: 50rpx;
    }
  }
}
</style>
<style></style>
