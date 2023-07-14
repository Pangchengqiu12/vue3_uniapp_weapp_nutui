// export const IP = (() => {
//   if (process.env.NODE_ENV === 'development') {
//     return 'http://192.168.31.171:48080/'
//   } else {
//     return 'http://192.168.31.107:48080/'
//   }
// })()
// export const TIMEOUT = 5000
export const IMGIP = import.meta.env.VITE_IMG //图片ip
// 路由白名单,设置需要设置请求头的 content-type为x-www-form-urlencoded
export let routeWhiteList = new Map([['app-api/crm/notice/read', true]])

/**
 * @description:ResultCode
 */
export const ResultCode = {
  SUCCESS: 0,
  NO_LOGIN: 403,
}

export const ErrorMessage = {}
