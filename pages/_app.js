import { SWRConfig } from 'swr'
import '../styles/globals.css'

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

export default MyApp
