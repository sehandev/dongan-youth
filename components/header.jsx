import styled from 'styled-components'

const HeaderPanel = styled.div`
  height: 60px;
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.1);
`

const Header = ({ children }) => {
  return (
    <div className='w-full'>
      <HeaderPanel />
      <div className='pt-4 pl-4'>{children}</div>
    </div>
  )
}

export default Header
