import request from '../api/request'

export const createUser = async (data) => {
  return await request({
    method: 'POST',
    url: '/auth/register',
    data
  })
}

export const login = async (data) => {
  return await request({
    method: 'POST',
    url: '/auth/login',
    data
  })
}

export function loginGoogleSSO(data) {
  return request({
    url: '/auth/login-gg-sso',
    method: 'POST',
    data,
  });
}

export function getMe() {
  console.log('get me');
  return request({
    url: '/auth/me',
    method: 'GET',
  });
}