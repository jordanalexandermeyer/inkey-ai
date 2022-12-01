import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Set your secret key. Remember to switch to your live secret key in production.
    // See your keys here: https://dashboard.stripe.com/apikeys
    const stripe = require('stripe')(
      'sk_test_51Jy8ZZE3pNRhdKBqzUAOPaBh9EQag3qEbcbTOZio6yv91jQtPsnLTFfUMgQGhIMp6UAYySrE6MuQLdtcyZBDzCSB00E6ZXOhsE',
    )

    // The price ID passed from the client
    const { price_id: priceId } = req.query

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
        },
      ],
      // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
      // the actual Session ID is returned in the query parameter when your customer
      // is redirected to the success page.
      success_url:
        'http://localhost:3000/subscriptions?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/subscriptions',
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
