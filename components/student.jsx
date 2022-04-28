import Image from 'next/image'
import { useState } from 'react'

import { Headline, Description } from './common'
import { useStudent, useStudentImage } from './swr'

const Student = ({ student_id }) => {
  const { student_info, is_loading, is_error } = useStudent(student_id)
  const {
    image_info,
    is_loading: is_image_loading,
    is_error: is_image_error,
  } = useStudentImage(student_id)
  const [is_fullscreen_image, set_is_fullscreen_image] = useState(false)

  if (is_loading) {
    return (
      <>
        <Headline className='mb-4'>학생 정보</Headline>
        <Description>불러오는 중</Description>
      </>
    )
  }

  if (is_error) {
    return (
      <>
        <Headline className='mb-4'>학생 정보</Headline>
        <Description>오류 발생</Description>
      </>
    )
  }

  const Pill = ({ children }) => (
    <p className='px-6 py-1 rounded-full bg-gray-600 text-white'>{children}</p>
  )
  const List = ({ children }) => <li className='flex mb-2'>{children}</li>
  const ListKey = ({ children }) => (
    <p className='w-1/4 text-right font-medium'>{children}</p>
  )
  const ListValue = ({ children }) => (
    <p className='pl-2 w-3/4 text-left'>{children}</p>
  )
  const StudentImage = ({ quality }) => {
    if (is_image_loading || is_image_error) {
      // Default image
      return (
        <Image
          src={'/img/default_student.png'}
          layout='fill'
          objectFit='contain'
          quality={quality}
        />
      )
    }
    return (
      <Image
        src={image_info.path}
        layout='fill'
        objectFit='contain'
        quality={quality}
      />
    )
  }

  const Info = () => (
    <div className='mr-0 mb-4 lg:mr-4 lg:mb-0 rounded-2xl p-8 w-full lg:w-1/3 bg-purple-50'>
      <div
        className='relative mb-4 h-48'
        onClick={() => {
          set_is_fullscreen_image(true)
        }}
      >
        <StudentImage quality={75} />
      </div>
      <div className='mb-4 text-center'>
        <p className='font-semibold text-2xl tracking-widest'>
          {student_info.name}
        </p>
        <p className='font-medium'>{student_info.id}</p>
      </div>
      <div className='flex mb-4 justify-center gap-4'>
        <Pill>{student_info.sex === 'M' ? '남' : '여'}</Pill>
        <Pill>{student_info.state === 1 ? 'O' : 'X'}</Pill>
      </div>
      <ul className='border rounded-2xl shadow p-4'>
        <List>
          <ListKey>생일 :</ListKey>
          <ListValue>{student_info.birthday}</ListValue>
        </List>
        <List>
          <ListKey>핸드폰 :</ListKey>
          <ListValue>{student_info.phone_number}</ListValue>
        </List>
        <List>
          <ListKey>집전화 :</ListKey>
          <ListValue>{student_info.home_number}</ListValue>
        </List>
        <List>
          <ListKey>Email :</ListKey>
          <ListValue>{student_info.email}</ListValue>
        </List>
        <List>
          <ListKey>주소 :</ListKey>
          <ListValue>{student_info.address}</ListValue>
        </List>
      </ul>
    </div>
  )

  const FullScreenImage = () => {
    return (
      <div
        className='absolute inset-0 w-screen h-screen p-32 bg-black bg-opacity-80'
        onClick={() => {
          set_is_fullscreen_image(false)
        }}
      >
        <div className='relative w-full h-full'>
          <StudentImage quality={100} />
        </div>
      </div>
    )
  }

  return (
    <>
      <Headline className='mb-4'>학생 정보</Headline>
      <Description></Description>
      <div
        className='flex flex-col lg:flex-row'
        style={{ wordBreak: 'keep-all' }}
      >
        <Info />
        <div className='rounded-2xl p-8 w-full lg:w-2/3 bg-purple-50'></div>
      </div>
      {is_fullscreen_image && <FullScreenImage />}
    </>
  )
}

export default Student
