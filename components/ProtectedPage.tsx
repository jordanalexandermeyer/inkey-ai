import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'

const ProtectedPage = ({ children }: { children: ReactNode }) => {
  const { status } = useSession({ required: true })

  return <>{status == 'authenticated' && children}</>
}

export default ProtectedPage
