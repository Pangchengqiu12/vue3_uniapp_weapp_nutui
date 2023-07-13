import { IP, TIMEOUT, routeWhiteList, ResultCode } from './config.js'
import { showToast } from '../util.js'
import { useMemberStore } from '@/stores'

const defaultConfig = {
  successMessage: false, //成功提示
  errorMessage: true, //失败提示
  cancelSame: false, //取消相同请求（未实现）
  isRetry: false, //是否重试
  retryTimes: 2, //重试次数
  loading: false, //是否开启加载动画
}
const request = ({ method, url, param }, options) => {
  const memberStore = useMemberStore()
  return new Promise((resolve, reject) => {
    //是否开启加载动画
    options.loading ? uni.showLoading({ title: '加载中' }) : ''
    let header = {}
    if (method === 'GET' || method === 'DELETE' || routeWhiteList.get(url))
      header['Content-Type'] = 'application/x-www-form-urlencoded'
    header.Authorization = `Bearer ${memberStore?.userInfo?.accessToken}`
    uni.request({
      url: IP + url,
      method,
      data: param,
      header,
      timeout: TIMEOUT,
      success: (res) => {
        if (res.statusCode !== 200) return
        let {
          data,
          data: { code, msg },
        } = res
        if (code === ResultCode.SUCCESS) {
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
      },
    })
  })
}

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
