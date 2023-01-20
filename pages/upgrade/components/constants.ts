import { BillingPeriod, Feature, Role } from 'types'

export const prices = {
  [BillingPeriod.MONTHLY]: {
    [Role.BASIC]: {
      price: 0,
    },
    [Role.PREMIUM]: {
      price: 119.4,
      stripePrice: process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM_MONTHLY,
    },
    [Role.ULTIMATE]: {
      price: 239.4,
      stripePrice: process.env.NEXT_PUBLIC_STRIPE_PRICE_ULTIMATE_MONTHLY,
    },
  },
  [BillingPeriod.SEMI_ANNUALLY]: {
    [Role.BASIC]: {
      price: 0,
    },
    [Role.PREMIUM]: {
      price: 89.9,
      stripePrice: process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM_SEMI_ANNUALLY,
    },
    [Role.ULTIMATE]: {
      price: 179.9,
      stripePrice: process.env.NEXT_PUBLIC_STRIPE_PRICE_ULTIMATE_SEMI_ANNUALLY,
    },
  },
  [BillingPeriod.ANNUALLY]: {
    [Role.BASIC]: {
      price: 0,
    },
    [Role.PREMIUM]: {
      price: 59.95,
      stripePrice: process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM_ANNUALLY,
    },
    [Role.ULTIMATE]: {
      price: 119.95,
      stripePrice: process.env.NEXT_PUBLIC_STRIPE_PRICE_ULTIMATE_ANNUALLY,
    },
  },
}

export const basicFeatures: Feature[] = [
  { included: true, text: '5,000 words/month', color: 'gray' },
  { included: true, text: 'Shorter template generations', color: 'gray' },
]

export const premiumFeatures: Feature[] = [
  { included: true, text: '25,000 words/month', color: 'green' },
  { included: true, text: 'Longer template generations', color: 'green' },
]

export const ultimateFeatures: Feature[] = [
  { included: true, text: '100,000 words/month', color: 'green' },
  { included: true, text: 'Longer template generations', color: 'green' },
]
