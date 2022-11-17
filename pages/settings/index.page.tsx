import type { NextPage } from 'next'
import Head from 'next/head'
import Navigation from '../../components/Navigation'
import ProtectedPage from '../../components/ProtectedPage'
import SettingsBody from './SettingsBody'

const Documents: NextPage = () => {
  return (
    <ProtectedPage>
      <Head>
        <title>Settings - Ghostwritten</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <Navigation />
        <SettingsBody />
      </div>
    </ProtectedPage>
  )
}

export default Documents
