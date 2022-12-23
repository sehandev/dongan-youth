import { useEffect } from 'react'

import { useBoundStore } from '@/store'
export const DateSelectBox = ({}) => {
  const date_array = useBoundStore((state) => state.date_array)
  const start_date = useBoundStore((state) => state.start_date)
  const change_date = useBoundStore((state) => state.change_date)

  // Initialize date
  useEffect(() => {
    if (start_date === '1970-01-01') {
      change_date({ start_date: date_array[0] })
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
      {date_array.map((date_option) => (
        <option key={date_option} value={date_option}>
          {date_option}
        </option>
      ))}
    </select>
  )
}
