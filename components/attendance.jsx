import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Container from './container'
import {
  Headline,
  SubHeadline,
  Description,
  DescriptionStrong,
  Checkbox,
} from './common'

const Column = styled.th`
  width: 80px;
  font-weight: 600;
  font-size: 18px;
`

const LongColumn = styled.th`
  width: 120px;
`

const Attendance = () => {
  const [toggle, set_toggle] = useState(true)
  useEffect(() => {}, [toggle])

  const [user_info_array, set_user_info_array] = useState([])

  const current_grade = useSelector((state) => state.class_checker.grade)
  const current_class = useSelector((state) => state.class_checker.class)

  useEffect(() => {
    set_user_info_array([
      {
        id: '1234',
        name: '이름순',
        sex: '남',
        check_1: false,
      },
      {
        id: '2307',
        name: '김다연',
        sex: '여',
        check_1: true,
      },
      {
        id: '2307',
        name: '김성돈',
        sex: '남',
        check_1: false,
      },
      {
        id: '2584',
        name: '박세연',
        sex: '여',
        check_1: false,
      },
      {
        id: '9018',
        name: '복영빈',
        sex: '여',
        check_1: true,
      },
      {
        id: '6195',
        name: '이도연',
        sex: '여',
        check_1: true,
      },
    ])
  }, [])

  const check_attendance = (index) => {
    set_user_info_array((prev_array) => {
      prev_array[index].check_1 = !prev_array[index].check_1
      return prev_array
    })
    set_toggle((prev_state) => !prev_state)
  }

  const Table = () => (
    <table className='mt-8 table-fixed border-collapse border'>
      <thead className='bg-gray-50'>
        <tr className='h-20'>
          <Column className='border'>
            <SubHeadline>ID</SubHeadline>
          </Column>
          <LongColumn className='border'>
            <SubHeadline>이름</SubHeadline>
          </LongColumn>
          <Column className='border'>
            <SubHeadline>성별</SubHeadline>
          </Column>
          <LongColumn className='border'>
            <SubHeadline>예배 출석</SubHeadline>
          </LongColumn>
        </tr>
      </thead>
      <tbody className='text-center'>
        {user_info_array.map((user_info, index) => (
          <tr
            key={index}
            className='h-20 hover:bg-violet-50 cursor-pointer'
            onClick={() => check_attendance(index)}
          >
            <td className='border'>{user_info.id}</td>
            <td className='border'>{user_info.name}</td>
            <td className='border'>{user_info.sex}</td>
            <td className='border'>
              <Checkbox check={user_info.check_1} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
  return (
    <Container>
      <Headline className='mb-2'>출석부</Headline>
      <Description>
        <DescriptionStrong>예배 출석</DescriptionStrong>과{' '}
        <DescriptionStrong>반모임 출석</DescriptionStrong>을 따로 확인해주세요.
      </Description>
      <Table />
      {/* TEST */}
      {current_grade}학년 {current_class}반
    </Container>
  )
}

export default Attendance
