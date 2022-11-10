import type { NextPage } from 'next'
import Head from 'next/head'
import DocumentsBody from './DocumentsBody'
import Navigation from '../../components/Navigation'
import ProtectedPage from '../../components/ProtectedPage'

const Documents: NextPage = () => {
  return (
    <ProtectedPage>
      <Head>
        <title>Documents - Ghostwritten</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <Navigation />
        <DocumentsBody />
      </div>
    </ProtectedPage>
  )
}

export default Documents
