import { useUser } from 'utils/useUser'
import { capitalizeFirstLetter } from 'utils/helpers'
import FeatureList, {
  IncludedFeature,
} from 'pages/upgrade/components/FeatureList'
import {
  basicFeatures,
  premiumFeatures,
  ultimateFeatures,
} from 'pages/upgrade/index.page'
import { Role } from 'types'

const SettingsBody = () => {
  const { user, subscription, isLoading } = useUser()

  const isBasic = !subscription
  const isPremium = subscription?.role == Role.PREMIUM
  const isUltimate = subscription?.role == Role.ULTIMATE

  return (
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
                    className="border focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 block w-full py-2 pr-3 text-gray-700 placeholder-gray-400 transition-shadow duration-150 ease-in-out bg-gray-100 border-gray-200 rounded-md shadow-sm outline-none resize-none focus:outline-none focus:ring-blue-700 focus:border-blue-700 text-sm"
                    type="text"
                    disabled={true}
                    value={user!.email!}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h1 className="text-xl font-semibold text-gray-900">Usage</h1>
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
                    className="border focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 block w-full py-2 pr-3 text-gray-700 placeholder-gray-400 transition-shadow duration-150 ease-in-out bg-gray-100 border-gray-200 rounded-md shadow-sm outline-none resize-none focus:outline-none focus:ring-blue-700 focus:border-blue-700 text-sm"
                    type="text"
                    disabled={true}
                    value={user?.email!}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h1 className="text-xl font-semibold text-gray-900">
                Subscription details
              </h1>
              {!isLoading && (
                <div className="block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {(subscription?.role &&
                      capitalizeFirstLetter(subscription?.role)) ||
                      'Basic Plan'}
                  </h5>
                  {isBasic && <FeatureList features={basicFeatures} />}
                  {isPremium && <FeatureList features={premiumFeatures} />}
                  {isUltimate && <FeatureList features={ultimateFeatures} />}
                </div>
              )}
            </div>
          </div>
          <div className="mb-32 lg:mb-16"></div>
        </div>
      </article>
    </div>
  )
}

export default SettingsBody
