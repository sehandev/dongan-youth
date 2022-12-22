import axios from 'axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import SecondaryButton from './assets/secondary_button'
import { Headline, Description } from './common'

const Register = () => {
  const current_group = useSelector((state) => state.group_manager.group)
  const [member_info, set_member_info] = useState({
    name: '',
    sex: null,
    grade: '0',
    class: '0',
  })

  const submit_register = async () => {
    // Empty check
    if (member_info.name.length === 0) {
      alert('이름을 입력해주세요.')
      return
    }
    if (member_info.sex === null) {
      alert('성별을 선택해주세요.')
      return
    }
    if (member_info.grade === '') {
      alert('학년을 입력해주세요.\n교사는 0학년 0반입니다.')
      return
    }
    if (member_info.class === '') {
      alert('반을 입력해주세요.\n교사는 0학년 0반입니다.')
      return
    }

    // Init
    set_member_info({
      name: '',
      sex: null,
      grade: '0',
      class: '0',
    })

    // POST member
    try {
      await axios.post('/api/member', { ...member_info, group: current_group })
      alert(`[${member_info.name}] 추가했습니다.`)
    } catch (err) {
      alert(`[${member_info.name}] 추가하지 못했습니다.`)
    }
  }

  return (
    <>
      <Headline className="mb-4">신규 등록</Headline>
      <Description></Description>
      <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <div className="flex mb-4">
          <label className="mr-4 w-24 py-4 leading-6 text-center">이름</label>
          <input
            type="text"
            name="name"
            className="border p-4 w-64 leading-6"
            placeholder="이름"
            value={member_info.name}
            onChange={(e) => {
              set_member_info((prev_info) => ({
                ...prev_info,
                name: e.target.value,
              }))
            }}
          />
        </div>
        <div className="flex mb-4">
          <label className="mr-4 w-24 py-4 leading-6 text-center">성별</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              className={
                'border p-4 w-20 hover:bg-purple-100 leading-6 ' + (member_info.sex === 'M' ? 'bg-purple-200' : '')
              }
              onClick={() =>
                set_member_info((prev_info) => ({
                  ...prev_info,
                  sex: 'M',
                }))
              }
            >
              남
            </button>
            <button
              className={
                'border p-4 w-20 hover:bg-purple-100 leading-6 ' + (member_info.sex === 'F' ? 'bg-purple-200' : '')
              }
              onClick={() =>
                set_member_info((prev_info) => ({
                  ...prev_info,
                  sex: 'F',
                }))
              }
            >
              여
            </button>
          </div>
        </div>
        <div className="flex mb-4">
          <label className="mr-4 w-24 py-4 leading-6 text-center">학년</label>
          <input
            type="tel"
            name="grade"
            className="border p-4 w-20 leading-6 text-center"
            placeholder="0"
            value={member_info.grade}
            onChange={(e) => {
              set_member_info((prev_info) => ({
                ...prev_info,
                grade: e.target.value,
              }))
            }}
          />
        </div>
        <div className="flex mb-4">
          <label className="mr-4 w-24 py-4 leading-6 text-center">반</label>
          <input
            type="tel"
            name="class"
            className="border p-4 w-20 leading-6 text-center"
            placeholder="0"
            value={member_info.class}
            onChange={(e) => {
              set_member_info((prev_info) => ({
                ...prev_info,
                class: e.target.value,
              }))
            }}
          />
        </div>
      </form>
      <div className="w-24 py-4 text-center">
        <SecondaryButton
          className="p-4 leading-6"
          onClick={() => {
            submit_register()
          }}
        >
          등록하기
        </SecondaryButton>
      </div>
    </>
  )
}

export default Register
