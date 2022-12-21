import { BillingPeriod, Feature, Role } from 'types'

export const prices = {
  [BillingPeriod.MONTHLY]: {
    [Role.BASIC]: {
      price: 0,
    },
    [Role.PREMIUM]: {
      price: 239.4,
      stripePrice: process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM_MONTHLY,
    },
    [Role.ULTIMATE]: {
      price: 479.4,
      stripePrice: process.env.NEXT_PUBLIC_STRIPE_PRICE_ULTIMATE_MONTHLY,
    },
  },
  [BillingPeriod.SEMI_ANNUALLY]: {
    [Role.BASIC]: {
      price: 0,
    },
    [Role.PREMIUM]: {
      price: 159.9,
      stripePrice: process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM_SEMI_ANNUALLY,
    },
    [Role.ULTIMATE]: {
      price: 319.9,
      stripePrice: process.env.NEXT_PUBLIC_STRIPE_PRICE_ULTIMATE_SEMI_ANNUALLY,
    },
  },
  [BillingPeriod.ANNUALLY]: {
    [Role.BASIC]: {
      price: 0,
    },
    [Role.PREMIUM]: {
      price: 99.95,
      stripePrice: process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM_ANNUALLY,
    },
    [Role.ULTIMATE]: {
      price: 199.95,
      stripePrice: process.env.NEXT_PUBLIC_STRIPE_PRICE_ULTIMATE_ANNUALLY,
    },
  },
}

export const basicFeatures: Feature[] = [
  { included: true, text: '1,000 words/month', color: 'gray-400' },
  {
    included: true,
    text: '1,000 characters in the paraphraser',
    color: 'gray-400',
  },
  { included: true, text: '1,000 characters in summarizer', color: 'gray-400' },
  { included: true, text: 'Shorter template generations', color: 'gray-400' },
]

export const premiumFeatures: Feature[] = [
  { included: true, text: '25,000 words/month', color: 'green-500' },
  {
    included: true,
    text: '15,000 characters in the paraphraser',
    color: 'green-500',
  },
  {
    included: true,
    text: '15,000 characters in summarizer',
    color: 'green-500',
  },
  { included: true, text: 'Longer template generations', color: 'green-500' },
]

export const ultimateFeatures: Feature[] = [
  { included: true, text: '100,000 words/month', color: 'green-500' },
  {
    included: true,
    text: '15,000 characters in the paraphraser',
    color: 'green-500',
  },
  {
    included: true,
    text: '15,000 characters in summarizer',
    color: 'green-500',
  },
  { included: true, text: 'Longer template generations', color: 'green-500' },
]
