import Link from 'next/link'

import { count_student_member_by_gender, count_teacher_member } from '../../utils/statistics'

const StatisticsCard = ({ attendance_array, member_array }) => {
  const gender_counts = count_student_member_by_gender(attendance_array, member_array)
  const teacher_count = count_teacher_member(attendance_array, member_array)
  return (
    <Link href={'/statistics'}>
      <div className="flex flex-col p-4 hover:bg-purple-50 group cursor-pointer items-center">
        <div className="flex flex-col mb-4 rounded bg-purple-100 group-hover:bg-purple-200 w-60 h-60 justify-center items-center">
          <h2 className="mb-4 font-semibold">오늘의 출석</h2>
          <p>남학생 출석 {gender_counts['M']}명</p>
          <p>여학생 출석 {gender_counts['F']}명</p>
          <p>교사 출석 {teacher_count}명</p>
        </div>
        <div>
          <h3 className="text-sm text-gray-700">출석 통계</h3>
        </div>
      </div>
    </Link>
  )
}

export default StatisticsCard
