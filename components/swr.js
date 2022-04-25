import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function useAttendance(grade_id, class_id, start_date, end_date) {
  const { data, error } = useSWR(
    `/api/attendance/${grade_id}/${class_id}/${start_date}/${end_date}`,
    fetcher,
    {
      refreshInterval: 3000,
    }
  )

  return {
    attendance_data: data,
    is_loading: !error && !data,
    is_error: error,
  }
}

export function useStatistics(group_id, start_date, end_date) {
  const { data, error } = useSWR(
    `/api/statistics/${group_id}/${start_date}/${end_date}`,
    fetcher,
    {
      refreshInterval: 3000,
    }
  )

  return {
    statistics_array: data,
    is_loading: !error && !data,
    is_error: error,
  }
}

export function useStudent(student_id) {
  const { data, error } = useSWR(
    student_id ? `/api/students/${student_id}` : null,
    fetcher,
    {
      refreshInterval: 3000,
    }
  )

  return {
    student_info: data,
    is_loading: !error && !data,
    is_error: error,
  }
}
