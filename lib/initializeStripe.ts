import { Stripe, loadStripe } from '@stripe/stripe-js'

let stripePromise: Stripe | null

const getStripe = async () => {
  if (!stripePromise) {
    await loadStripe(
      'pk_test_51Jy8ZZE3pNRhdKBqUYWJvxyo770evj972Vw6lkcK85zJ3EEuTTye3Octi29Gu7YArbXhdzJFstbqwxAgTgMbZQ6S00TeeJQ0ZC',
    )
  }

  return stripePromise
}

export default getStripe
