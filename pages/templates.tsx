import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'
import TemplatesBody from '../components/TemplatesBody'

const Templates: NextPage = () => {
  return (
    <>
      <Head>
        <title>Templates - Ghostwritten</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <Navigation />
        <TemplatesBody />
        <Footer />
      </div>
    </>
  )
}

export default Templates
