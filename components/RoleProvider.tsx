import { getAuth } from 'firebase/auth'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import getIsUserEarlyAccess from '../lib/isUserEarlyAccess'

const RoleContext = createContext<undefined | boolean>(undefined)

function RoleProvider({ children }: { children: ReactNode }) {
  const [isUserEarlyAccess, setIsUserEarlyAccess] = useState<boolean>(true)

  const auth = getAuth()
  const [user, loading, error] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      const checkEarlyAccess = async function () {
        setIsUserEarlyAccess(await getIsUserEarlyAccess(user))
      }

      checkEarlyAccess()
    }
  }, [user, loading])

  return (
    <RoleContext.Provider value={isUserEarlyAccess}>
      {children}
    </RoleContext.Provider>
  )
}

function useRole() {
  const context = useContext(RoleContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export { RoleProvider, useRole }
