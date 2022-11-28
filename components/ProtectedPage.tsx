import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRole } from './RoleProvider'

const ProtectedPage = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const auth = getAuth()
  const { isUserEarlyAccess, isRoleLoading } = useRole()
  const [user, loading, error] = useAuthState(auth)

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login')
    }
  }, [user, loading, isUserEarlyAccess, isRoleLoading])

  return <>{user && children}</>
}

export default ProtectedPage
