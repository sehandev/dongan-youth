import { createSlice } from '@reduxjs/toolkit'

const sidebar_toggler_slice = createSlice({
  name: 'sidebar_toggler',
  initialState: { is_opened: true },
  reducers: {
    open_sidebar(state) {
      state = Object.assign(state, {
        is_opened: true,
      })
    },
    close_sidebar(state) {
      state = Object.assign(state, {
        is_opened: false,
      })
    },
  },
})

export const { open_sidebar, close_sidebar } = sidebar_toggler_slice.actions
export default sidebar_toggler_slice.reducer
