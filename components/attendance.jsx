import axios from 'axios'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { Headline, SubHeadline, Description, Checkbox } from './common'
import { DateSelectBox } from './date_select'
import { useAttendanceByDate, useMembers } from './swr'

const Column = styled.th`
  width: 80px;
  font-weight: 600;
  font-size: 18px;
`

const LongColumn = styled.th`
  width: 120px;
`

const Attendance = () => {
  const date = useSelector((state) => state.date_checker.start_date)
  const current_group = useSelector((state) => state.class_checker.group)
  const current_grade = useSelector((state) => state.class_checker.grade)
  const current_class = useSelector((state) => state.class_checker.class)
  const { attendance_array, is_loading: is_loading_1, is_error: is_error_1, mutate } = useAttendanceByDate(date)
  const { member_array, is_loading: is_loading_2, is_error: is_error_2 } = useMembers(current_group)
  
  const check_attendance = (member_id) => {
    const is_attended = attendance_array.includes(member_id)

    if (is_attended) {
      axios
        .delete('/api/attendance', {
          data: {
            date,
            member_id,
          },
        })
        .then((response) => {
          console.log(response)
          mutate(attendance_array.filter((id) => id != member_id))
        })
    } else {
      axios
        .post('/api/attendance', {
          date,
          member_id,
        })
        .then((response) => {
          console.log(response)
          mutate([...attendance_array, member_id])
        })
    }
  }

  if (current_grade == -1 || current_class == -1) {
    return <></>
  }

  if (is_loading_1 || is_loading_2) {
    return (
      <>
        <Headline className='mb-4'>출석부</Headline>
        <DateSelectBox />
        <Description>불러오는 중</Description>
      </>
    )
  }

  if (is_error_1 || is_error_2) {
    return (
      <>
        <Headline className='mb-4'>출석부</Headline>
        <DateSelectBox />
        <Description>오류 발생</Description>
      </>
    )
  }

  const class_member_array = member_array.filter((member) => member.grade == current_grade && member.class == current_class)

  const StatisticsTable = () => {
    const male_id_array = class_member_array.filter((member) => member.sex === 'M').map((member) => member.id)
    const female_id_array = class_member_array.filter((member) => member.sex === 'F').map((member) => member.id)
    const statistics = {
      M: attendance_array.filter((member_id) => male_id_array.includes(member_id)).length,
      F: attendance_array.filter((member_id) => female_id_array.includes(member_id)).length,
    }

    return (
      <table className='mt-8 mb-4 table-fixed border-collapse border'>
        <tbody className='text-center'>
          <tr className='h-12'>
            <Column className='border'>남</Column>
            <Column className='border'>{statistics.M}</Column>
            <Column className='border'>여</Column>
            <Column className='border'>{statistics.F}</Column>
          </tr>
        </tbody>
      </table>
    )
  }

  const Table = () => {
    /**
     *
     * @param {string} sex - 'M' or 'F'
     * @returns string
     */
    const sex_to_string = (sex) => {
      if (sex === 'M') {
        return '남'
      }
      if (sex === 'F') {
        return '여'
      }
      return '성별오류'
    }

    return (
      <table className='table-fixed border-collapse border'>
        <thead className='bg-gray-50'>
          <tr className='h-20'>
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
          {[...class_member_array]
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((member, index) => (
              <tr key={index} className='h-20'>
                <Link href={`/admin/members/id/${member.id}`}>
                  <td className='border hover:bg-violet-200 cursor-pointer'>{member.name}</td>
                </Link>
                <td className='border'>{sex_to_string(member.sex)}</td>
                <td className='border hover:bg-violet-50 cursor-pointer' onMouseDown={() => check_attendance(member.id)}>
                  <Checkbox check={attendance_array.includes(member.id)} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    )
  }

  return (
    <>
      <Headline className='mb-4'>출석부</Headline>
      <DateSelectBox />
      <Description></Description>
      <StatisticsTable />
      <Table />
    </>
  )
}

export default Attendance
