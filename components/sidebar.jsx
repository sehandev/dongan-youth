import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { close_sidebar } from '../reducers/sidebar_toggler'
import Logo from './logo'

const SidebarPanel = styled.div`
  width: 220px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  clip-path: inset(0px -10px 0px 0px);
`

const NormalButton = styled.button`
  width: 220px;
  height: 60px;
  padding-left: 1rem;
  text-align: start;
`

const CurrentButton = styled.button`
  width: 220px;
  height: 60px;
  padding-left: 1rem;
  text-align: start;
  color: #fff;
  background-color: #8756bd;
`

const Sidebar = ({ grade_id, class_id }) => {
  const dispatch = useDispatch()
  const is_opened = useSelector((state) => state.sidebar_toggler.is_opened)

  const ClassButton = ({ btn_grade, btn_class }) => {
    const get_btn_name = (btn_grade, btn_class) => {
      if (btn_grade == 0 && btn_class == 0) {
        return '선생님'
      }
      if (btn_class == 0) {
        return `${btn_grade}학년`
      }
      return `${btn_grade}학년 ${btn_class}반`
    }

    if (btn_grade == grade_id && btn_class == class_id) {
      return (
        <Link href={`/attendance/${btn_grade}/${btn_class}`}>
          <CurrentButton
            btn_grade={btn_grade}
            btn_class={btn_class}
            onClick={() => {
              dispatch(close_sidebar())
            }}
          >
            <img
              className="inline-block mr-2 w-8 h-8"
              src="https://img.icons8.com/pastel-glyph/512/ffffff/person-male--v1.png"
            />
            <span className="align-middle">{get_btn_name(btn_grade, btn_class)}</span>
          </CurrentButton>
        </Link>
      )
    }
    return (
      <Link href={`/attendance/${btn_grade}/${btn_class}`}>
        <NormalButton
          btn_grade={btn_grade}
          btn_class={btn_class}
          onClick={() => {
            dispatch(close_sidebar())
          }}
          className="hover:bg-purple-100"
        >
          <img
            className="inline-block mr-2 w-8 h-8"
            src="https://img.icons8.com/pastel-glyph/512/000000/person-male--v1.png"
          />
          <span className="align-middle">{get_btn_name(btn_grade, btn_class)}</span>
        </NormalButton>
      </Link>
    )
  }

  const get_mobile_class = () => {
    if (is_opened) {
      return 'flex'
    }
    return 'hidden'
  }

  return (
    <SidebarPanel className={`${get_mobile_class()} md:flex flex-col`}>
      <div className="flex" style={{ height: '60px' }}>
        <Logo
          className="px-4"
          onClick={() => {
            dispatch(close_sidebar())
          }}
        />
      </div>
      <ClassButton btn_grade={1} btn_class={0} />
      <ClassButton btn_grade={1} btn_class={1} />
      <ClassButton btn_grade={1} btn_class={2} />
      <ClassButton btn_grade={1} btn_class={3} />
      <ClassButton btn_grade={2} btn_class={0} />
      <ClassButton btn_grade={2} btn_class={1} />
      <ClassButton btn_grade={2} btn_class={2} />
      <ClassButton btn_grade={2} btn_class={3} />
      <ClassButton btn_grade={3} btn_class={0} />
      <ClassButton btn_grade={3} btn_class={1} />
      <ClassButton btn_grade={3} btn_class={2} />
      <ClassButton btn_grade={3} btn_class={3} />
      <ClassButton btn_grade={0} btn_class={0} />
    </SidebarPanel>
  )
}

export default Sidebar
