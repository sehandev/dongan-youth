import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { Headline, SubHeadline, Description } from './common'
import Container from './container'
import Sidebar from './sidebar'
import Header from './header'
import { useAttendanceByDate, useMembers } from './swr'
import { DateSelectBox } from './date_select'

const Column = styled.th`
  width: 60px;
  font-weight: 600;
  font-size: 18px;
`
const LongColumn = styled.th`
  width: 120px;
`

const Statistics = () => {
  const date = useSelector((state) => state.date_checker.start_date)
  const current_group = useSelector((state) => state.class_checker.group)
  const { attendance_array, is_loading: is_loading_1, is_error: is_error_1 } = useAttendanceByDate(date)
  const { member_array, is_loading: is_loading_2, is_error: is_error_2 } = useMembers(current_group)

  const ClassRow = ({ grade_id, class_id }) => {
    const class_member_array = member_array.filter((member) => member.grade == grade_id && member.class == class_id)
    const male_id_array = class_member_array.filter((member) => member.sex === 'M').map((member) => member.id)
    const female_id_array = class_member_array.filter((member) => member.sex === 'F').map((member) => member.id)
    const statistics = {
      M: attendance_array.filter((member_id) => male_id_array.includes(member_id)).length,
      F: attendance_array.filter((member_id) => female_id_array.includes(member_id)).length,
    }

    let class_name = `${grade_id}`
    if (class_id === 0) {
      class_name += `-미배정`
    } else {
      class_name += `-${class_id}`
    }
    return (
      <tr className='h-10' style={{ wordBreak: 'keep-all' }}>
        <td className='p-2 border'>{class_name}</td>
        <td className='p-2 border'>{statistics.M}</td>
        <td className='p-2 border'>{statistics.F}</td>
      </tr>
    )
  }

  const ClassTable = () => (
    <table className='mr-8 table-fixed border-collapse border'>
      <thead className='bg-gray-50'>
        <tr className='h-20'>
          <LongColumn className='p-2 border'>
            <SubHeadline>반</SubHeadline>
          </LongColumn>
          <Column className='p-2 border'>
            <SubHeadline>남</SubHeadline>
          </Column>
          <Column className='p-2 border'>
            <SubHeadline>여</SubHeadline>
          </Column>
        </tr>
      </thead>
      <tbody className='text-center'>
        <ClassRow grade_id={1} class_id={0} />
        <ClassRow grade_id={1} class_id={1} />
        <ClassRow grade_id={1} class_id={2} />
        <ClassRow grade_id={1} class_id={3} />
        <ClassRow grade_id={2} class_id={0} />
        <ClassRow grade_id={2} class_id={1} />
        <ClassRow grade_id={2} class_id={2} />
        <ClassRow grade_id={2} class_id={3} />
        <ClassRow grade_id={3} class_id={0} />
        <ClassRow grade_id={3} class_id={1} />
        <ClassRow grade_id={3} class_id={2} />
        <ClassRow grade_id={3} class_id={3} />
      </tbody>
    </table>
  )

  const GroupTable = () => {
    const student_member_array = member_array.filter((member) => member.role == 'student')
    const male_id_array = student_member_array.filter((member) => member.sex === 'M').map((member) => member.id)
    const female_id_array = student_member_array.filter((member) => member.sex === 'F').map((member) => member.id)
    const teacher_id_array = member_array.filter((member) => member.role == 'teacher').map((member) => member.id)
    const statistics = {
      M: attendance_array.filter((member_id) => male_id_array.includes(member_id)).length,
      F: attendance_array.filter((member_id) => female_id_array.includes(member_id)).length,
      T: attendance_array.filter((member_id) => teacher_id_array.includes(member_id)).length,
    }
    return (
      <table className='table-fixed border-collapse border h-fit' style={{ wordBreak: 'keep-all' }}>
        <thead className='bg-gray-50'>
          <tr className='h-20'>
            <LongColumn className='p-2 border'>
              <SubHeadline>전체</SubHeadline>
            </LongColumn>
            <Column className='p-2 border'>
              <SubHeadline>출석</SubHeadline>
            </Column>
          </tr>
        </thead>
        <tbody className='text-center'>
          <tr className='h-10'>
            <td className='p-2 border'>남학생</td>
            <td className='p-2 border'>{statistics.M}</td>
          </tr>
          <tr className='h-10'>
            <td className='p-2 border'>여학생</td>
            <td className='p-2 border'>{statistics.F}</td>
          </tr>
          <tr className='h-10'>
            <td className='p-2 border'>교사</td>
            <td className='p-2 border'>{statistics.T}</td>
          </tr>
        </tbody>
      </table>
    )
  }

  if (is_loading_1 || is_loading_2 || is_error_1 || is_error_2) {
    return (
      <Container>
        <Sidebar />
        <Header>
          <Headline className='mb-4'>이번 주 통계</Headline>
          <DateSelectBox />
          <Description></Description>
          <div className='flex mt-4'></div>
        </Header>
      </Container>
    )
  }

  return (
    <Container>
      <Sidebar />
      <Header>
        <Headline className='mb-4'>이번 주 통계</Headline>
        <DateSelectBox />
        <Description></Description>
        <div className='flex mt-4'>
          <ClassTable />
          <GroupTable />
        </div>
      </Header>
    </Container>
  )
}

export default Statistics
