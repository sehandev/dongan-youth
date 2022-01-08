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
