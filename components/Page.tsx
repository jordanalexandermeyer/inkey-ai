import Head from 'next/head'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import Navigation from './Navigation'

const Page = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Inkey helps you write essays 100x faster by using artificial intelligence to break through creative blocks."
        ></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1A56DB" />
        <meta name="application-name" content="Inkey" />
      </Head>
      <Navigation />
      <Toaster />
      {children}
    </>
  )
}

export default Page
