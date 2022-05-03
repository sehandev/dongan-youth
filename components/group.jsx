import Image from 'next/image'
import Link from 'next/link'
import { useCookie } from 'next-cookie'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { change_class } from '../reducers/class_checker'
import SecondaryButton from './assets/secondary_button'

const Group = () => {
  const cookie = useCookie()
  const cookie_group = cookie.get('group')
  const current_group = useSelector((state) => state.class_checker.group)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!cookie_group) {
      document.cookie = `group=-1; Max-Age=${60 * 60 * 24 * 365}; path=/;`
    } else {
      dispatch(change_class({ group: cookie_group, grade: -1, class: -1 }))
    }
  }, [cookie_group])

  const GroupButton = ({ children, group_id }) => (
    <button
      className={
        'border p-4 w-24 hover:bg-purple-100 leading-6 ' +
        (current_group === group_id ? 'bg-purple-200' : '')
      }
      onClick={() => {
        dispatch(change_class({ group: group_id, grade: -1, class: -1 }))
        document.cookie = `group=${group_id}; Max-Age=${
          60 * 60 * 24 * 365
        }; path=/;`
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
            priority
          />
        </div>
        <div className='mb-4 font-black text-xl'>출석하는 동안</div>
      </div>

      {/* 부서 목록 */}
      <ul className='grid mb-4 grid-cols-2 md:grid-cols-4 gap-4'>
        <li>
          <GroupButton group_id={'1'}>1부</GroupButton>
        </li>
        <li>
          <GroupButton group_id={'2'}>1부+</GroupButton>
        </li>
        <li>
          <GroupButton group_id={'3'}>2부</GroupButton>
        </li>
        <li>
          <GroupButton group_id={'4'}>3부</GroupButton>
        </li>
      </ul>
      {current_group !== -1 && (
        <Link href='/'>
          <SecondaryButton className='px-4 py-2 w-fit'>완료</SecondaryButton>
        </Link>
      )}
    </div>
  )
}

export default Group
