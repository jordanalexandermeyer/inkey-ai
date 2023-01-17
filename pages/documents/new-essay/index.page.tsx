import ProtectedPage from 'components/ProtectedPage'
import { NextPage } from 'next'
import { NewEssayProvider } from './components/NewEssayContextProvider'
import NewEssayWizard from './components/NewEssayWizard'

const NewEssayPage: NextPage = () => {
  return (
    <ProtectedPage>
      <NewEssayProvider>
        <NewEssayWizard />
      </NewEssayProvider>
    </ProtectedPage>
  )
}

export default NewEssayPage
