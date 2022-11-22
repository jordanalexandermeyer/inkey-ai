import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
} from 'firebase/firestore'

export async function createCheckoutSession(
  uid: string,
  setIsLoading: CallableFunction | undefined,
) {
  if (setIsLoading) {
    setIsLoading(true)
  }
  const db = getFirestore()

  const checkoutSessionRef = await addDoc(
    collection(db, 'customers', uid, 'checkout_sessions'),
    {
      price: process.env.NEXT_PUBLIC_STRIPE_EARLY_ACCESS_PRODUCT,
      success_url: window.location.href,
      cancel_url: window.location.href,
      allow_promotion_codes: true,
    },
  )

  onSnapshot(checkoutSessionRef, async (doc) => {
    const checkoutSession = doc.data()

    if (checkoutSession && checkoutSession.url) {
      window.location.assign(checkoutSession.url)
      if (setIsLoading) {
        setIsLoading(false)
      }
    }
  })
}
