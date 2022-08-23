import { Headline } from './common'
import { useMember } from './swr'

const Member = ({ id }) => {
  const { member, is_loading, is_error } = useMember(id)

  if (is_loading) {
    return <Headline className='mb-4'>구성원 정보</Headline>
  }

  if (is_error) {
    return (
      <>
        <Headline className='mb-4'>구성원 정보</Headline>
        <div>{id} 찾을 수 없습니다.</div>
      </>
    )
  }

  return (
    <>
      <Headline className='mb-4'>구성원 정보</Headline>
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
    </>
  )
}

export default Member
