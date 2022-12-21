import classNames from 'classnames'
import ProtectedPage from 'components/ProtectedPage'
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
} from 'firebase/firestore'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Role, BillingPeriod } from 'types'
import { getURL, roundToTwoDecimals } from 'utils/helpers'
import { useUser } from 'utils/useUser'
import Page from '../../components/Page'
import FeatureList from './components/FeatureList'
import {
  premiumFeatures,
  prices,
  ultimateFeatures,
} from './components/constants'

const getBillFromRole = (
  product: Role,
  billingPeriod: BillingPeriod | string,
) => {
  if (billingPeriod == BillingPeriod.ANNUALLY)
    return (
      '$' +
      roundToTwoDecimals(prices[BillingPeriod.ANNUALLY][product].price) +
      ' billed every 12 months'
    )
  else if (billingPeriod == BillingPeriod.SEMI_ANNUALLY)
    return (
      '$' +
      roundToTwoDecimals(
        prices[BillingPeriod.SEMI_ANNUALLY][product].price / 2,
      ) +
      ' billed every 6 months'
    )
  else
    return (
      '$' +
      roundToTwoDecimals(prices[BillingPeriod.MONTHLY][product].price / 12) +
      ' billed every month'
    )
}

const UpgradePage: NextPage = () => {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod | string>(
    BillingPeriod.ANNUALLY,
  )
  const router = useRouter()
  const db = getFirestore()
  const functions = getFunctions()
  const [premiumLoading, setPremiumLoading] = useState(false)
  const [ultimateLoading, setUltimateLoading] = useState(false)
  const { user, subscription, isLoading: isUserLoading } = useUser()

  const premiumPrice = roundToTwoDecimals(
    prices[billingPeriod as keyof typeof prices][Role.PREMIUM].price / 12,
  )
  const ultimatePrice = roundToTwoDecimals(
    prices[billingPeriod as keyof typeof prices][Role.ULTIMATE].price / 12,
  )

  const premiumStripePrice =
    prices[billingPeriod as keyof typeof prices][Role.PREMIUM].stripePrice
  const ultimateStripePrice =
    prices[billingPeriod as keyof typeof prices][Role.ULTIMATE].stripePrice

  const handlePremiumButtonClick = async () => {
    setPremiumLoading(true)
    const docRef = await addDoc(
      collection(db, 'customers', user!.uid, 'checkout_sessions'),
      {
        price: premiumStripePrice,
        success_url: getURL() + 'upgrade/success',
        cancel_url: getURL() + 'upgrade',
      },
    )

    onSnapshot(docRef, (doc) => {
      const data = doc.data()
      if (data?.url) {
        setPremiumLoading(false)
        router.push(data.url)
      }
    })
  }

  const handleSwitchToPremiumClick = async () => {
    setPremiumLoading(true)
    const createPortalLink = httpsCallable(functions, 'createPortalLink')
    const { data }: { data: any } = await createPortalLink({
      returnUrl: getURL() + 'upgrade',
    })
    setPremiumLoading(false)
    router.push(
      data.url +
        `/subscriptions/${subscription?.id}/preview/${premiumStripePrice}`,
    )
  }

  const handleUltimateButtonClick = async () => {
    setUltimateLoading(true)
    const docRef = await addDoc(
      collection(db, 'customers', user!.uid, 'checkout_sessions'),
      {
        price: ultimateStripePrice,
        success_url: getURL() + 'upgrade/success',
        cancel_url: getURL() + 'upgrade',
      },
    )

    onSnapshot(docRef, (doc) => {
      const data = doc.data()
      if (data?.url) {
        setUltimateLoading(false)
        router.push(data.url)
      }
    })
  }

  const handleSwitchToUltimateClick = async () => {
    setUltimateLoading(true)
    const createPortalLink = httpsCallable(functions, 'createPortalLink')
    const { data }: { data: any } = await createPortalLink({
      returnUrl: getURL() + 'upgrade',
    })
    setUltimateLoading(false)
    router.push(
      data.url +
        `/subscriptions/${subscription?.id}/preview/${ultimateStripePrice}`,
    )
  }

  return (
    <ProtectedPage>
      <Page title="Upgrade - Inkey">
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
                <strong className="text-purple-600">Save 58%</strong> with
                annual{' '}
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
          <div className="max-w-md mx-auto flex flex-col gap-10 md:grid md:max-w-5xl md:grid-cols-2 md:gap-5 md:space-y-0">
            <div className="overflow-hidden rounded-lg ring-4 ring-blue-500 shadow-2xl flex flex-col justify-between p-6 mx-auto max-w-sm text-center text-gray-900 bg-white">
              <h3 className="mb-4 text-2xl font-semibold">Premium 💎</h3>
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
                {getBillFromRole(Role.PREMIUM, billingPeriod)}
              </p>
              <div className="pb-8">
                <FeatureList features={premiumFeatures} />
              </div>
              {subscription?.role != Role.PREMIUM && (
                <button
                  type="submit"
                  className="relative inline-flex items-center justify-center overflow-hidden font-semibold transition duration-100 ease-in-out rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center w-full space-x-2 sm:px-6 px-4 h-14 text-lg sm:text-lg leading-5 tracking-tight text-white bg-blue-600 shadow-sm hover:bg-blue-400 active:bg-blue-700"
                  disabled={premiumLoading}
                  onClick={() => {
                    if (!subscription) handlePremiumButtonClick()
                    if (subscription?.role == Role.ULTIMATE)
                      handleSwitchToPremiumClick()
                  }}
                >
                  <div>Get Premium</div>
                  <svg
                    className={classNames('w-5 h-5 text-white animate-spin', {
                      hidden: !premiumLoading,
                    })}
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className={classNames('w-5 h-5 opacity-50', {
                      hidden: premiumLoading,
                    })}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    ></path>
                  </svg>
                </button>
              )}
              {subscription?.role == Role.PREMIUM && (
                <div className="relative inline-flex items-center justify-center overflow-hidden font-semibold border border-gray-300 rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center w-full space-x-2 sm:px-6 px-4 h-14 text-lg sm:text-lg leading-5 tracking-tight text-gray-900 shadow-sm">
                  <div>Current Plan</div>
                </div>
              )}
            </div>
            <div className="overflow-hidden rounded-lg ring-4 ring-purple-500 shadow-2xl flex flex-col justify-between p-6 mx-auto max-w-sm text-center text-gray-900 bg-white">
              <h3 className="mb-4 text-2xl font-semibold">Ultimate 👑</h3>
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
                {getBillFromRole(Role.ULTIMATE, billingPeriod)}
              </p>
              <div className="pb-8">
                <FeatureList features={ultimateFeatures} />
              </div>
              {subscription?.role != Role.ULTIMATE && (
                <button
                  type="submit"
                  className="relative inline-flex items-center justify-center overflow-hidden font-semibold transition duration-100 ease-in-out rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center w-full space-x-2 sm:px-6 px-4 h-14 text-lg sm:text-lg leading-5 tracking-tight text-white bg-blue-600 shadow-sm hover:bg-blue-400 active:bg-blue-700"
                  disabled={ultimateLoading}
                  onClick={() => {
                    if (!subscription) handleUltimateButtonClick()
                    if (subscription?.role == Role.PREMIUM)
                      handleSwitchToUltimateClick()
                  }}
                >
                  <div>Get Ultimate</div>
                  <svg
                    className={classNames('w-5 h-5 text-white animate-spin', {
                      hidden: !ultimateLoading,
                    })}
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className={classNames('w-5 h-5 opacity-50', {
                      hidden: ultimateLoading,
                    })}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    ></path>
                  </svg>
                </button>
              )}
              {subscription?.role == Role.ULTIMATE && (
                <div className="relative inline-flex items-center justify-center overflow-hidden font-semibold border border-gray-300 rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center w-full space-x-2 sm:px-6 px-4 h-14 text-lg sm:text-lg leading-5 tracking-tight text-gray-900 shadow-sm">
                  <div>Current Plan</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Page>
    </ProtectedPage>
  )
}

export default UpgradePage
