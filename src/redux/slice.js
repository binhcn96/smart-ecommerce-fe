import { createSlice } from '@reduxjs/toolkit'
import { setLocalStorage } from 'util/utility'
import { fetchUserInfo, loginSSO, loginUser } from './action'

const initialState = {
  user: null,
  loading: 'idle',
  showMenu: true,
  path: null
}

export const appSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeShowMenu: (state, action) => {
      state.showMenu = action.payload
    },
    forbiden: (state, action) => {
      state.loading = 'done'
      state.user = null
    },
    changePath: (state, action) => {
      state.path = action.payload
    },
  },
  extraReducers: {
    [fetchUserInfo.fulfilled]: (state, action) => {
      state.user = action.payload
      state.loading = 'done'
    },
    [fetchUserInfo.pending]: (state) => {
      state.loading = 'loading'
    },
    [fetchUserInfo.rejected]: (state) => {
      state.loading = 'error'
    },
    [loginUser.fulfilled]: (state, action) => {
      console.log(action);
      state.user = action.payload.data
      setLocalStorage(action.payload.token, action.payload.refreshToken);
      state.loading = 'done'
    },
    [loginUser.pending]: (state) => {
      state.loading = 'loading'
    },
    [loginUser.rejected]: (state) => {
      state.loading = 'error'
    },
    [loginSSO.fulfilled]: (state, action) => {
      state.user = action.payload.data
      setLocalStorage(action.payload.token, action.payload.refresh_token);
      state.loading = 'done'
    },
    [loginSSO.pending]: (state) => {
      state.loading = 'loading'
    },
    [loginSSO.rejected]: (state) => {
      state.loading = 'error'
    },
  }
})

export const { changeShowMenu, changeLoading, changePath } = appSlice.actions

export default appSlice.reducer