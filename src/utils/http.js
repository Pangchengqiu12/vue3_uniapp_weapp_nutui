import { IP, TIMEOUT, routeWhiteList, ResultCode } from '@/utils/config.js'
import { useMemberStore } from '@/stores'
import { showToast } from '@/common/utils/util.js'

const defaultConfig = {
  successMessage: false,
  errorMessage: true,
  cancelSame: false,
  isRetry: false,
  retryCount: 3,
  loading: true,
}

const request = ({ method, url, param }, options) => {
  const memberStore = useMemberStore()
  return new Promise((resolve, reject) => {
    let header = {}
    if (method === 'GET' || method === 'DELETE' || routeWhiteList.get(url)) {
      header['Content-Type'] = 'application/x-www-form-urlencoded'
    }
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
        } else if (code === ResultCode.LOGIN) {
          uni.showModal({
            title: '提示',
            content: '当前用户未登陆，请前往登录页进行登陆',
            success: (res) => {
              //跳转登录页面
              res.confirm ? uni.reLaunch({ url: '/pages/login/login' }) : uni.reLaunch({ url: '/pages/index/index' })
            },
          })
        } else {
          showToast('error', msg)
          reject(data)
        }
      },
      fail: (error) => {
        let { errMsg } = error
        showToast('error', errMsg)
        reject(errMsg)
      },
      complete: () => {
        uni.hideLoading()
      },
    })
  }).catch((err) => {
    options.isRetry && options.retryCount > 0
      ? request({ method, url, param }, options.retryCount - 1)
      : Promise.reject(err)
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

export function $get(url, param, config) {
  const options = Object.assign({}, defaultConfig, config)
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
