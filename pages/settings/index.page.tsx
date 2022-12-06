import type { NextPage } from 'next'
import Page from '../../components/Page'
import ProtectedPage from '../../components/ProtectedPage'
import SettingsBody from './SettingsBody'

const Documents: NextPage = () => {
  return (
    <ProtectedPage>
      <Page title="Settings">
        <SettingsBody />
      </Page>
    </ProtectedPage>
  )
}

export default Documents
