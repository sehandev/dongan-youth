import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import {
  Headline,
  SubHeadline,
  Description,
  DescriptionStrong,
  Checkbox,
} from './common'
import Container from './container'
import Sidebar from './attendance_sidebar'
import Header from './header'
import { useHello } from './swr'

const Column = styled.th`
  width: 80px;
  font-weight: 600;
  font-size: 18px;
`

const LongColumn = styled.th`
  width: 120px;
`

const Attendance = () => {
  const { hello_data, is_loading, is_error } = useHello()

  const [toggle, set_toggle] = useState(true)
  useEffect(() => {}, [toggle])

  const [user_info_array, set_user_info_array] = useState([])

  const current_grade = useSelector((state) => state.class_checker.grade)
  const current_class = useSelector((state) => state.class_checker.class)

  useEffect(() => {
    if (hello_data) {
      console.log(hello_data.rows)
      const new_user_info_array = Array.from(hello_data.rows, (row) => {
        return Object({
          id: row[0].trim(),
          name: row[1].trim(),
          sex: row[2] == 'F' ? '여' : '남',
          check_1: row[3] == 1,
        })
      })
      console.log(new_user_info_array)
      set_user_info_array(new_user_info_array)
    }
    // set_user_info_array([
    //   {
    //     id: '1234',
    //     name: '이름순',
    //     sex: '남',
    //     check_1: false,
    //   },
    //   {
    //     id: '2307',
    //     name: '김다연',
    //     sex: '여',
    //     check_1: true,
    //   },
    //   {
    //     id: '2307',
    //     name: '김성돈',
    //     sex: '남',
    //     check_1: false,
    //   },
    //   {
    //     id: '2584',
    //     name: '박세연',
    //     sex: '여',
    //     check_1: false,
    //   },
    //   {
    //     id: '9018',
    //     name: '복영빈',
    //     sex: '여',
    //     check_1: true,
    //   },
    //   {
    //     id: '6195',
    //     name: '이도연',
    //     sex: '여',
    //     check_1: true,
    //   },
    // ])
  }, [is_loading])

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

  if (current_grade == -1 || current_class == -1) {
    return (
      <Container>
        <Sidebar />
        <Header></Header>
      </Container>
    )
  }

  return (
    <Container>
      <Sidebar />
      <Header>
        <Headline className='mb-2'>출석부</Headline>
        <Description>
          <DescriptionStrong>예배 출석</DescriptionStrong>과{' '}
          <DescriptionStrong>반모임 출석</DescriptionStrong>을 따로
          확인해주세요.
        </Description>
        <Table />
        {/* TEST */}
        {current_grade}학년 {current_class}반
      </Header>
    </Container>
  )
}

export default Attendance
