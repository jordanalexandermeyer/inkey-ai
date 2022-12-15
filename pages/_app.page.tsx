initializeFirebaseApp()
initializeAmplitude()
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import initializeFirebaseApp from '../lib/initializeFirebase'
import initializeAmplitude from '../lib/initializeAmplitude'

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
