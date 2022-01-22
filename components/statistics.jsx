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

const Attendance = () => {
  // TEST
  const start_date = '2022-01-23'
  const last_date = '2022-01-30'
  const count_array = [1, 2, 3]

  // const { count_array, is_loading, is_error } = useCount(1, start_date, last_date)

  const class_array = ['남', '여', '교사']

  const Table = () => (
    <table className='mt-8 table-fixed border-collapse border'>
      <thead className='bg-gray-50'>
        <tr className='h-20'>
          <Column className='border'>
            <SubHeadline>성별</SubHeadline>
          </Column>
          <LongColumn className='border'>
            <SubHeadline>출석</SubHeadline>
          </LongColumn>
        </tr>
      </thead>
      <tbody className='text-center'>
        {count_array.map((count, index) => (
          <tr key={index} className='h-20'>
            <td className='border'>{class_array[index]}</td>
            <td className='border'>{count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )

  // if (is_loading) {
  //   return (
  //     <Container>
  //       <Sidebar />
  //       <Header></Header>
  //     </Container>
  //   )
  // }

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
        <Table />
      </Header>
    </Container>
  )
}

export default Attendance
