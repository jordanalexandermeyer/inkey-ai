import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useSession } from 'next-auth/react'
import { useFirebase } from './FirebaseProvider'
import { collection, getDocs, query, where } from 'firebase/firestore'

const UserContext = createContext<undefined>(undefined)

function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>({})
  const session = useSession()
  const db = useFirebase()

  useEffect(() => {
    const getUser = async () => {
      const email = session.data?.user?.email
      if (email) {
        const q = query(collection(db, 'users'), where('email', '==', email))
        const querySnapshot = await getDocs(q)
        let userId = ''
        let userData = {}
        querySnapshot.forEach((doc) => {
          userId = doc.id
          userData = doc.data()
        })
        setUser({
          id: userId,
          ...userData,
        })
      }
    }

    getUser()
  }, [session.data?.user])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export { UserProvider, useUser }
