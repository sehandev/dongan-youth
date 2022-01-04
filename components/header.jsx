import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import Logo from './logo'
import { initialize_class } from '../reducers/class_checker'
import { open_sidebar } from '../reducers/sidebar_toggler'

const HeaderPanel = styled.div`
  height: 60px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  clip-path: inset(0px 0px -10px 0px);
`

const Header = ({ children }) => {
  const dispatch = useDispatch()
  const is_opened = useSelector((state) => state.sidebar_toggler.is_opened)

  return (
    <div className='w-full'>
      <HeaderPanel className='flex items-center justify-between px-4'>
        {!is_opened && (
          <>
            <Logo />
            <button
              className='block md:hidden border border-purple-400 w-10 h-10 text-2xl font-bold'
              onClick={() => {
                dispatch(open_sidebar())
                dispatch(initialize_class())
              }}
            >
              &equiv;
            </button>
          </>
        )}
      </HeaderPanel>
      <div className='px-8 py-8'>{children}</div>
    </div>
  )
}

export default Header
