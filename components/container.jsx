import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Container = ({ children }) => {
  const router = useRouter()
  const department_id = useSelector((state) => state.class_checker.department)
  useEffect(() => {
    if (department_id === -1) {
      router.push('/department')
    }
  }, [department_id])

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
