import { getAuth } from 'firebase/auth'
import {
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

const RoleContext = createContext<{ isUserPastLimit: boolean } | undefined>(
  undefined,
)

interface Subscription {
  role: string
  status: string
  trial_end: Timestamp
  trial_start: Timestamp
}

function RoleProvider({ children }: { children: ReactNode }) {
  const [isUserPastLimit, setIsUserPastLimit] = useState(false)

  const auth = getAuth()
  const [user] = useAuthState(auth)
  const db = getFirestore()

  useEffect(() => {
    if (user) {
      const docRef = doc(db, 'counters', user.uid)
      const unsubscribe = onSnapshot(docRef, (doc) => {
        const data = doc.data()
        if (data) {
          const count = data!['words_generated']
          setIsUserPastLimit(count > 1000)
        }
      })

      return unsubscribe
    }
  }, [user])

  return (
    <RoleContext.Provider value={{ isUserPastLimit }}>
      {children}
    </RoleContext.Provider>
  )
}

function useRole() {
  const context = useContext(RoleContext)
  if (context === undefined) {
    throw new Error('useRole must be used within a UserProvider')
  }
  return context
}

export { RoleProvider, useRole }
