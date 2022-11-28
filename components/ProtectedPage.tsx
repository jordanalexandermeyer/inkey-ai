import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRole } from './RoleProvider'

const ProtectedPage = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const auth = getAuth()
  const [user, loading] = useAuthState(auth)
  const { isUserPastLimit } = useRole()

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login')
    }

    if (isUserPastLimit) {
      router.push('/subscriptions')
    }
  }, [user, loading, isUserPastLimit])

  return <>{user && children}</>
}

export default ProtectedPage
