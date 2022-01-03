import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import Logo from './logo'
import { change_class } from '../reducers/class_checker'

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

  const current_grade = useSelector((state) => state.class_checker.grade)
  const current_class = useSelector((state) => state.class_checker.class)

  const ClassButton = ({ button_grade, button_class }) => {
    if (button_grade == current_grade && button_class == current_class) {
      return (
        <CurrentButton
          button_grade={button_grade}
          button_class={button_class}
          onClick={() =>
            dispatch(change_class({ grade: button_grade, class: button_class }))
          }
        >
          <img
            className='inline-block mr-2 w-8 h-8'
            src='https://img.icons8.com/pastel-glyph/512/ffffff/person-male--v1.png'
          />
          <span className='align-middle'>
            {button_grade == 0 && button_class == 0 ? (
              <span>선생님</span>
            ) : (
              <span>
                {button_grade}학년 {button_class}반
              </span>
            )}
          </span>
        </CurrentButton>
      )
    }
    return (
      <NormalButton
        button_grade={button_grade}
        button_class={button_class}
        onClick={() =>
          dispatch(change_class({ grade: button_grade, class: button_class }))
        }
        className='hover:bg-purple-100'
      >
        <img
          className='inline-block mr-2 w-8 h-8'
          src='https://img.icons8.com/pastel-glyph/512/000000/person-male--v1.png'
        />
        <span className='align-middle'>
          {button_grade == 0 && button_class == 0 ? (
            <span>선생님</span>
          ) : (
            <span>
              {button_grade}학년 {button_class}반
            </span>
          )}
        </span>
      </NormalButton>
    )
  }

  return (
    <SidebarPanel>
      <div className='mb-4 pt-4 pl-4'>
        <Logo />
      </div>
      {[1, 2, 3].map((grade_index) => {
        return [1, 2].map((class_index) => {
          return (
            <ClassButton
              button_grade={grade_index}
              button_class={class_index}
            />
          )
        })
      })}
      <ClassButton button_grade={0} button_class={0} />
    </SidebarPanel>
  )
}

export default Sidebar
