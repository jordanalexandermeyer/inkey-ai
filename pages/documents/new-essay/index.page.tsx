import ProtectedPage from 'components/ProtectedPage'
import { NextPage } from 'next'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import { CitationsProvider } from './components/CitationsContextProvider'
import { NewEssayProvider } from './components/NewEssayContextProvider'
import NewEssayWizard from './components/NewEssayWizard'

const NewEssayPage: NextPage = () => {
  return (
    <ProtectedPage>
      <Head>
        <title>Magic Essay Writer - Inkey</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Toaster />
      <NewEssayProvider>
        <CitationsProvider>
          <NewEssayWizard />
        </CitationsProvider>
      </NewEssayProvider>
    </ProtectedPage>
  )
}

export default NewEssayPage
