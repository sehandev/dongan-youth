import { get_gender_string } from '../utils/to_string'
import { get_group_name } from './assets/group'
import SecondaryButton from './assets/secondary_button'
import { Headline } from './common'
import { useMember } from './swr'

const Member = ({ id }) => {
  const { member, is_loading, is_error } = useMember(id)

  if (is_loading) {
    return <Headline className="mb-4">구성원 정보</Headline>
  }

  if (is_error) {
    return (
      <>
        <Headline className="mb-4">구성원 정보</Headline>
        <div>{id} 찾을 수 없습니다.</div>
      </>
    )
  }

  const Info = ({ title, content }) => (
    <li>
      {title && <h3 className="mt-4 font-semibold">{title}:</h3>}
      <div className="text-gray-600">{content}</div>
    </li>
  )

  const TrainingCheck = ({ title, is_completed }) => (
    <div className="text-center">
      <span>{title} - </span>
      {is_completed ? (
        <span className="text-green-500">O</span>
      ) : (
        <span className="text-red-500">X</span>
      )}
    </div>
  )

  console.log(member)

  return (
    <>
      <Headline className="mb-4">구성원 정보</Headline>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2 flex flex-col text-center">
          <div className="mb-4 mx-auto w-fit h-fit">
            <img src={`/img/${member.photo}`} layout="" width={200} />
          </div>
          <div className="font-semibold">
            <div>{member.dongan_id}</div>
            <div>{member.name}</div>
          </div>
        </div>

        <ul className="col-span-2 grid grid-cols-1 md:grid-cols-2">
          <Info title="부서" content={get_group_name(member.group)} />
          <Info
            title="소속"
            content={
              member.role === 'student'
                ? `${member.grade}학년 ${member.class}반`
                : '교사'
            }
          />
          <Info
            title="성별"
            content={`${get_gender_string(member.sex)}${
              member.role === 'student' ? '학생' : '교사'
            }`}
          />
          <Info title="생년월일" content={member.birthday} />
          <Info title="학교" content={member.school} />
          <Info title="전화번호" content={member.phone} />
          <Info title="아버지 성함" content={member.dad_name} />
          <Info title="아버지 전화번호" content={member.dad_phone} />
          <Info title="어머니 성함" content={member.mom_name} />
          <Info title="어머니 전화번호" content={member.mom_phone} />
          <Info title="주소" content={member.address} />
        </ul>

        <hr className="col-span-4 my-4" />

        <div className="col-span-4 grid grid-cols-2 gap-4">
          <div className="col-span-2 text-center">
            <h2 className="mb-4 text-lg font-bold">교육훈련</h2>
          </div>
          <TrainingCheck title={'새생명교육'} is_completed={true} />
          <TrainingCheck title={'중보기도학교'} is_completed={false} />
          <TrainingCheck title={'세례입교'} is_completed={false} />
          <TrainingCheck title={'큐티학교'} is_completed={true} />
          <TrainingCheck title={'말씀암송'} is_completed={true} />
          <TrainingCheck title={'교리교육'} is_completed={false} />
          <TrainingCheck title={'제자훈련'} is_completed={false} />
        </div>

        <hr className="col-span-4 my-4" />

        <div className="col-span-2">
          <h2 className="mb-8 text-lg font-bold text-center">교사 의견</h2>
          {member.teacher_comment_array.map((comment) => (
            <div className="mb-4">{comment}</div>
          ))}
        </div>

        <div className="col-span-2">
          <h2 className="mb-8 text-lg font-bold text-center">학부모 의견</h2>
          {member.parent_comment_array.map((comment) => (
            <div className="mb-4">{comment}</div>
          ))}
        </div>
      </div>

      <SecondaryButton className="px-4 py-2">수정</SecondaryButton>
    </>
  )
}

export default Member
