import { NextApiRequest, NextApiResponse } from 'next'
import { getURL } from '../../utils/helpers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Set your secret key. Remember to switch to your live secret key in production.
    // See your keys here: https://dashboard.stripe.com/apikeys
    const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

    // The price ID passed from the client
    const { price_id: priceId } = req.query

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      billing_address_collection: 'auto',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
      // the actual Session ID is returned in the query parameter when your customer
      // is redirected to the success page.
      success_url: `${getURL()}settings?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getURL()}upgrade`,
    })

    // Redirect to the URL returned on the Checkout Session.
    // With express, you can redirect with:
    res.json({ checkoutUrl: session.url })
    res.status(200).end()
  } catch (error) {
    console.log(error)
    res.status(500).json('Server Error')
    return res.end()
  }
}
