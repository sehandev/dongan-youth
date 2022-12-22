import { SWRConfig } from 'swr'
import '../styles/globals.css'
import wrapper from '../store'

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        shouldRetryOnError: false,
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default wrapper.withRedux(MyApp)
