import { ResultCode, reLaunchPage } from './config.js'
import { showToast } from '../util.js'
import { useMemberStore } from '@/stores'

let { VITE_BASE_API, VITE_TIMEOUT } = import.meta.env

/**
 * 默认配置
 * @property {boolean} defaultConfig.successMessage 是否显示成功信息
 * @property {boolean} defaultConfig.errorMessage 是否显示错误信息
 * @property {boolean} defaultConfig.cancelSame 是否取消同一请求
 * @property {boolean} defaultConfig.isRetry 是否重试
 * @property {number} defaultConfig.retryTimes 重试次数
 * @property {boolean} defaultConfig.loading 是否显示加载动画
 * @property {boolean} defaultConfig.contentType 是否为json-true: application/x-www-form-urlencoded;charset=UTF-8;false:application/json;charset=UTF-8;
 */
const defaultConfig = {
  successMessage: false,
  errorMessage: true,
  cancelSame: true,
  isRetry: false,
  retryTimes: 2,
  loading: false,
  contentType: false,
}

/**
 * @description:  contentType
 */
const ContentType = {
  // json
  JSON: 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED: 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA: 'multipart/form-data;charset=UTF-8',
}

/**
 * 开启关闭重复请求时保存上次的请求地址
 */
let requestCom = ''

/**
 * 请求
 * @param {Object} { method, url, param }
 * @param {{
 * successMessage:boolean,
 *  errorMessage:boolean,
 *  cancelSame:boolean,
 *  isRetry:boolean,
 *  retryTimes:number,
 *  loading:boolean,
 *  contentType:boolean
 * }} [options={ successMessage: false,errorMessage: true, cancelSame: false,isRetry: false,retryTimes: 2,loading: false,contentType:false,}] - 默认值{}- successMessage:成功提示,默认:false;- errorMessage:失败提示,默认为：true；- cancelSame:取消相同请求，默认为:false;- isRetry:是否重试，默认为：false;- retryTimes:重试次数，默认为：2;- loading:是否开启加载动画，默认为：false;-contentType:是否为json，true: urlencoded,false:json，默认为false
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
    if (method === 'GET' || method === 'DELETE' || options.contentType) {
      header['Content-Type'] = ContentType.FORM_URLENCODED
    }
    header.Authorization = `Bearer ${memberStore?.userInfo?.accessToken}`
    uni.request({
      url: VITE_BASE_API + url,
      method,
      data: param,
      header,
      timeout: VITE_TIMEOUT,
      success: (res) => {
        if (res.statusCode !== 200) return reject(res)
        let {
          data,
          data: { code, msg },
        } = res
        if (code === ResultCode.SUCCESS) {
          options.successMessage ? showToast('success', msg) : '' //显示成功消息
        } else if (code === ResultCode.NO_LOGIN) {
          reLaunchPage()
        } else {
          options.errorMessage ? showToast('error', msg) : ''
        }
        resolve(data)
      },
      fail: async (error) => {
        let { errMsg } = error
        options.errorMessage ? showToast('error', errMsg) : ''
        if (options.isRetry && options.retryTimes > 0) {
          console.log(options, 23)
          options.retryTimes--
          let {
            data,
            data: { code },
          } = await request({ method, url, param }, options)
          code === ResultCode.SUCCESS ? resolve(data) : ''
        } else {
          reject(errMsg)
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
 *  loading:boolean,
 *  contentType:boolean
 * }} [config={}] - 默认值{}- successMessage:成功提示,默认:false;- errorMessage:失败提示,默认为：true；- cancelSame:取消相同请求，默认为:false;- isRetry:是否重试，默认为：false;- retryTimes:重试次数，默认为：2;- loading:是否开启加载动画，默认为：false;-contentType:是否为json，true: urlencoded,false:json，默认为false
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
 *  loading:boolean,
 *  contentType:boolean
 * }} [config={}] - 默认值{}- successMessage:成功提示,默认:false;- errorMessage:失败提示,默认为：true；- cancelSame:取消相同请求，默认为:false;- isRetry:是否重试，默认为：false;- retryTimes:重试次数，默认为：2;- loading:是否开启加载动画，默认为：false;-contentType:是否为json，true: urlencoded,false:json，默认为false
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
 *  loading:boolean,
 *  contentType:boolean
 * }} [config={}] - 默认值{}- successMessage:成功提示,默认:false;- errorMessage:失败提示,默认为：true；- cancelSame:取消相同请求，默认为:false;- isRetry:是否重试，默认为：false;- retryTimes:重试次数，默认为：2;- loading:是否开启加载动画，默认为：false;-contentType:是否为json，true: urlencoded,false:json，默认为false
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
 *  loading:boolean,
 *  contentType:boolean
 * }} [config={}] - 默认值{}- successMessage:成功提示,默认:false;- errorMessage:失败提示,默认为：true；- cancelSame:取消相同请求，默认为:false;- isRetry:是否重试，默认为：false;- retryTimes:重试次数，默认为：2;- loading:是否开启加载动画，默认为：false;-contentType:是否为json，true: urlencoded,false:json，默认为false
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
