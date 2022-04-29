import { useState } from 'react'
import { useSelector } from 'react-redux'

import SecondaryButton from './assets/secondary_button'
import { Headline, Description } from './common'

const Register = () => {
  const current_group = useSelector((state) => state.class_checker.group)
  const [user_info, set_user_info] = useState({
    id: null,
    name: '',
    sex: null,
    grade: null,
    class: null,
  })

  const submit_register = async () => {
    const response = await fetch(`/api/register`, {
      method: 'POST',
      body: JSON.stringify({ ...user_info, group: current_group }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    console.log(data)
  }

  return (
    <>
      <Headline className='mb-4'>신규 등록</Headline>
      <Description></Description>
      <form autoComplete='off' onSubmit={(e) => e.preventDefault()}>
        <div className='flex mb-4'>
          <label className='mr-4 w-24 py-4 leading-6 text-center'>ID</label>
          <input
            type='number'
            name='id'
            className='border p-4 w-64 leading-6'
            placeholder='10000 ~ 99999'
            value={user_info.id}
            onChange={(e) => {
              set_user_info((prev_info) => ({
                ...prev_info,
                id: e.target.value,
              }))
            }}
          />
        </div>
        <div className='flex mb-4'>
          <label className='mr-4 w-24 py-4 leading-6 text-center'>이름</label>
          <input
            type='text'
            name='name'
            className='border p-4 w-64 leading-6'
            placeholder='이름'
            value={user_info.name}
            onChange={(e) => {
              set_user_info((prev_info) => ({
                ...prev_info,
                name: e.target.value,
              }))
            }}
          />
        </div>
        <div className='flex mb-4'>
          <label className='mr-4 w-24 py-4 leading-6 text-center'>성별</label>
          <div className='grid grid-cols-2 gap-4'>
            <button
              className={
                'border p-4 w-20 hover:bg-purple-100 leading-6 ' +
                (user_info.sex === 'M' ? 'bg-purple-200' : '')
              }
              onClick={() =>
                set_user_info((prev_info) => ({
                  ...prev_info,
                  sex: 'M',
                }))
              }
            >
              남
            </button>
            <button
              className={
                'border p-4 w-20 hover:bg-purple-100 leading-6 ' +
                (user_info.sex === 'F' ? 'bg-purple-200' : '')
              }
              onClick={() =>
                set_user_info((prev_info) => ({
                  ...prev_info,
                  sex: 'F',
                }))
              }
            >
              여
            </button>
          </div>
        </div>
        <div className='flex mb-4'>
          <label className='mr-4 w-24 py-4 leading-6 text-center'>학년</label>
          <input
            type='tel'
            name='grade'
            className='border p-4 w-20 leading-6 text-center'
            placeholder='0'
            value={user_info.grade}
            onChange={(e) => {
              set_user_info((prev_info) => ({
                ...prev_info,
                grade: e.target.value,
              }))
            }}
          />
        </div>
        <div className='flex mb-4'>
          <label className='mr-4 w-24 py-4 leading-6 text-center'>반</label>
          <input
            type='tel'
            name='class'
            className='border p-4 w-20 leading-6 text-center'
            placeholder='0'
            value={user_info.class}
            onChange={(e) => {
              set_user_info((prev_info) => ({
                ...prev_info,
                class: e.target.value,
              }))
            }}
          />
        </div>
      </form>
      <div className='w-24 py-4 text-center'>
        <SecondaryButton
          className='p-4 leading-6'
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
