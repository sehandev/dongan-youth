import moment from 'moment'

import { get_date_array } from '@/utils/date_array'

export const create_date_slice = (set) => ({
  start_date: '1970-01-01',
  end_date: '1970-01-01',
  change_date: ({ start_date }) => {
    const tmp_date = moment(start_date)
    tmp_date.add(6, 'days')
    const end_date = tmp_date.format('YYYY-MM-DD')
    set({ start_date: start_date, end_date: end_date })
  },
  date_array: get_date_array(),
})
