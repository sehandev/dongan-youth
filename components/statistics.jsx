import styled from 'styled-components'

import { Headline, SubHeadline, Description, DescriptionStrong } from './common'
import Container from './container'
import Sidebar from './statistics_sidebar'
import Header from './header'
import { useCount } from './swr'

const Column = styled.th`
  width: 80px;
  font-weight: 600;
  font-size: 18px;
`

const LongColumn = styled.th`
  width: 120px;
`

const Statistics = () => {
  // TEST
  const start_date = '2022-02-06'
  const end_date = '2022-02-12'

  const { statistics_array, is_loading, is_error } = useCount(
    1,
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
      <tr className='h-20'>
        <td className='border'>{class_name}</td>
        <td className='border'>
          {statistics_array[2][grade_id][class_id]['M']}
        </td>
        <td className='border'>
          {statistics_array[2][grade_id][class_id]['F']}
        </td>
      </tr>
    )
  }

  const ClassTable = () => (
    <table className='mr-8 table-fixed border-collapse border'>
      <thead className='bg-gray-50'>
        <tr className='h-20'>
          <LongColumn className='border'>
            <SubHeadline>반</SubHeadline>
          </LongColumn>
          <Column className='border'>
            <SubHeadline>남</SubHeadline>
          </Column>
          <Column className='border'>
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
        <ClassRow grade_id={2} class_id={2} />
        <ClassRow grade_id={2} class_id={2} />
        <ClassRow grade_id={2} class_id={3} />
        <ClassRow grade_id={3} class_id={0} />
        <ClassRow grade_id={3} class_id={3} />
        <ClassRow grade_id={3} class_id={2} />
        <ClassRow grade_id={3} class_id={3} />
      </tbody>
    </table>
  )

  const GroupTable = () => (
    <table className='table-fixed border-collapse border h-fit'>
      <thead className='bg-gray-50'>
        <tr className='h-20'>
          <LongColumn className='border'>
            <SubHeadline>전체</SubHeadline>
          </LongColumn>
          <Column className='border'>
            <SubHeadline>출석</SubHeadline>
          </Column>
        </tr>
      </thead>
      <tbody className='text-center'>
        <tr className='h-20'>
          <td className='border'>남자</td>
          <td className='border'>{statistics_array[0]}</td>
        </tr>
        <tr className='h-20'>
          <td className='border'>여자</td>
          <td className='border'>{statistics_array[1]}</td>
        </tr>
        <tr className='h-20'>
          <td className='border'>교사</td>
          <td className='border'>
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
        <Header></Header>
      </Container>
    )
  }

  return (
    <Container>
      <Sidebar />
      <Header>
        <Headline className='mb-2'>이번 주 통계</Headline>
        <Description>
          <DescriptionStrong>{start_date.slice(0, 4)}</DescriptionStrong>년{' '}
          <DescriptionStrong>{start_date.slice(5, 7)}</DescriptionStrong>월{' '}
          <DescriptionStrong>{start_date.slice(8)}</DescriptionStrong>일
        </Description>
        <div className='flex mt-8'>
          <ClassTable />
          <GroupTable />
        </div>
      </Header>
    </Container>
  )
}

export default Statistics
