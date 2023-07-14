import { $post, $get } from '@/utils/request' //eslint-disable-line

export function Login(param) {
  return $post('app-api/crm/auth/jxs/login', param, {
    successMessage: true,
    loading: true,
  })
}
