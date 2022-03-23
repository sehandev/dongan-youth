import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Headline, SubHeadline, Description, Checkbox } from './common'
import { useAttendance } from './swr'
import { DateSelectBox } from './date_select'

const Column = styled.th`
  width: 80px;
  font-weight: 600;
  font-size: 18px;
`

const LongColumn = styled.th`
  width: 120px;
`

const Attendance = () => {
  const start_date = useSelector((state) => state.date_checker.start_date)
  const end_date = useSelector((state) => state.date_checker.end_date)
  const current_grade = useSelector((state) => state.class_checker.grade)
  const current_class = useSelector((state) => state.class_checker.class)
  const { attendance_data, is_loading, is_error } = useAttendance(
    current_grade,
    current_class,
    start_date,
    end_date
  )

  const [toggle, set_toggle] = useState(true)
  useEffect(() => {}, [toggle])

  const [user_info_array, set_user_info_array] = useState([])

  useEffect(() => {
    if (attendance_data) {
      const new_user_info_array = Array.from(attendance_data, (row) => {
        return Object({
          id: row[0].trim(),
          name: row[1].trim(),
          sex: row[2] == 'F' ? '여' : '남',
          is_attended: row[3] == 1,
        })
      })
      new_user_info_array.sort((a, b) => a.name.localeCompare(b.name))
      set_user_info_array(new_user_info_array)
    }
  }, [attendance_data])

  const check_attendance = (index) => {
    const user_info = user_info_array[index]

    if (user_info.is_attended) {
      fetch(`/api/update_attendance/${user_info.id}/${start_date}`, {
        method: 'DELETE',
      }).then((response) => console.log(response))
    } else {
      fetch(`/api/update_attendance/${user_info.id}/${start_date}`, {
        method: 'POST',
      }).then((response) => console.log(response))
    }

    set_user_info_array((prev_array) => {
      prev_array[index].is_attended = !prev_array[index].is_attended
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
              <Checkbox check={user_info.is_attended} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )

  if (current_grade == -1 || current_class == -1) {
    return <></>
  }

  if (is_loading) {
    return <div>불러오는 중</div>
  }

  if (is_error) {
    return <div>오류 발생</div>
  }

  return (
    <>
      <Headline className='mb-4'>출석부</Headline>
      <DateSelectBox />
      <Description></Description>
      <Table />
    </>
  )
}

export default Attendance
