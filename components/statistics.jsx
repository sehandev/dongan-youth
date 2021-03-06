import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { Headline, SubHeadline, Description } from './common'
import Container from './container'
import Sidebar from './sidebar'
import Header from './header'
import { useStatistics } from './swr'
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
  const current_group = useSelector((state) => state.class_checker.group)
  const start_date = useSelector((state) => state.date_checker.start_date)
  const end_date = useSelector((state) => state.date_checker.end_date)
  const { statistics_array, is_loading, is_error } = useStatistics(
    current_group,
    start_date,
    end_date
  )

  const ClassRow = ({ grade_id, class_id }) => {
    let class_name = `${grade_id}학년 `
    if (class_id === 0) {
      class_name += `미배정`
    } else {
      class_name += `${class_id}반`
    }
    return (
      <tr className='h-20' style={{ wordBreak: 'keep-all' }}>
        <td className='p-2 border'>{class_name}</td>
        <td className='p-2 border'>
          {statistics_array[2][grade_id][class_id]['M']}
        </td>
        <td className='p-2 border'>
          {statistics_array[2][grade_id][class_id]['F']}
        </td>
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

  const GroupTable = () => (
    <table
      className='table-fixed border-collapse border h-fit'
      style={{ wordBreak: 'keep-all' }}
    >
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
        <tr className='h-20'>
          <td className='p-2 border'>남학생</td>
          <td className='p-2 border'>{statistics_array[0]}</td>
        </tr>
        <tr className='h-20'>
          <td className='p-2 border'>여학생</td>
          <td className='p-2 border'>{statistics_array[1]}</td>
        </tr>
        <tr className='h-20'>
          <td className='p-2 border'>교사</td>
          <td className='p-2 border'>
            {statistics_array[2][0][0]['M'] + statistics_array[2][0][0]['F']}
          </td>
        </tr>
      </tbody>
    </table>
  )

  if (is_loading || is_error) {
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
