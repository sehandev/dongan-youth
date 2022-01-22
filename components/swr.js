import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function useHello() {
  const { data, error } = useSWR(`/api/hello`, fetcher)

  return {
    hello_data: data,
    is_loading: !error && !data,
    is_error: error,
  }
}

export function useCount(group_id) {
  const { data, error } = useSWR(`/api/count?group=${group_id}`, fetcher)

  return {
    count_array: data,
    is_loading: !error && !data,
    is_error: error,
  }
}
