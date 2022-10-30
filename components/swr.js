import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

/**
 * @typedef {Object} MembersObject
 * @property {Object[]} member_array
 * @property {boolean} is_loading
 * @property {boolean} is_error
 */
/**
 *
 * @param {string} group
 * @returns {MembersObject}
 */
export function useMembers(group) {
  const { data, error } = useSWR(
    group ? `/api/members/group/${group}` : null,
    fetcher
  )

  return {
    member_array: data,
    is_loading: !error && !data,
    is_error: error,
  }
}

/**
 * @typedef {Object} MemberObject
 * @property {Object} member
 * @property {boolean} is_loading
 * @property {boolean} is_error
 */
/**
 *
 * @param {string} id
 * @returns {MemberObject}
 */
export function useMember(id) {
  const { data, error } = useSWR(id ? `/api/member/${id}` : null, fetcher)

  const member = {
    photo: 'member_default.png',
    school: '정보 없음',
    birthday: '정보 없음',
    phone: '정보 없음',
    dad_name: '정보 없음',
    dad_phone: '정보 없음',
    mom_name: '정보 없음',
    mom_phone: '정보 없음',
    address: '정보 없음',
    teacher_comment_array: [],
    parent_comment_array: [],
    ...data,
  }

  return {
    member: member,
    is_loading: !error && !data,
    is_error: error,
  }
}

/**
 * @typedef {Object} AttendanceByDateObject
 * @property {Object[]} attendance_array
 * @property {boolean} is_loading
 * @property {boolean} is_error
 * @property {Function} mutate
 */
/**
 *
 * @param {string} date
 * @returns {AttendanceByDateObject}
 */
export function useAttendanceByDate(date) {
  const { data, error, mutate } = useSWR(`/api/attendance/${date}`, fetcher)

  return {
    attendance_array: data,
    is_loading: !error && !data,
    is_error: error,
    mutate,
  }
}
