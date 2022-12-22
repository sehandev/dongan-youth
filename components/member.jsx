import axios from 'axios'
import { useState } from 'react'

import { get_gender_string } from '../utils/to_string'
import { get_group_name } from './assets/group'
import SecondaryButton from './assets/secondary_button'
import { Headline } from './common'
import { date_option_array } from './date_select'
import { useMember, useTrainingsByMemberId, useTrainingsInfo } from './swr'

const Info = ({ title, content }) => (
  <li>
    {title && <h3 className="mt-4 font-semibold">{title}:</h3>}
    <div className="text-gray-600">{content}</div>
  </li>
)

const Edit = ({ title, info_key, old_info, new_info, set_new_info_inputs }) => (
  <li className="pr-4">
    <h3 className="mt-4 font-semibold">{title}:</h3>
    <div className="text-gray-600">
      <div>{old_info[info_key]}</div>
      <div className="flex items-center">
        <span className="mr-2">→</span>
        <input
          className="border-b px-2 h-8 bg-slate-50 focus:outline-none"
          value={new_info[info_key]}
          onChange={(e) => {
            set_new_info_inputs((prev_inputs) => {
              return {
                ...prev_inputs,
                [info_key]: e.target.value,
              }
            })
          }}
        />
      </div>
    </div>
  </li>
)

const Member = ({ id }) => {
  const { member, is_loading, is_error, mutate } = useMember(id)
  const { trainings_info_array } = useTrainingsInfo()
  const { trainings } = useTrainingsByMemberId(id)
  const [is_edit_mode, set_is_edit_mode] = useState(false)
  const [teacher_comment, set_teacher_comment] = useState('')
  const [parent_comment, set_parent_comment] = useState('')
  const [new_info_inputs, set_new_info_inputs] = useState({
    dongan_id: '',
    group: '',
    grade: '',
    class: '',
    sex: '',
    birthday: '',
    school: '',
    phone: '',
    dad_name: '',
    dad_phone: '',
    mom_name: '',
    mom_phone: '',
    address: '',
  })

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

  const update_member_info = () => {
    const changed_info = {}
    Object.keys(new_info_inputs).map((key) => {
      if (new_info_inputs[key] !== '') {
        changed_info[key] = new_info_inputs[key]
      }
    })
    if (window.confirm(`정보 수정하기`)) {
      axios
        .put(`/api/member/${id}`, changed_info)
        .then((response) => {
          console.log(response)
          mutate()
          alert('수정되었습니다.')
          set_is_edit_mode(false)
        })
        .catch(() => {
          alert('문제가 발생했습니다.')
        })
    }
  }

  const add_teacher_comment = (new_comment) => {
    if (window.confirm(`새로운 의견 : "${new_comment}"`)) {
      axios
        .put(`/api/member/${id}`, {
          teacher_comment_array: [
            ...member.teacher_comment_array,
            date_option_array[0].value + ' : ' + new_comment,
          ],
        })
        .then((response) => {
          console.log(response)
          set_teacher_comment('')
          mutate()
          alert('의견이 등록되었습니다.')
        })
        .catch(() => {
          alert('문제가 발생했습니다.')
        })
    }
  }

  const add_parent_comment = (new_comment) => {
    if (window.confirm(`새로운 의견 : "${new_comment}"`)) {
      axios
        .put(`/api/member/${id}`, {
          parent_comment_array: [
            ...member.parent_comment_array,
            date_option_array[0].value + ' : ' + new_comment,
          ],
        })
        .then((response) => {
          console.log(response)
          set_parent_comment('')
          mutate()
          alert('의견이 등록되었습니다.')
        })
        .catch(() => {
          alert('문제가 발생했습니다.')
        })
    }
  }

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

        {is_edit_mode ? (
          <ul className="col-span-2 grid grid-cols-1 md:grid-cols-2">
            <div className="col-span-2 flex justify-center">
              <div className="flex gap-4">
                <SecondaryButton
                  className="px-4 py-2"
                  onClick={() => {
                    update_member_info()
                  }}
                >
                  완료
                </SecondaryButton>
                <SecondaryButton
                  className="px-4 py-2"
                  onClick={() => {
                    set_is_edit_mode(false)
                  }}
                >
                  취소
                </SecondaryButton>
              </div>
            </div>
            <Info title="부서" content={get_group_name(member.group)} />
            <Edit
              title="교인번호"
              info_key="dongan_id"
              old_info={member}
              new_info={new_info_inputs}
              set_new_info_inputs={set_new_info_inputs}
            />
            <Edit
              title="학년"
              info_key="grade"
              old_info={member}
              new_info={new_info_inputs}
              set_new_info_inputs={set_new_info_inputs}
            />
            <Edit
              title="반"
              info_key="class"
              old_info={member}
              new_info={new_info_inputs}
              set_new_info_inputs={set_new_info_inputs}
            />
            <Edit
              title="성별 (M/F)"
              info_key="sex"
              old_info={member}
              new_info={new_info_inputs}
              set_new_info_inputs={set_new_info_inputs}
            />
            <Edit
              title="생년월일"
              info_key="birthday"
              old_info={member}
              new_info={new_info_inputs}
              set_new_info_inputs={set_new_info_inputs}
            />
            <Edit
              title="학교"
              info_key="school"
              old_info={member}
              new_info={new_info_inputs}
              set_new_info_inputs={set_new_info_inputs}
            />
            <Edit
              title="전화번호"
              info_key="phone"
              old_info={member}
              new_info={new_info_inputs}
              set_new_info_inputs={set_new_info_inputs}
            />
            <Edit
              title="아버지 성함"
              info_key="dad_name"
              old_info={member}
              new_info={new_info_inputs}
              set_new_info_inputs={set_new_info_inputs}
            />
            <Edit
              title="아버지 전화번호"
              info_key="dad_phone"
              old_info={member}
              new_info={new_info_inputs}
              set_new_info_inputs={set_new_info_inputs}
            />
            <Edit
              title="어머니 성함"
              info_key="mom_name"
              old_info={member}
              new_info={new_info_inputs}
              set_new_info_inputs={set_new_info_inputs}
            />
            <Edit
              title="어머니 전화번호"
              info_key="mom_phone"
              old_info={member}
              new_info={new_info_inputs}
              set_new_info_inputs={set_new_info_inputs}
            />
            <Edit
              title="주소"
              info_key="address"
              old_info={member}
              new_info={new_info_inputs}
              set_new_info_inputs={set_new_info_inputs}
            />
          </ul>
        ) : (
          <ul className="col-span-2 grid grid-cols-1 md:grid-cols-2">
            <div className="col-span-2 flex justify-center">
              <SecondaryButton
                className="px-4 py-2"
                onClick={() => set_is_edit_mode(true)}
              >
                수정
              </SecondaryButton>
            </div>
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
        )}

        <hr className="col-span-4 my-4" />

        <div className="col-span-4 grid grid-cols-2 gap-4">
          <div className="col-span-2 text-center">
            <h2 className="mb-4 text-lg font-bold">교육훈련</h2>
          </div>
          {trainings_info_array &&
            trainings &&
            trainings_info_array.map((training) => (
              <TrainingCheck
                key={training.name}
                title={training.name}
                is_completed={trainings.hasOwnProperty(training.name)}
              />
            ))}
        </div>

        <hr className="col-span-4 my-4" />

        <div className="col-span-2">
          <h2 className="mb-8 text-lg font-bold text-center">교사 의견</h2>
          {member.teacher_comment_array.map((comment) => (
            <div className="mb-4">{comment}</div>
          ))}
          <div className="flex">
            <input
              className="mr-2 border p-1 w-full focus:outline-none"
              value={teacher_comment}
              onChange={(e) => set_teacher_comment(e.target.value)}
            />
            <button onClick={() => add_teacher_comment(teacher_comment)}>
              &#x2713;
            </button>
          </div>
        </div>

        <div className="col-span-2">
          <h2 className="mb-8 text-lg font-bold text-center">학부모 의견</h2>
          {member.parent_comment_array.map((comment) => (
            <div className="mb-4">{comment}</div>
          ))}
          <div className="flex">
            <input
              className="mr-2 border p-1 w-full focus:outline-none"
              value={parent_comment}
              onChange={(e) => set_parent_comment(e.target.value)}
            />
            <button onClick={() => add_parent_comment(parent_comment)}>
              &#x2713;
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Member
