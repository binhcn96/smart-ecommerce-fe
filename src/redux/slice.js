import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: 'binh',
  loading: false,
  showMenu: true
}

export const appSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeShowMenu: (state, action) => {
      state.showMenu = action.payload
    }
  },
})

export const { changeShowMenu } = appSlice.actions

export default appSlice.reducer