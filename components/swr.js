import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function useAttendance(grade_id, class_id) {
  const { data, error } = useSWR(
    `/api/attendance/${grade_id}/${class_id}`,
    fetcher
  )

  return {
    attendance_data: data,
    is_loading: !error && !data,
    is_error: error,
  }
}

export function useCount(group_id, start_date, end_date) {
  const { data, error } = useSWR(
    `/api/count/${group_id}/${start_date}/${end_date}`,
    fetcher
  )

  return {
    statistics_array: data,
    is_loading: !error && !data,
    is_error: error,
  }
}
