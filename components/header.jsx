import styled from 'styled-components'

const HeaderPanel = styled.div`
  height: 60px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  clip-path: inset(0px 0px -10px 0px);
`

const Header = ({ children }) => {
  return (
    <div className='w-full'>
      <HeaderPanel />
      <div className='px-4 py-4'>{children}</div>
    </div>
  )
}

export default Header
