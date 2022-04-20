import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { change_date } from '../reducers/date_checker'

export const DateSelectBox = ({}) => {
  const dispatch = useDispatch()
  const start_date = useSelector((state) => state.date_checker.start_date)

  const date_option_array = [
    { value: '2022-03-13' },
    { value: '2022-03-06' },
    { value: '2022-02-27' },
    { value: '2022-02-20' },
    { value: '2022-02-13' },
    { value: '2022-02-06' },
    { value: '2022-01-30' },
    { value: '2022-01-23' },
    { value: '2022-01-16' },
    { value: '2022-01-09' },
    { value: '2022-01-02' },
  ]

  // Initialize date
  useEffect(() => {
    if (start_date == '1970-01-01') {
      dispatch(change_date({ start_date: date_option_array[0].value }))
    }
  }, [start_date])

  return (
    <select
      className='focus-visible:outline-none'
      onChange={(e) => {
        dispatch(change_date({ start_date: e.target.value }))
      }}
      value={start_date}
    >
      {date_option_array.map((date_option) => (
        <option key={date_option.value} value={date_option.value}>
          {date_option.value}
        </option>
      ))}
    </select>
  )
}
