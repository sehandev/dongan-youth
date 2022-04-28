import { createSlice } from '@reduxjs/toolkit'

const class_checker_slice = createSlice({
  name: 'class_checker',
  initialState: { group: -1, grade: -1, class: -1 },
  reducers: {
    change_class(state, action) {
      state = Object.assign(state, action.payload)
    },
    initialize_class(state) {
      state = Object.assign(state, { grade: -1, class: -1 })
    },
  },
})

export const { change_class, initialize_class } = class_checker_slice.actions
export default class_checker_slice.reducer
