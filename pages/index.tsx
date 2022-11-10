import type { NextPage } from 'next'
import Head from 'next/head'
import ProtectedPage from '../components/ProtectedPage'
import DashboardBody from '../components/DashboardBody'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'

const Home: NextPage = () => {
  return (
    <ProtectedPage>
      <Head>
        <title>Overview - Ghostwritten</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <Navigation />
        <DashboardBody />
        <Footer />
      </div>
    </ProtectedPage>
  )
}

export default Home
