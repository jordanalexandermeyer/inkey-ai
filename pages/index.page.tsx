import type { NextPage } from 'next'
import ProtectedPage from '../components/ProtectedPage'
import DashboardBody from '../components/DashboardBody'
// import Footer from '../components/Footer'
import Page from '../components/Page'

const Home: NextPage = () => {
  return (
    <ProtectedPage>
      <Page title="Dashboard">
        <DashboardBody />
        {/* <Footer /> */}
      </Page>
    </ProtectedPage>
  )
}

export default Home
