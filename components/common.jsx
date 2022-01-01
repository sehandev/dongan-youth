import styled from 'styled-components'

export const Headline = styled.h1`
  font-weight: 600;
  font-size: 30px;
`

export const SubHeadline = styled.h2`
  font-weight: 600;
  font-size: 18px;
`

export const Description = styled.h3`
  font-size: 14px;
`

export const DescriptionStrong = styled.strong`
  font-weight: 600;
  font-size: 14px;
  color: #8756bd;
`

export const Checkbox = ({ check }) => {
  if (check) {
    return (
      <button
        className='border border-black w-5 h-5'
        style={{ backgroundColor: '#8756bd' }}
      />
    )
  }
  return <button className='border border-black w-5 h-5' />
}
