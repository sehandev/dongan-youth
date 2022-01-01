import styled from 'styled-components'

import Logo from './logo'

const SidebarPanel = styled.div`
  width: 16rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  clip-path: inset(0px -10px 0px 0px);
`

const Sidebar = () => {
  return (
    <SidebarPanel>
      <div className='pt-4 pl-4'>
        <Logo />
      </div>
    </SidebarPanel>
  )
}

export default Sidebar
