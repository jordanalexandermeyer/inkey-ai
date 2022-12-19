import { getAuth, User } from 'firebase/auth'
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'
import { useEffect, useState, createContext, useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { Role, UserDetails } from 'types'
import { Subscription } from 'types'

type UserContextType = {
  user: User | null | undefined
  userDetails: UserDetails | null
  isLoading: boolean
  subscription: Subscription | null
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export interface Props {
  [propName: string]: any
}

export const MyUserContextProvider = (props: Props) => {
  const auth = getAuth()
  const db = getFirestore()
  const [user, isLoadingUser, error] = useAuthState(auth)
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)

  const getSubscription = async (): Promise<Subscription | null> => {
    const subscriptionsRef = collection(
      db,
      'customers',
      user!.uid,
      'subscriptions',
    )
    const q = query(subscriptionsRef, where('status', '==', 'active'))
    const querySnapshot = await getDocs(q)
    let subscriptionPlaceholder = null
    querySnapshot.forEach((doc) => {
      const subscription = doc.data() as Subscription
      subscriptionPlaceholder = subscription
    })

    return subscriptionPlaceholder
  }

  useEffect(() => {
    const attachSubscriptions = async () => {
      if (user && !isLoadingData && !subscription) {
        setIsLoadingData(true)
        const subscription = await getSubscription()
        setSubscription(subscription)
        setIsLoadingData(false)
      } else if (!user && !isLoadingUser) {
        setUserDetails(null)
        setSubscription(null)
      }
    }

    attachSubscriptions()
  }, [user, isLoadingUser])

  const value = {
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  }

  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`)
  }
  return context
}
