import Link from 'next/link'

const MembersCard = ({ member_array }) => {
  const get_role_count = (member_array, role) => {
    if (!member_array) {
      return 0
    }
    return member_array.filter((member) => member.role === role).length
  }

  return (
    <Link href={'/admin/members'}>
      <div className="flex flex-col p-4 hover:bg-purple-50 group cursor-pointer items-center">
        <div className="flex flex-col mb-4 rounded bg-purple-100 group-hover:bg-purple-200 w-60 h-60 justify-center items-center">
          <h2 className="mb-4 font-semibold">구성원 수</h2>
          <p>학생 {get_role_count(member_array, 'student')}명</p>
          <p>교사 {get_role_count(member_array, 'teacher')}명</p>
        </div>
        <div>
          <h3 className="text-sm text-gray-700">구성원 목록</h3>
        </div>
      </div>
    </Link>
  )
}

export default MembersCard
