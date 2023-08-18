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
  let numSplit = num.toString().split('.'); //将传入的数字以小点为分隔符
  if (numSplit.length == 1) return num.toFixed(fixed); //判断分割出来的数组长度，如果是代表是整数，补零即可
  if (numSplit[1].length <= fixed) {
    numSplit[1] = numSplit[1].padEnd(fixed, '0'); //如果分割的数组长度大于1切小数位的长度小于保留的小数位数则补零
    return numSplit.join('.');
  }
  if (numSplit[1][fixed] >= 5) {
    numSplit[1] = (numSplit[1].slice(0, fixed) * 1 + 1).toString();
    if (numSplit[1].length > fixed) {
      numSplit[0] = (numSplit[0] * 1 + 1).toString();
      numSplit[1] = numSplit[1].slice(1);
    }
  }
  return numSplit.join('.');
}
