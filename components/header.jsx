import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { initialize_class } from '../reducers/class_checker'
import { close_sidebar, open_sidebar } from '../reducers/sidebar_toggler'
import { get_group_name } from './assets/group'
import Logo from './logo'

const HeaderPanel = styled.div`
  height: 60px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  clip-path: inset(0px 0px -10px 0px);
`

const Header = ({ children }) => {
  const dispatch = useDispatch()
  const group_id = useSelector((state) => state.class_checker.group)
  const is_opened = useSelector((state) => state.sidebar_toggler.is_opened)

  const NavigationBar = () => (
    <HeaderPanel className='flex items-center justify-between px-4' style={{ wordBreak: 'keep-all' }}>
      {!is_opened ? (
        <ul className='h-full'>
          <Link href='/admin/members/new'>
            <button
              className='px-4 h-full cursor-pointer'
              onClick={() => {
                dispatch(close_sidebar())
              }}
            >
              신규 등록
            </button>
          </Link>
          <Link href='/statistics'>
            <button
              className='px-4 h-full cursor-pointer'
              onClick={() => {
                dispatch(close_sidebar())
              }}
            >
              출석 통계
            </button>
          </Link>
        </ul>
      ) : (
        <p />
      )}
      <Link href='/group'>
        <button className='px-4 h-full cursor-pointer'>{get_group_name(group_id)}</button>
      </Link>
    </HeaderPanel>
  )

  const CloseHeader = () => (
    <HeaderPanel className='flex md:hidden items-center justify-between px-4'>
      <Logo
        onClick={() => {
          dispatch(initialize_class())
        }}
      />
      <Link href='/'>
        <button
          className='border border-purple-400 w-10 h-10 text-2xl font-bold'
          onClick={() => {
            dispatch(open_sidebar())
            dispatch(initialize_class())
          }}
        >
          &equiv;
        </button>
      </Link>
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
