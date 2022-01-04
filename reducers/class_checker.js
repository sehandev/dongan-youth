import { createSlice } from '@reduxjs/toolkit'

const class_checker_slice = createSlice({
  name: 'class_checker',
  initialState: { grade: -1, class: -1 },
  reducers: {
    initialize_class(state) {
      state = Object.assign(state, { grade: -1, class: -1 })
    },
    change_class(state, action) {
      state = Object.assign(state, action.payload)
    },
  },
})

export const { initialize_class, change_class } = class_checker_slice.actions
export default class_checker_slice.reducer
