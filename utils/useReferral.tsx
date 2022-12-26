import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import { Referral, ReferralCode } from 'types'
import { useUser } from './useUser'

type ReferralContextType = {
  isLoading: boolean
  referralCode: ReferralCode | null
  referral: Referral | null
}

export const ReferralContext = createContext<ReferralContextType | undefined>(
  undefined,
)

export interface Props {
  [propName: string]: any
}

export const ReferralContextProvider = (props: Props) => {
  const db = getFirestore()
  const router = useRouter()
  const [isLoadingData, setIsLoadingData] = useState(false)
  const { user, isLoading: isLoadingUser } = useUser()
  const [referralCode, setReferralCode] = useState<ReferralCode | null>(null)
  const [referral, setReferral] = useState<Referral | null>(null)

  const getReferralCode = async (): Promise<ReferralCode | null> => {
    const referralsRef = collection(db, 'referral_codes')
    const q = query(referralsRef, where('provider', '==', user?.uid))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      let newReferralDetails = {
        provider: user!.uid,
        provider_bonus_allowance: 5000,
        recipient_bonus_allowance: 5000,
      }

      const newDocRef = await addDoc(
        collection(db, 'referral_codes'),
        newReferralDetails,
      )

      return { id: newDocRef.id, ...newReferralDetails }
    } else {
      let referralCodePlaceholder = null
      querySnapshot.forEach((doc) => {
        referralCodePlaceholder = { id: doc.id, ...doc.data() }
      })

      return referralCodePlaceholder
    }
  }

  const getReferral = async (): Promise<Referral | null> => {
    const referralsRef = collection(db, 'referrals')
    const q = query(referralsRef, where('recipient', '==', user!.uid))
    const querySnapshot = await getDocs(q)
    let referralPlaceholder = null
    querySnapshot.forEach((doc) => {
      const referral = doc.data()
      const id = doc.id
      referralPlaceholder = { id, ...referral }
    })

    return referralPlaceholder
  }

  useEffect(() => {
    const queryParams = router.query
    if (typeof queryParams.referral_code == 'string') {
      localStorage.setItem('referral_code', queryParams.referral_code)
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      if (user && !isLoadingData && !referralCode && !referral) {
        setIsLoadingData(true)
        const results = await Promise.allSettled([
          getReferralCode(),
          getReferral(),
        ])

        const referralCodePromise = results[0]
        const referralPromise = results[1]

        if (referralCodePromise.status === 'fulfilled') {
          setReferralCode(referralCodePromise.value)
        }

        if (referralPromise.status === 'fulfilled') {
          setReferral(referralPromise.value)
        }

        setIsLoadingData(false)
      } else if (!user && !isLoadingUser && !isLoadingData) {
        setReferralCode(null)
        setReferral(null)
      }
    }

    fetchData()
  }, [user, isLoadingUser])

  useEffect(() => {
    const handleBrowserReferralCode = async () => {
      const referralCodeFromBrowser = localStorage.getItem('referral_code')
      if (
        user &&
        !isLoadingData &&
        !referral &&
        referralCode &&
        referralCodeFromBrowser
      ) {
        // get referral code from db
        const referralCodeRef = doc(
          db,
          'referral_codes',
          referralCodeFromBrowser,
        )
        const referralCodeSnapshot = await getDoc(referralCodeRef)

        if (referralCodeSnapshot.exists()) {
          const referralCodeData = {
            id: referralCodeSnapshot.id,
            ...referralCodeSnapshot.data(),
          } as ReferralCode

          if (user.uid != referralCodeData.provider) {
            const newReferral = {
              provider: referralCodeData.provider,
              recipient: user.uid,
              referral_code: referralCodeRef,
            }

            await addDoc(collection(db, 'referrals'), newReferral)
          }
        }
        // remove item so this doesn't trigger again
        localStorage.removeItem('referral_code')
      } else if (
        user &&
        !isLoadingData &&
        referral &&
        referralCodeFromBrowser
      ) {
        localStorage.removeItem('referral_code')
      }
    }

    handleBrowserReferralCode()
  }, [user, isLoadingData])

  const value = {
    isLoading: isLoadingData,
    referralCode,
    referral,
  }

  return <ReferralContext.Provider value={value} {...props} />
}

export const useReferral = () => {
  const context = useContext(ReferralContext)
  if (context === undefined) {
    throw new Error(
      `useReferral must be used within a ReferralContextProvider.`,
    )
  }
  return context
}
