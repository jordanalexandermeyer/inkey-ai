import type { NextPage } from 'next'
import Page from '../../components/Page'
import ProtectedPage from '../../components/ProtectedPage'
import { useUser } from 'utils/useUser'
import { getURL, capitalizeFirstLetter } from 'utils/helpers'
import FeatureList from 'pages/upgrade/components/FeatureList'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { Role } from 'types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import {
  basicFeatures,
  premiumFeatures,
  ultimateFeatures,
  unlimitedFeatures,
} from 'pages/upgrade/components/constants'

const Settings: NextPage = () => {
  const { user, isLoadingRole, role, usageDetails, isLoading } = useUser()
  const functions = getFunctions()
  const router = useRouter()
  const [isStripeLoading, setIsStripeLoading] = useState(false)
  const [credits, setCredits] = useState('0')

  const handleBillingDetailsClick = async () => {
    setIsStripeLoading(true)
    const createPortalLink = httpsCallable(functions, 'createPortalLink')
    const { data }: { data: any } = await createPortalLink({
      returnUrl: getURL() + 'settings',
    })
    setIsStripeLoading(false)
    router.push(data.url)
  }

  useEffect(() => {
    const credits = (usageDetails && usageDetails.monthly_allowance) || 0
    if (credits < 0) setCredits('Unlimited')
    else setCredits(String(credits))
  }, [usageDetails])

  return (
    <ProtectedPage>
      <Page title="Settings - Inkey">
        <div className="mt-1 pt-6">
          <article>
            <div className="mx-auto px-4 sm:px-6 max-w-4xl">
              <h2 className="mb-6 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Settings
              </h2>
              <div className="mt-8 sm:mt-12 flex flex-col gap-10">
                <div className="flex flex-col gap-6">
                  <h1 className="text-xl font-semibold text-gray-900">
                    Profile Information
                  </h1>
                  <div className="w-full max-w-xl flex flex-col">
                    <div className="flex-grow mb-1 flex items-center">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium dark:text-gray-300 text-gray-700"
                      >
                        Email
                      </label>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        id="email"
                        className="border focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 block w-full py-2 pr-3 text-gray-700 bg-gray-100 border-gray-200 rounded-md shadow-sm outline-none resize-none focus:outline-none focus:ring-blue-700 focus:border-blue-700 text-sm"
                        type="text"
                        disabled={true}
                        value={user?.email!}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <h1 className="text-xl font-semibold text-gray-900">
                    Usage details
                  </h1>
                  <div className="max-w-xl p-6 grid grid-rows-3 sm:grid-cols-3 sm:grid-rows-1 gap-4 border border-gray-200 rounded-lg shadow-md">
                    <div className="flex flex-row sm:flex-col justify-between items-center sm:items-start">
                      <h2 className="sm:mb-6 sm:text-lg font-semibold text-gray-900">
                        Usage
                      </h2>
                      <p>{usageDetails?.monthly_usage || 0} words</p>
                    </div>
                    <div className="flex flex-row sm:flex-col justify-between items-center sm:items-start">
                      <h2 className="sm:mb-6 sm:text-lg font-semibold text-gray-900">
                        Credits
                      </h2>
                      <p>{credits} words</p>
                    </div>
                    <div className="flex flex-row sm:flex-col justify-between items-center sm:items-start">
                      <h2 className="sm:mb-6 sm:text-lg font-semibold text-gray-900">
                        Bonus Credits
                      </h2>
                      <p>{usageDetails?.bonus_allowance || 0} words</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <h1 className="text-xl font-semibold text-gray-900">
                    Subscription details
                  </h1>
                  {!isLoadingRole && (
                    <div className="max-w-xl p-6 border border-gray-200 rounded-lg shadow-md">
                      <h5 className="mb-6 text-2xl font-semibold text-gray-900">
                        {capitalizeFirstLetter(role)}
                      </h5>
                      {role == Role.BASIC && (
                        <FeatureList features={basicFeatures} />
                      )}
                      {role == Role.PREMIUM && (
                        <FeatureList features={premiumFeatures} />
                      )}
                      {role == Role.ULTIMATE && (
                        <FeatureList features={ultimateFeatures} />
                      )}
                      {role == Role.UNLIMITED && (
                        <FeatureList features={unlimitedFeatures} />
                      )}
                      {role != Role.BASIC && (
                        <button
                          disabled={isStripeLoading}
                          className="px-6 py-2 mt-8 border bg-gray-100 rounded hover:bg-gray-50 text-sm flex justify-center items-center gap-2"
                          onClick={() => handleBillingDetailsClick()}
                        >
                          Manage billing
                          <svg
                            className={classNames('w-5 h-5 animate-spin', {
                              hidden: !isStripeLoading,
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
                              hidden: isStripeLoading,
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
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-32 lg:mb-16"></div>
            </div>
          </article>
        </div>
      </Page>
    </ProtectedPage>
  )
}

export default Settings
