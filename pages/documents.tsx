import type { NextPage } from 'next'
import Head from 'next/head'
import DocumentsBody from '../components/DocumentsBody'
import Navigation from '../components/Navigation'

const Documents: NextPage = () => {
  return (
    <>
      <Head>
        <title>Documents - Ghostwritten</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <Navigation />
        <DocumentsBody />
      </div>
    </>
  )
}

export default Documents
