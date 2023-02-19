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
  return request({
    url: '/auth/me',
    method: 'GET',
  });
}

export function uploadAvatar(data) {
  console.log('data body', data)
  return request({
    url: '/auth/upload-avatar',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data
  });
}

export function checkFiledExist(data) {
  return request({
    url: '/auth/check-field-exist',
    method: 'post',
    data
  });
}

export function changeEmailProfile(data) {
  return request({
    url: '/auth/change-email-profile',
    method: 'post',
    data
  });
}