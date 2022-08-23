import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { change_class, initialize_class } from '../reducers/class_checker'
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

const Sidebar = () => {
  const dispatch = useDispatch()
  const is_opened = useSelector((state) => state.sidebar_toggler.is_opened)
  const current_grade = useSelector((state) => state.class_checker.grade)
  const current_class = useSelector((state) => state.class_checker.class)

  const ClassButton = ({ button_grade, button_class }) => {
    const get_button_name = (button_grade, button_class) => {
      if (button_grade == 0 && button_class == 0) {
        return '선생님'
      }
      if (button_class == 0) {
        return `${button_grade}학년`
      }
      return `${button_grade}학년 ${button_class}반`
    }

    if (button_grade == current_grade && button_class == current_class) {
      return (
        <Link href='/'>
          <CurrentButton
            button_grade={button_grade}
            button_class={button_class}
            onClick={() => {
              dispatch(change_class({ grade: button_grade, class: button_class }))
              dispatch(close_sidebar())
            }}
          >
            <img className='inline-block mr-2 w-8 h-8' src='https://img.icons8.com/pastel-glyph/512/ffffff/person-male--v1.png' />
            <span className='align-middle'>{get_button_name(button_grade, button_class)}</span>
          </CurrentButton>
        </Link>
      )
    }
    return (
      <Link href='/'>
        <NormalButton
          button_grade={button_grade}
          button_class={button_class}
          onClick={() => {
            dispatch(change_class({ grade: button_grade, class: button_class }))
            dispatch(close_sidebar())
          }}
          className='hover:bg-purple-100'
        >
          <img className='inline-block mr-2 w-8 h-8' src='https://img.icons8.com/pastel-glyph/512/000000/person-male--v1.png' />
          <span className='align-middle'>{get_button_name(button_grade, button_class)}</span>
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
      <div className='flex' style={{ height: '60px' }}>
        <Logo
          className='px-4'
          onClick={() => {
            dispatch(initialize_class())
            dispatch(close_sidebar())
          }}
        />
      </div>
      <ClassButton button_grade={1} button_class={0} />
      <ClassButton button_grade={1} button_class={1} />
      <ClassButton button_grade={1} button_class={2} />
      <ClassButton button_grade={1} button_class={3} />
      <ClassButton button_grade={2} button_class={0} />
      <ClassButton button_grade={2} button_class={1} />
      <ClassButton button_grade={2} button_class={2} />
      <ClassButton button_grade={2} button_class={3} />
      <ClassButton button_grade={3} button_class={0} />
      <ClassButton button_grade={3} button_class={1} />
      <ClassButton button_grade={3} button_class={2} />
      <ClassButton button_grade={3} button_class={3} />
      <ClassButton button_grade={0} button_class={0} />
    </SidebarPanel>
  )
}

export default Sidebar
