import ProtectedPage from 'components/ProtectedPage'
import { NextPage } from 'next'
import { Toaster } from 'react-hot-toast'
import { NewEssayProvider } from './components/NewEssayContextProvider'
import NewEssayWizard from './components/NewEssayWizard'

const NewEssayPage: NextPage = () => {
  return (
    <ProtectedPage>
      <Toaster />
      <NewEssayProvider>
        <NewEssayWizard />
      </NewEssayProvider>
    </ProtectedPage>
  )
}

export default NewEssayPage
