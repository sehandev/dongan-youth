import { createSlice } from '@reduxjs/toolkit'

const group_manager_slice = createSlice({
  name: 'group_manager',
  initialState: { group: -1 },
  reducers: {
    change_group(state, action) {
      state = Object.assign(state, action.payload)
    },
  },
})

export const { change_group } = group_manager_slice.actions
export default group_manager_slice.reducer
