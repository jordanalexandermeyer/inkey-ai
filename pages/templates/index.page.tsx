import type { NextPage } from 'next'
import Footer from '../../components/Footer'
import Page from '../../components/Page'
import ProtectedPage from '../../components/ProtectedPage'
import TemplatesBody from './components/TemplatesBody'

const Templates: NextPage = () => {
  return (
    <ProtectedPage>
      <Page title="Templates - Ghostwritten">
        <TemplatesBody />
        {/* <Footer /> */}
      </Page>
    </ProtectedPage>
  )
}

export default Templates
