import * as request from '@/utils/request'
export function Login() {
  return request.$post('app-api/crm/auth/jxs/login', undefined, {
    successMessage: true,
    loading: true,
    errorMessage: true,
  })
}
