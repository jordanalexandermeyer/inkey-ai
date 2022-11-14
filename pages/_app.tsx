import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { FirebaseProvider } from '../components/FirebaseProvider'
import { UserProvider } from '../components/UserProvider'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <FirebaseProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </FirebaseProvider>
    </SessionProvider>
  )
}

export default MyApp
