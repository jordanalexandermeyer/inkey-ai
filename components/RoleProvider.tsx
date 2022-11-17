import { getAuth } from 'firebase/auth'
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  Timestamp,
  where,
} from 'firebase/firestore'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

const RoleContext = createContext<
  | undefined
  | {
      subscriptions: Subscription[]
      isUserEarlyAccess: boolean
      isRoleLoading: boolean
    }
>(undefined)

interface Subscription {
  role: string
  status: string
  trial_end: Timestamp
  trial_start: Timestamp
}

function RoleProvider({ children }: { children: ReactNode }) {
  const [isUserEarlyAccess, setIsUserEarlyAccess] = useState<boolean>(false)
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [isRoleLoading, setIsRoleLoading] = useState(true)

  const auth = getAuth()
  const [user, loading, error] = useAuthState(auth)
  const db = getFirestore()

  useEffect(() => {
    if (user) {
      const collectionRef = collection(
        db,
        'customers',
        user.uid,
        'subscriptions',
      )

      const q = query(
        collectionRef,
        where('status', 'in', ['trialing', 'active']),
      )

      onSnapshot(q, (querySnapshot) => {
        const subscriptionsFromDB: any = []
        querySnapshot.forEach((doc) => {
          subscriptionsFromDB.push(doc.data())
        })
        setSubscriptions(subscriptionsFromDB)
        setIsUserEarlyAccess(subscriptionsFromDB.length > 0)
        setIsRoleLoading(false)
      })
    }
  }, [user])

  return (
    <RoleContext.Provider
      value={{ subscriptions, isUserEarlyAccess, isRoleLoading }}
    >
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
