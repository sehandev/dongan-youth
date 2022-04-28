import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

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

  const NavigationBar = () => (
    <HeaderPanel className='flex items-center justify-between px-4'>
      <ul className='h-full'>
        <Link href='/register'>
          <button className='px-4 h-full cursor-pointer'>신규 등록</button>
        </Link>
        <Link href='/statistics'>
          <button className='px-4 h-full cursor-pointer'>출석 통계</button>
        </Link>
        <Link href='/department'>
          <button className='px-4 h-full cursor-pointer'>부서 변경</button>
        </Link>
      </ul>
    </HeaderPanel>
  )

  const CloseHeader = () => (
    <HeaderPanel className='flex md:hidden items-center justify-between px-4'>
      <Logo
        onClick={() => {
          dispatch(open_sidebar())
          dispatch(initialize_class())
        }}
      />
      <button
        className='border border-purple-400 w-10 h-10 text-2xl font-bold'
        onClick={() => {
          dispatch(open_sidebar())
          dispatch(initialize_class())
        }}
      >
        &equiv;
      </button>
    </HeaderPanel>
  )

  return (
    <div className='w-full'>
      {!is_opened && <CloseHeader />}
      <NavigationBar />
      <div className='px-8 py-8'>{children}</div>
    </div>
  )
}

export default Header
