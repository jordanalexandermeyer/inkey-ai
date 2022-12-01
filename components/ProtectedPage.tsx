import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

const ProtectedPage = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const auth = getAuth()
  const [user, loading] = useAuthState(auth)

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login')
    }
  }, [user, loading])

  return <>{user && children}</>
}

export default ProtectedPage
