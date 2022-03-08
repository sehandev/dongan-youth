import { createSlice } from '@reduxjs/toolkit'

const date_checker_slice = createSlice({
  name: 'date_checker',
  initialState: { start_date: '1970-01-01', end_date: '1970-01-01' },
  reducers: {
    change_date(state, action) {
      const tmp_date = new Date(action.payload.start_date)
      tmp_date.setDate(tmp_date.getDate() + 6)
      action.payload.end_date = tmp_date.toISOString().slice(0, 10)
      action.payload.state = Object.assign(state, action.payload)
    },
  },
})

export const { change_date } = date_checker_slice.actions
export default date_checker_slice.reducer
