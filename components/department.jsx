import Image from 'next/image'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'

import { change_class } from '../reducers/class_checker'
import SecondaryButton from './assets/secondary_button'

const Department = () => {
  const current_department_id = useSelector(
    (state) => state.class_checker.department
  )
  const dispatch = useDispatch()

  const DepartmentButton = ({ children, department_id }) => (
    <button
      className={
        'border p-4 w-24 hover:bg-purple-100 leading-6 ' +
        (current_department_id === department_id ? 'bg-purple-200' : '')
      }
      onClick={() => {
        dispatch(
          change_class({ department: department_id, grade: -1, class: -1 })
        )
      }}
    >
      {children}
    </button>
  )

  return (
    <div className='flex w-full min-h-screen flex-col justify-center items-center'>
      {/* 로고 */}
      <div className='flex mb-4 flex-col items-center'>
        <div className='relative mb-2 w-16 h-16'>
          <Image
            src='/img/dongan.png'
            layout='fill'
            objectFit='contain'
            quality={100}
          />
        </div>
        <div className='mb-4 font-black text-xl'>출석하는 동안</div>
      </div>

      {/* 부서 목록 */}
      <ul className='flex mb-4 gap-4'>
        <li>
          <DepartmentButton department_id={1}>1부</DepartmentButton>
        </li>
        <li>
          <DepartmentButton department_id={2}>1부+</DepartmentButton>
        </li>
        <li>
          <DepartmentButton department_id={3}>2부</DepartmentButton>
        </li>
        <li>
          <DepartmentButton department_id={4}>3부</DepartmentButton>
        </li>
      </ul>
      {current_department_id !== -1 && (
        <Link href='/'>
          <SecondaryButton className='px-4 py-2 w-fit'>완료</SecondaryButton>
        </Link>
      )}
    </div>
  )
}

export default Department
