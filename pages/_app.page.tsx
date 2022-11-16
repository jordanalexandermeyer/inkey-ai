initializeFirebaseApp()
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RoleProvider } from '../components/RoleProvider'
import initializeFirebaseApp from '../lib/initializeFirebase'

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <RoleProvider>
      <Component {...pageProps} />
    </RoleProvider>
  )
}

export default MyApp
