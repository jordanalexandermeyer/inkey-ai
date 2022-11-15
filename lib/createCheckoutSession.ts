import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
} from 'firebase/firestore'

export async function createCheckoutSession(uid: string) {
  const db = getFirestore()

  const checkoutSessionRef = await addDoc(
    collection(db, 'customers', uid, 'checkout_sessions'),
    {
      price: 'price_1M4CSiE3pNRhdKBq0SDg5xkZ',
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    },
  )

  onSnapshot(checkoutSessionRef, async (doc) => {
    const checkoutSession = doc.data()

    if (checkoutSession && checkoutSession.url) {
      window.location.assign(checkoutSession.url)
    }
  })
}
