/**
 *@param {Function} callback 传入的执行函数
 *@param {Number} delay 延迟的时间单位毫秒，默认500
 *@return {Function}
 *@example
 * cont addDebounce= debounce(callback, delay = 500)
 */
export function debounce(callback, delay = 500) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}

/**
 * 11位手机号号码校验
 * @author liwei <2212261902@qq.com>
 * @param {string} phoneNumber 传入的手机号
 * @return {boolean} 返回一个布尔值
 */
export function checkPhone(phoneNumber) {
  let phone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  return phone.test(phoneNumber);
}

/**
 * 保留两位小数
 * @param {number} num 传入的数值
 * @param {number} fixed 需要保留的小数位数:默认是保留两位
 * @return {string}
 */
export function toFixed(num, fixed = 2) {
  let numSplit = num.toString().split('.');
  if (numSplit.length == 1 || !numSplit[1][fixed] || numSplit[1][fixed] <= 4) {
    return num.toFixed(fixed);
  }
  numSplit[1] = +numSplit[1].substring(0, fixed) + 1 + '';
  if (numSplit[1].length > fixed) {
    numSplit[0] = +numSplit[0] + 1;
    numSplit[1] = numSplit[1].substring(1, fixed + 1);
  }
  return numSplit.join('.');
}
