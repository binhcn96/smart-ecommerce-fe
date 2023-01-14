import request from '../api/request'

export const getCodeSms = async (data) => {
  return await request({
    method: 'POST',
    url: '/sms/get-code-sms',
    data
  })
}

export const verifyCodeSms = async (data) => {
  return await request({
    method: 'POST',
    url: '/sms/verify-code-sms',
    data
  })
}

