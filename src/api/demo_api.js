import * as request from '@/utils/request';
export function Login() {
  return request.$post('user/login', undefined, {
    successMessage: true,
    loading: true,
    errorMessage: true,
  });
}
