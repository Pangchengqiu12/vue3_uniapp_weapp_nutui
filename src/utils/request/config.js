// export const IP = (() => {
//   if (process.env.NODE_ENV === 'development') {
//     return 'http://192.168.31.171:48080/'
//   } else {
//     return 'http://192.168.31.107:48080/'
//   }
// })()
// export const TIMEOUT = 5000
export const IMGIP = import.meta.env.VITE_IMG //图片ip

/**
 * {{SUCCESS，NO_LOGIN}} ResultCode
 */
export const ResultCode = {
  SUCCESS: 0,
  NO_LOGIN: 403,
}

/**
 * @description 用户未登录跳转页面
 */
export function reLaunchPage() {
  uni.showModal({
    title: '提示',
    content: '当前用户未登陆，请前往登录页进行登陆',
    success: (res) => {
      if (res.confirm) {
        //跳转至授权页面
        uni.reLaunch({ url: '/pages/login/index' })
      } else {
        uni.reLaunch({ url: '/pages/index/index' })
      }
    },
  })
}

export const ErrorMessage = {}
export const route = [
  {
    name: 'index',
    title: '首页',
    icon: '../../static/tabBar/index_cur.png',
    iconSel: '../../static/tabBar/index.png',
  },
  {
    name: 'shop',
    title: '商城',
    icon: '../../static/tabBar/shop_cur.png',
    iconSel: '../../static/tabBar/shop.png',
  },
]
