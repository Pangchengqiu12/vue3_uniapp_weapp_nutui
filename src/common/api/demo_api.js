import * as request from '@/utils/request' //eslint-disable-line

export function Login(param) {
  return request.$post('app-api/crm/auth/jxs/login', param, {
    successMessage: true,
    loading: true,
  })
}
