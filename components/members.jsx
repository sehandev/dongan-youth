import Link from 'next/link'
import { useSelector } from 'react-redux'

import { Headline } from './common'
import { useMembers } from './swr'

const Members = () => {
  const current_group = useSelector((state) => state.class_checker.group)
  const { member_array, is_loading, is_error } = useMembers(current_group)

  if (is_loading || is_error) {
    return <Headline className='mb-4'>구성원 목록</Headline>
  }

  const MemberCard = ({ member }) => {
    return (
      <Link href={`/admin/members/id/${member.id}`}>
        <div className='border hover:bg-violet-200 cursor-pointer px-4 py-4'>
          <div>{member.name}</div>
          {member.role === 'student' ? (
            <div>
              {member.grade}학년 {member.class}반
            </div>
          ) : (
            <div>교사</div>
          )}
          <div>{member.sex === 'M' ? '남' : '여'}</div>
        </div>
      </Link>
    )
  }

  return (
    <>
      <Headline className='mb-4'>구성원 목록</Headline>
      <ul>
        {member_array.map((member, index) => (
          <li
            key={index}
            className='my-4'
          >
            <MemberCard member={member} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default Members
