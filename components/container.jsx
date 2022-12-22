import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useBoundStore } from '@/store'

const Container = ({ children }) => {
  const router = useRouter()
  const group = useBoundStore((state) => state.group)
  useEffect(() => {
    if (group < 0) {
      router.push('/group')
    }
  }, [group])

  return (
    <div className="flex flex-col items-center justify-center select-none">
      <Head>
        <title>출석하는동안</title>
        <link rel="icon" href="/img/dongan.png" />
        <meta property="og:title" content="출석하는 동안" />
        <meta property="og:image" content="http://dongan.sehandev.com/img/dongan.png" />
        <meta property="og:description" content="동안교회 청소년부 출석부" />
      </Head>

      <main className="flex max-w-screen-xl min-h-screen w-full shadow-md">{children}</main>
    </div>
  )
}

export default Container
