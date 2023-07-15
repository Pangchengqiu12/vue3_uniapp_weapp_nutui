import { routeWhiteList, ResultCode } from './config.js'
import { showToast } from '../util.js'
import { useMemberStore } from '@/stores'
let { VITE_BASE_API, VITE_TIMEOUT } = import.meta.env

/**
 * {{ successMessage: 成功提示, errorMessage：失败提示, cancelSame：取消相同请求, isRetry：是否重试, retryTimes：重试次数, loading：是否开启加载动画 }} defaultConfig
 */
const defaultConfig = {
  successMessage: false,
  errorMessage: true,
  cancelSame: true,
  isRetry: false,
  retryTimes: 2,
  loading: false,
}

/**
 * 开启关闭重复请求时保存上次的请求地址
 */
let requestCom = ''

/**
 * 请求
 * @param {Object} { method, url, param }
 * @param {Object} options  {
  successMessage: false,
  errorMessage: true,
  cancelSame: false,
  isRetry: false,
  retryTimes: 2,
  loading: false,
}
 */
const request = ({ method, url, param }, options) => {
  if (options.cancelSame) {
    let requestUrl = method + url + JSON.stringify(param || {})
    if (requestCom === requestUrl) return Promise.reject('重复请求')
    requestCom = requestUrl
  }
  const memberStore = useMemberStore()
  return new Promise((resolve, reject) => {
    //是否开启加载动画
    options.loading ? uni.showLoading({ title: '加载中' }) : ''
    let header = {}
    if (method === 'GET' || method === 'DELETE' || routeWhiteList.get(url))
      header['Content-Type'] = 'application/x-www-form-urlencoded'
    header.Authorization = `Bearer ${memberStore?.userInfo?.accessToken}`
    uni.request({
      url: VITE_BASE_API + url,
      method,
      data: param,
      header,
      timeout: VITE_TIMEOUT,
      success: (res) => {
        if (res.statusCode !== 200) return
        let {
          data,
          data: { code, msg },
        } = res
        if (code === ResultCode.SUCCESS) {
          options.successMessage ? showToast('success', msg) : '' //显示成功消息
          resolve(data)
        } else if (code === ResultCode.NO_LOGIN) {
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
        } else {
          options.errorMessage ? showToast('error', msg) : ''
          reject(data)
        }
      },
      fail: (error) => {
        let { errMsg } = error
        options.errorMessage ? showToast('error', errMsg) : ''
        if (options.isRetry && options.retryTimes > 0) {
          console.log(options, 23)
          options.retryTimes--
          request({ method, url, param }, options)
        }
      },
      complete: () => {
        options.loading ? uni.hideLoading() : ''
        options.cancelSame ? (requestCom = '') : ''
      },
    })
  })
}

// const requests = {
//   post(url, param, config = {}) {
//     const options = Object.assign({}, defaultConfig, config)
//     return request({ method: 'POST', url, param }, options)
//   },
//   get(url, param, config = {}) {
//     const options = Object.assign({}, defaultConfig, config)
//     return request({ method: 'POST', url, param }, options)
//   },
//   put(url, param, config = {}) {
//     const options = Object.assign({}, defaultConfig, config)
//     return request({ method: 'POST', url, param }, options)
//   },
//   delete(url, param, config = {}) {
//     const options = Object.assign({}, defaultConfig, config)
//     return request({ method: 'POST', url, param }, options)
//   },
// }
// export default requests

/**
 * @param {string} url
 * @param {object} param
 * @param {{
 * successMessage:boolean,
 *  errorMessage:boolean,
 *  cancelSame:boolean,
 *  isRetry:boolean,
 *  retryTimes:number,
 *  loading:boolean
 * }} [config={}] - 默认值{}- successMessage:成功提示- errorMessage:失败提示- cancelSame:取消相同请求- isRetry:是否重试- retryTimes:重试次数- loading:是否开启加载动画
 * @returns {function request({method: 'POST',url,param,},options,) {}}
 */
export function $post(url, param, config) {
  const options = Object.assign({}, defaultConfig, config)
  return request(
    {
      method: 'POST',
      url,
      param,
    },
    options,
  )
}

/**
 *
 * @param {string} url
 * @param {object} param
 * @param {{
 * successMessage:boolean,
 *  errorMessage:boolean,
 *  cancelSame:boolean,
 *  isRetry:boolean,
 *  retryTimes:number,
 *  loading:boolean
 * }} [config={}] - 默认值{}- successMessage:成功提示- errorMessage:失败提示- cancelSame:取消相同请求- isRetry:是否重试- retryTimes:重试次数- loading:是否开启加载动画
 * @returns {function request({method: 'GET',url,param,},options,) {}}
 */
export function $get(url, param, config = {}) {
  const options = Object.assign({}, defaultConfig, config)
  console.log(options, config, 12)
  return request(
    {
      method: 'GET',
      url,
      param,
    },
    options,
  )
}

/**
 *
 * @param {string} url
 * @param {object} param
 * @param {{
 * successMessage:boolean,
 *  errorMessage:boolean,
 *  cancelSame:boolean,
 *  isRetry:boolean,
 *  retryTimes:number,
 *  loading:boolean
 * }} [config={}] - 默认值{}- successMessage:成功提示- errorMessage:失败提示- cancelSame:取消相同请求- isRetry:是否重试- retryTimes:重试次数- loading:是否开启加载动画
 * @returns {function request({method: 'PUT',url,param,},options,) {}}
 */
export function $put(url, param, config) {
  const options = Object.assign({}, defaultConfig, config)
  return request(
    {
      method: 'PUT',
      url,
      param,
    },
    options,
  )
}

/**
 *
 * @param {string} url
 * @param {object} param
 * @param {{
 * successMessage:boolean,
 *  errorMessage:boolean,
 *  cancelSame:boolean,
 *  isRetry:boolean,
 *  retryTimes:number,
 *  loading:boolean
 * }} [config={}] - 默认值{}- successMessage:成功提示- errorMessage:失败提示- cancelSame:取消相同请求- isRetry:是否重试- retryTimes:重试次数- loading:是否开启加载动画
 * @returns {function request({method: 'DELETE',url,param,},options,) {}}
 */
export function $delete(url, param, config) {
  const options = Object.assign({}, defaultConfig, config)
  return request(
    {
      method: 'DELETE',
      url,
      param,
    },
    options,
  )
}
