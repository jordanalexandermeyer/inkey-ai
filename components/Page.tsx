import Head from 'next/head'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import Navigation from './Navigation'

const Page = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navigation />
      <Toaster />
      {children}
    </>
  )
}

export default Page
