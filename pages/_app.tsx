import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { initializeApp } from 'firebase/app'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBBYmrvmxfse8EBzcNSt_igBQOrM44N29k',
  authDomain: 'ghostwritten-c07c3.firebaseapp.com',
  projectId: 'ghostwritten-c07c3',
  storageBucket: 'ghostwritten-c07c3.appspot.com',
  messagingSenderId: '1014010838239',
  appId: '1:1014010838239:web:c5d3cc0a3231306324fd6a',
  measurementId: 'G-94YEP30LP8',
}

const app = initializeApp(firebaseConfig)

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
