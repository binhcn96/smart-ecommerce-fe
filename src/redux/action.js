import { createAsyncThunk } from "@reduxjs/toolkit"
import { getMe, login, loginGoogleSSO, uploadAvatar } from "services/user"
import { statusResponse } from "util/common"

export const fetchUserInfo = createAsyncThunk(
  'auth/me',
  async (user, thunk_api) => {
    try {
      const token = localStorage.getItem('Auth-token')
      if (!token) {
        return null
      }
      const response = await getMe()
      if (response.status === statusResponse.SUCCESS) {
        return response.data
      }
      return null
    } catch (error) {
      return null
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/login',
  async (payload) => {
    const response = await login(payload)
    return response.data
  }
)

export const loginSSO = createAsyncThunk(
  'auth/loginSSO',
  async (payload) => {
    const response = await loginGoogleSSO(payload)
    return response
  }
)

export const upLoadAvatar = createAsyncThunk(
  'auth/uploadAvatar',
  async (payload) => {
    const formData = new FormData()
    formData.append('file', payload)
    const response = await uploadAvatar(formData)
    return response
  }
)