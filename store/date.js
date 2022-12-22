export const create_date_slice = (set) => ({
  start_date: '1970-01-01',
  end_date: '1970-01-01',
  change_date: ({ start_date }) => {
    const tmp_date = new Date(start_date)
    tmp_date.setDate(tmp_date.getDate() + 6)
    const end_date = tmp_date.toISOString().slice(0, 10)
    set({ start_date: start_date, end_date: end_date })
  },
})
