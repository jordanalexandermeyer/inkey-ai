import type { NextPage } from 'next'
import Head from 'next/head'
import Navigation from '../components/Navigation'
import SettingsBody from '../components/SettingsBody'

const Documents: NextPage = () => {
  return (
    <>
      <Head>
        <title>Settings - Ghostwritten</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <Navigation />
        <SettingsBody />
      </div>
    </>
  )
}

export default Documents
