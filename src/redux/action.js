import { createAsyncThunk } from "@reduxjs/toolkit"
import { getMe, login, loginGoogleSSO } from "services/user"
import { statusResponse } from "util/common"

export const fetchUserInfo = createAsyncThunk(
  'auth/me',
  async (user, thunk_api) => {
    try {
      console.log('vao day');
      const token = localStorage.getItem('Auth-token')
      if (!token) {
        return null
      }
      const response = await getMe()
      console.log(response)
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