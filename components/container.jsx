import Head from 'next/head'

import Sidebar from './sidebar'
import Header from './header'

const Container = ({ children }) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Head>
        <title>AGGA</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex max-w-screen-xl min-h-screen w-full shadow-md'>
        <Sidebar />
        <Header>{children}</Header>
      </main>
    </div>
  )
}

export default Container
