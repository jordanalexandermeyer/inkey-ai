import { NextPage } from 'next'
import { useState } from 'react'
import Page from '../../components/Page'
import FeatureList, { Feature } from './components/FeatureList'

enum BillingPeriod {
  MONTHLY = 'monthly',
  SEMI_ANNUALLY = 'semi-annually',
  ANNUALLY = 'annually',
}

enum Product {
  BASIC = 'basic',
  PREMIUM = 'premium',
  ULTIMATE = 'ultimate',
}

const prices = {
  [BillingPeriod.MONTHLY]: {
    [Product.BASIC]: {
      price: 0,
    },
    [Product.PREMIUM]: {
      price: 239.4,
    },
    [Product.ULTIMATE]: {
      price: 479.4,
    },
  },
  [BillingPeriod.SEMI_ANNUALLY]: {
    [Product.BASIC]: {
      price: 0,
    },
    [Product.PREMIUM]: {
      price: 159.9,
    },
    [Product.ULTIMATE]: {
      price: 319.9,
    },
  },
  [BillingPeriod.ANNUALLY]: {
    [Product.BASIC]: {
      price: 0,
    },
    [Product.PREMIUM]: {
      price: 99.95,
    },
    [Product.ULTIMATE]: {
      price: 199.95,
    },
  },
}

const basicFeatures: Feature[] = [
  { included: true, text: '1,000 words/month', color: 'gray-400' },
  {
    included: true,
    text: '5,000 characters in the paraphraser',
    color: 'gray-400',
  },
  { included: true, text: '5,000 characters in summarizer', color: 'gray-400' },
  { included: true, text: 'Shorter template generations', color: 'gray-400' },
]

const premiumFeatures: Feature[] = [
  { included: true, text: '20,000 words/month', color: 'green-500' },
  {
    included: true,
    text: '10,000 characters in the paraphraser',
    color: 'green-500',
  },
  {
    included: true,
    text: '10,000 characters in summarizer',
    color: 'green-500',
  },
  { included: true, text: 'Longer template generations', color: 'green-500' },
]

const ultimateFeatures: Feature[] = [
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

const roundToTwoDecimals = (input: number) => {
  return Math.round(input * 100) / 100
}

const PremiumPage: NextPage = () => {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod | string>(
    BillingPeriod.ANNUALLY,
  )

  const getBillFromProduct = (product: Product) => {
    if (billingPeriod == BillingPeriod.ANNUALLY)
      return (
        roundToTwoDecimals(prices[BillingPeriod.ANNUALLY][product].price) +
        ' billed every 12 months'
      )
    else if (billingPeriod == BillingPeriod.SEMI_ANNUALLY)
      return (
        roundToTwoDecimals(
          prices[BillingPeriod.SEMI_ANNUALLY][product].price / 2,
        ) + ' billed every 6 months'
      )
    else
      return (
        roundToTwoDecimals(prices[BillingPeriod.MONTHLY][product].price / 12) +
        ' billed every month'
      )
  }

  const basicPrice = roundToTwoDecimals(
    prices[billingPeriod as keyof typeof prices][Product.BASIC].price / 12,
  )

  const premiumPrice = roundToTwoDecimals(
    prices[billingPeriod as keyof typeof prices][Product.PREMIUM].price / 12,
  )

  const ultimatePrice = roundToTwoDecimals(
    prices[billingPeriod as keyof typeof prices][Product.ULTIMATE].price / 12,
  )

  return (
    <Page title="Premium - Inkey">
      <div className="py-8 px-4 pb-36 min-h-screen mx-auto lg:py-16 lg:px-6 bg-gray-100">
        <div className="mx-auto max-w-screen-md text-center mb-8">
          <h2 className="mb-4 text-3xl tracking-tight font-semibold text-gray-900 dark:text-white">
            Ready to get started?
          </h2>
          <p className="mb-1 font-light text-gray-500 sm:text-xl">
            Join thousands of students using Inkey.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="text-center mb-1.5">
            <span>Billing: </span>
            <span>
              <strong className="text-purple-600">Save 58%</strong> with annual{' '}
            </span>
          </div>
          <div className="flex items-center justify-center mb-8 space-x-3">
            <div>
              <select
                value={billingPeriod}
                onChange={(e) => setBillingPeriod(e.target.value)}
                className="block w-full py-2 pl-3 pr-10 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-blue-400 sm:text-sm"
              >
                <option value={BillingPeriod.ANNUALLY}>Annually</option>
                <option value={BillingPeriod.SEMI_ANNUALLY}>
                  Semi-Annually
                </option>
                <option value={BillingPeriod.MONTHLY}>Monthly</option>
              </select>
            </div>
          </div>
        </div>
        <div className="max-w-md mx-auto space-y-4 md:grid md:max-w-7xl md:grid-cols-3 md:gap-5 md:space-y-0">
          <div className="rounded-lg border border-gray-100 shadow flex flex-col justify-between p-6 mx-auto max-w-sm text-center text-gray-900 bg-white ">
            <h3 className="mb-4 text-2xl font-semibold">Basic</h3>
            <p className="justify-self-stretch font-light text-gray-500 sm:text-lg">
              Perfect for testing it out
            </p>
            <div className="flex justify-center items-baseline mt-6 mb-3">
              <span className="mr-2 text-5xl font-extrabold">
                ${basicPrice}
              </span>
              <span className="text-gray-500">/month</span>
            </div>
            <p className="text-gray-600 mb-6 text-sm">
              (${getBillFromProduct(Product.BASIC)})
            </p>
            <FeatureList features={basicFeatures} />
            <button
              type="submit"
              className="relative inline-flex items-center justify-center overflow-hidden font-semibold transition duration-100 ease-in-out rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center w-full space-x-2 sm:px-6 px-4 h-14 text-lg sm:text-lg leading-5 tracking-tight text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-sm hover:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:ring-offset-gray-900 active:bg-gray-50 active:text-gray-800"
            >
              <div>Contact Sales</div>
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 opacity-50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </button>
          </div>
          <div className="overflow-hidden rounded-lg ring-4 ring-blue-500 shadow-2xl flex flex-col justify-between p-6 mx-auto max-w-sm text-center text-gray-900 bg-white">
            <h3 className="mb-4 text-2xl font-semibold">Premium 🧑‍🎓</h3>
            <p className="font-light text-gray-500 sm:text-lg">
              For students getting started
            </p>
            <div className="flex justify-center items-baseline mt-8 mb-3">
              <span className="mr-2 text-5xl font-extrabold">
                ${premiumPrice}
              </span>
              <span className="text-gray-500">/month</span>
            </div>
            <p className="text-gray-600 mb-6 text-sm">
              (${getBillFromProduct(Product.PREMIUM)})
            </p>
            <FeatureList features={premiumFeatures} />
            <button
              type="submit"
              className="relative inline-flex items-center justify-center overflow-hidden font-semibold transition duration-100 ease-in-out rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center w-full space-x-2 sm:px-6 px-4 h-14 text-lg sm:text-lg leading-5 tracking-tight text-white bg-blue-600 shadow-sm hover:bg-blue-400 active:bg-blue-700"
            >
              <div>Get Started</div>
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 opacity-50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </button>
          </div>
          <div className="overflow-hidden rounded-lg ring-4 ring-purple-500 shadow-2xl flex flex-col justify-between p-6 mx-auto max-w-sm text-center text-gray-900 bg-white">
            <h3 className="mb-4 text-2xl font-semibold">Ultimate 🦾</h3>
            <p className="font-light text-gray-500 sm:text-lg">
              For power users
            </p>
            <div className="flex justify-center items-baseline mt-8 mb-3">
              <span className="mr-2 text-5xl font-extrabold">
                ${ultimatePrice}
              </span>
              <span className="text-gray-500">/month</span>
            </div>
            <p className="text-gray-600 mb-6 text-sm">
              (${getBillFromProduct(Product.ULTIMATE)})
            </p>
            <FeatureList features={ultimateFeatures} />
            <button
              type="submit"
              className="relative inline-flex items-center justify-center overflow-hidden font-semibold transition duration-100 ease-in-out rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center w-full space-x-2 sm:px-6 px-4 h-14 text-lg sm:text-lg leading-5 tracking-tight text-white bg-gradient-to-br from-purple-600 to-blue-600 shadow-sm hover:bg-purple-400 active:bg-purple-700"
            >
              <div>Get Started</div>
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 opacity-50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default PremiumPage
