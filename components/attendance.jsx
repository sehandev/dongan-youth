import styled from 'styled-components'

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
        <tr className='h-20'>
          <td className='border'>1234</td>
          <td className='border'>이름순</td>
          <td className='border'>남</td>
          <td className='border'>
            <Checkbox check />
          </td>
        </tr>
        <tr className='h-20'>
          <td className='border'>1234</td>
          <td className='border'>이름순</td>
          <td className='border'>남</td>
          <td className='border'>
            <Checkbox />
          </td>
        </tr>
        <tr className='h-20'>
          <td className='border'>1234</td>
          <td className='border'>이름순</td>
          <td className='border'>남</td>
          <td className='border'>
            <Checkbox check />
          </td>
        </tr>
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
    </Container>
  )
}

export default Attendance
