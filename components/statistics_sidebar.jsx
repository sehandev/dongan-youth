import styled from 'styled-components'
import { useSelector } from 'react-redux'

import Logo from './logo'
const SidebarPanel = styled.div`
  width: 220px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  clip-path: inset(0px -10px 0px 0px);
`

const Sidebar = () => {
  const is_opened = useSelector((state) => state.sidebar_toggler.is_opened)
  const get_mobile_class = () => {
    if (is_opened) {
      return 'block'
    }
    return 'hidden'
  }

  return (
    <SidebarPanel className={`${get_mobile_class()} md:block`}>
      <div className='mb-4 pt-4 pl-4'>
        <Logo />
      </div>
    </SidebarPanel>
  )
}

export default Sidebar
