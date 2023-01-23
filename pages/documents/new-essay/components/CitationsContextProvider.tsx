import { useUser } from '@/utils/useUser'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

type CitationsContext = {
  showCitationsModal: boolean
  setShowCitationsModal: Dispatch<SetStateAction<boolean>>
}

export type Resource = {}

const CitationsContext = createContext<CitationsContext | undefined>(undefined)

function CitationsProvider({ children }: { children: ReactNode }) {
  const [showCitationsModal, setShowCitationsModal] = useState(false)

  const getResources = async (query: string) => {
    const response = await fetch(`/api/resources?query=${query}`)
    const body = await response.json()
    const resources: Resource[] = body.resources
    if (!resources) {
      throw {}
    }
    return resources
  }

  const value = { showCitationsModal, setShowCitationsModal }

  return (
    <CitationsContext.Provider value={value}>
      {children}
    </CitationsContext.Provider>
  )
}

function useCitations() {
  const context = useContext(CitationsContext)
  if (context === undefined) {
    throw new Error('useCitations must be used within a CitationsProvider')
  }
  return context
}

export { CitationsProvider, useCitations }
