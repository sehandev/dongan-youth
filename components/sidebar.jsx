import styled from 'styled-components'

import Logo from './logo'

const SidebarPanel = styled.div`
  width: 220px;
  box-shadow: 5px 0px 30px rgba(0, 0, 0, 0.1);
`

const Sidebar = () => {
  return (
    <SidebarPanel className='bg-gray-200'>
      <div className='pt-4 pl-4'>
        <Logo />
      </div>
    </SidebarPanel>
  )
}

export default Sidebar