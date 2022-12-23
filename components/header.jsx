import Link from 'next/link'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useBoundStore } from '@/store'
import { get_group_name } from './assets/group'
import Logo from './logo'

const HeaderPanel = styled.div`
  height: 60px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  clip-path: inset(0px 0px -10px 0px);
`

const Header = ({ children }) => {
  const current_group = useBoundStore((state) => state.group)
  const is_opened = useBoundStore((state) => state.is_sidebar_open)
  const close_sidebar = useBoundStore((state) => state.close_sidebar)
  const open_sidebar = useBoundStore((state) => state.open_sidebar)
  const [is_hydrated, set_is_hydrated] = useState(false)
  useEffect(() => {
    set_is_hydrated(true)
  }, [])

  const NavigationBar = () => (
    <HeaderPanel className="flex items-center justify-between px-4" style={{ wordBreak: 'keep-all' }}>
      {!is_opened ? (
        <ul className="h-full">
          <Link href="/admin">
            <button className="px-4 h-full cursor-pointer" onClick={close_sidebar}>
              관리 페이지
            </button>
          </Link>
        </ul>
      ) : (
        <p />
      )}
      <Link href="/group">
        <button className="px-4 h-full cursor-pointer">
          {is_hydrated ? get_group_name(current_group) : '불러오는 중'}
        </button>
      </Link>
    </HeaderPanel>
  )

  const CloseHeader = () => (
    <HeaderPanel className="flex md:hidden items-center justify-between px-4">
      <Logo />
      <Link href="/" onClick={() => open_sidebar()}>
        <button className="border border-purple-400 w-10 h-10 text-2xl font-bold">&equiv;</button>
      </Link>
    </HeaderPanel>
  )

  return (
    <div className="w-full">
      {!is_opened && <CloseHeader />}
      <NavigationBar />
      <div className="px-8 py-8">{children}</div>
    </div>
  )
}

export default Header
