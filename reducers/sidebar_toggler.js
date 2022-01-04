import { createSlice } from '@reduxjs/toolkit'

const sidebar_toggler_slice = createSlice({
  name: 'sidebar_toggler',
  initialState: { is_opened: false },
  reducers: {
    toggle_sidebar(state) {
      state = Object.assign(state, {
        is_opened: !state.is_opened,
      })
    },
  },
})

export const { toggle_sidebar } = sidebar_toggler_slice.actions
export default sidebar_toggler_slice.reducer
