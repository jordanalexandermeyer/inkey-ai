import { getAuth, User } from 'firebase/auth'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { useEffect, useState, createContext, useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { Role, UsageDetails } from 'types'
import { Subscription } from 'types'

type UserContextType = {
  user: User | null | undefined
  usageDetails: UsageDetails | null
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
  const [usageDetails, setUsageDetails] = useState<UsageDetails | null>(null)
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
      const subscription = doc.data()
      const id = doc.id
      subscriptionPlaceholder = { id, ...subscription }
    })

    return subscriptionPlaceholder
  }

  const getUsageDetails = async (): Promise<UsageDetails> => {
    const docRef = doc(db, 'usage_details', user!.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data() as UsageDetails
    } else {
      const newUsageDetails = {
        monthly_allowance: 1000,
        monthly_usage: 0,
        total_usage: 0,
        bonus_allowance: 0,
      }

      await setDoc(docRef, newUsageDetails)

      return newUsageDetails
    }
  }

  useEffect(() => {
    const unsub =
      user &&
      onSnapshot(doc(db, 'usage_details', user?.uid), (doc) => {
        setUsageDetails(doc.data() as UsageDetails)
      })

    if (unsub) return unsub
  }, [user, isLoadingUser])

  useEffect(() => {
    const fetchData = async () => {
      if (user && !isLoadingData && !subscription && !usageDetails) {
        setIsLoadingData(true)
        const results = await Promise.allSettled([
          getSubscription(),
          getUsageDetails(),
        ])

        const subscriptionPromise = results[0]
        const usageDetailsPromise = results[1]

        if (subscriptionPromise.status === 'fulfilled') {
          setSubscription(subscriptionPromise.value)
        }

        if (usageDetailsPromise.status === 'fulfilled') {
          setUsageDetails(usageDetailsPromise.value)
        }

        setIsLoadingData(false)
      } else if (!user && !isLoadingUser && !isLoadingData) {
        setUsageDetails(null)
        setSubscription(null)
      }
    }

    fetchData()
  }, [user, isLoadingUser])

  const value = {
    user,
    usageDetails,
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