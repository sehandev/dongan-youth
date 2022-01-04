import Head from 'next/head'

const Container = ({ children }) => {
  return (
    <div className='flex flex-col items-center justify-center select-none'>
      <Head>
        <title>AGGA</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex max-w-screen-xl min-h-screen w-full shadow-md'>
        {children}
      </main>
    </div>
  )
}

export default Container
