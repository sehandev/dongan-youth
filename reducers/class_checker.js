import { createSlice } from '@reduxjs/toolkit'

const class_check_slice = createSlice({
  name: 'class_check',
  initialState: { grade: 1, class: 1 },
  reducers: {
    change_class(state, action) {
      state = Object.assign(state, action.payload)
    },
  },
})

export const { change_class } = class_check_slice.actions
export default class_check_slice.reducer
