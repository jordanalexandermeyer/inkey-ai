import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'

const ProtectedPage = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status != 'loading' && !session?.user) {
      router.push('/auth/login')
    }
  })

  return <>{children}</>
}

export default ProtectedPage
