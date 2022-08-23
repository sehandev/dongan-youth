import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function useMembers(group) {
  const { data, error } = useSWR(group ? `/api/members/group/${group}` : null, fetcher)

  return {
    member_array: data,
    is_loading: !error && !data,
    is_error: error,
  }
}

export function useMember(id) {
  const { data, error } = useSWR(id ? `/api/member/${id}` : null, fetcher)

  return {
    member: data,
    is_loading: !error && !data,
    is_error: error,
  }
}

export function useAttendanceByDate(date) {
  const { data, error, mutate } = useSWR(`/api/attendance/${date}`, fetcher)

  return {
    attendance_array: data,
    is_loading: !error && !data,
    is_error: error,
    mutate,
  }
}
