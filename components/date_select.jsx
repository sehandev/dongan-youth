import { useEffect } from 'react'

import { useBoundStore } from '@/store'

export const date_option_array = [
  { value: '2022-12-25' },
  { value: '2022-12-18' },
  { value: '2022-12-11' },
  { value: '2022-12-04' },
  { value: '2022-11-27' },
  { value: '2022-11-20' },
  { value: '2022-11-13' },
  { value: '2022-11-06' },
  { value: '2022-10-30' },
  { value: '2022-10-23' },
  { value: '2022-10-16' },
  { value: '2022-10-09' },
  { value: '2022-10-02' },
  { value: '2022-09-25' },
  { value: '2022-09-18' },
  { value: '2022-09-11' },
  { value: '2022-09-04' },
  { value: '2022-08-28' },
  { value: '2022-08-21' },
  { value: '2022-08-14' },
  { value: '2022-08-07' },
  { value: '2022-07-31' },
  { value: '2022-07-24' },
  { value: '2022-07-17' },
  { value: '2022-07-10' },
  { value: '2022-07-03' },
  { value: '2022-06-26' },
  { value: '2022-06-19' },
  { value: '2022-06-12' },
  { value: '2022-06-05' },
  { value: '2022-05-29' },
  { value: '2022-05-22' },
  { value: '2022-05-15' },
  { value: '2022-05-08' },
  // { value: '2022-05-01' },
  // { value: '2022-04-24' },
  // { value: '2022-04-17' },
  // { value: '2022-04-10' },
  // { value: '2022-04-03' },
  // { value: '2022-03-27' },
  // { value: '2022-03-20' },
  // { value: '2022-03-13' },
  // { value: '2022-03-06' },
  // { value: '2022-02-27' },
  // { value: '2022-02-20' },
  // { value: '2022-02-13' },
  // { value: '2022-02-06' },
  // { value: '2022-01-30' },
  // { value: '2022-01-23' },
  // { value: '2022-01-16' },
  // { value: '2022-01-09' },
  // { value: '2022-01-02' },
]

export const DateSelectBox = ({}) => {
  const start_date = useBoundStore((state) => state.start_date)
  const change_date = useBoundStore((state) => state.change_date)

  // Initialize date
  useEffect(() => {
    if (start_date === '1970-01-01') {
      change_date({ start_date: date_option_array[0].value })
    }
  }, [start_date])

  return (
    <select
      className="focus-visible:outline-none"
      onChange={(e) => {
        change_date({ start_date: e.target.value })
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
