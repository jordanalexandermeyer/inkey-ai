import { getFunctions, httpsCallable } from 'firebase/functions'
import { NextApiRequest, NextApiResponse } from 'next'
import { getURL } from '../../utils/helpers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const functions = getFunctions()

  try {
    const createPortalLink = httpsCallable(
      functions,
      'ext-firestore-stripe-payments-createPortalLink',
    )
    const { data }: { data: any } = await createPortalLink({
      returnUrl: getURL() + 'settings',
    })

    // Redirect to the URL returned on the Checkout Session.
    // With express, you can redirect with:
    res.json({ url: data.url })
    res.status(200).end()
  } catch (error) {
    console.log(error)
    res.status(500).json('Server Error')
    return res.end()
  }
}
