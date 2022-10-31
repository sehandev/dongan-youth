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
 * @property {Function} mutate
 */
/**
 *
 * @param {string} id
 * @returns {MemberObject}
 */
export function useMember(id) {
  const { data, error, mutate } = useSWR(
    id ? `/api/member/${id}` : null,
    fetcher
  )

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
    mutate,
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

/**
 * @typedef {Object} TrainingsByNameDateObject
 * @property {Object} members
 * @property {boolean} is_loading
 * @property {boolean} is_error
 * @property {Function} mutate
 */
/**
 *
 * @param {string} name
 * @param {string} date
 * @returns {TrainingsByNameDateObject}
 */
export function useTrainingsByNameDate(name, date) {
  const { data, error } = useSWR(
    name && date ? `/api/trainings/members/${name}/${date}` : null,
    fetcher
  )

  return {
    members: data,
    is_loading: !error && !data,
    is_error: error,
  }
}

/**
 * @typedef {Object} TrainingsByMemberIdObject
 * @property {Object} trainings
 * @property {boolean} is_loading
 * @property {boolean} is_error
 */
/**
 *
 * @param {string} member_id
 * @returns {TrainingsByMemberIdObject}
 */
export function useTrainingsByMemberId(member_id) {
  const { data, error } = useSWR(
    member_id ? `/api/trainings/member_id/${member_id}` : null,
    fetcher
  )

  return {
    trainings: data,
    is_loading: !error && !data,
    is_error: error,
  }
}

/**
 * @typedef {Object} TrainingsInfoObject
 * @property {Object} trainings_info
 * @property {boolean} is_loading
 * @property {boolean} is_error
 * @property {Function} mutate
 */
/**
 *
 * @returns {TrainingsInfoObject}
 */
export function useTrainingsInfo() {
  const { data, error, mutate } = useSWR('/api/trainings/info', fetcher)

  return {
    trainings_info_array: data,
    is_loading: !error && !data,
    is_error: error,
    mutate,
  }
}
