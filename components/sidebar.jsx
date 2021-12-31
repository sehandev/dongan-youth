import styled from 'styled-components'

const SidebarPanel = styled.div`
  width: 220px;
  box-shadow: 5px 0px 30px rgba(0, 0, 0, 0.1);
`

const Sidebar = () => {
  return (
    <SidebarPanel className='bg-gray-200'>
      <h1>sidebar</h1>
    </SidebarPanel>
  )
}

export default Sidebar
