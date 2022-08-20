import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCookie } from 'next-cookie'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { change_class } from '../reducers/class_checker'

const Container = ({ children }) => {
  const cookie = useCookie()
  const cookie_group = cookie.get('group')
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    if (!cookie_group || cookie_group < 0) {
      router.push('/group')
    } else {
      dispatch(
        change_class({ group: cookie_group, grade: -1, class: -1 })
      )
    }
  }, [cookie_group])

  return (
    <div className='flex flex-col items-center justify-center select-none'>
      <Head>
        <title>출석하는동안</title>
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:title' content='출석하는 동안' />
        <meta
          property='og:image'
          content='http://dongan.sehandev.com/img/dongan.png'
        />
        <meta property='og:description' content='동안교회 청소년부 출석부' />
      </Head>

      <main className='flex max-w-screen-xl min-h-screen w-full shadow-md'>
        {children}
      </main>
    </div>
  )
}

export default Container
