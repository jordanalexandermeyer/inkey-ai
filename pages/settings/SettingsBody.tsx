import { getAuth } from 'firebase/auth'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRole } from '../../components/RoleProvider'
import toast, { Toaster } from 'react-hot-toast'

const SettingsBody = () => {
  const auth = getAuth()
  const [user, loading, error] = useAuthState(auth)
  const { subscriptions } = useRole()
  const functions = getFunctions(undefined, 'us-west2')
  const [isTrial, setIsTrial] = useState(false)
  const [subscriptionEnd, setSubscriptionEnd] = useState(0)

  useEffect(() => {
    for (let i = 0; i < subscriptions.length; i++) {
      if (
        subscriptions[i].trial_end.seconds > Date.now() / 1000 &&
        subscriptions[i].status == 'trialing'
      ) {
        setIsTrial(true)
      }
      setSubscriptionEnd(subscriptions[i].trial_end.seconds)
    }
  }, [subscriptions])

  const callBillingPortalFunction = async () => {
    const functionRef = httpsCallable(
      functions,
      'ext-firestore-stripe-payments-createPortalLink',
    )
    const { data }: { data: any } = await functionRef({
      returnUrl: window.location.href,
    })
    if (data) window.location.assign(data.url)
  }

  const handleBillingButtonClick = () => {
    toast.promise(callBillingPortalFunction(), {
      loading: 'Hold tight! This could take a few seconds.',
      success: 'See you soon!',
      error: 'Something went wrong.',
    })
  }

  return (
    <>
      <Toaster />
      <div className="lg:ml-72 mt-1 py-6">
        <article>
          <div className="mx-auto px-4 sm:px-6 max-w-4xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mb-2">
                Settings
              </h2>
            </div>
            <div className="mt-12 pb-2">
              <h1 className="text-xl font-semibold text-gray-900">
                Profile Information
              </h1>
            </div>
            <form>
              <div className="mt-6 w-full max-w-xl flex flex-col md:flex-row mb-6 md:flex md:space-x-3 md:items-center">
                <div className="flex flex-col flex-1">
                  <div className="flex justify-end items-center">
                    <div className="flex-grow mb-1 flex items-center">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium dark:text-gray-300 text-gray-700"
                      >
                        Email
                      </label>
                    </div>
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
              {/* <div className="max-w-xl pb-6 my-6 mb-12 border-b-2">
              <button
                id="settingsUpdateButton"
                aria-label="settingsUpdateButton"
                className="inline-flex items-center overflow-hidden ease-in-out outline-none focus:outline-none focus:ring-2 focus:ring-offset-2inline-flex justify-center relative font-medium rounded-lg focusRing text-white bg-gradient-to-r from-purple-400 to-blue-400 shadow-sm hover:from-purple-300 hover:to-blue-300 selectionRing active:from-purple-500 active:to-blue-500 px-3 py-2 text-sm leading-3"
                type="submit"
              >
                Save
              </button>
            </div> */}
            </form>
            {/* <div className="mt-12 pb-2">
            <h1 className="text-xl font-semibold text-gray-900">
              Usage Information
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 max-w-xl">
            <div className="px-4 py-5 overflow-hidden bg-white rounded-lg ring-1 sm:p-6 ring-gray-200">
              <div className="flex items-center text-sm font-medium text-gray-500 truncate">
                <div>Credits used</div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 ml-2 text-gray-300 hover:text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="mt-1 text-3xl font-semibold text-gray-900">
                242
              </div>
            </div>
            <div className="px-4 py-5 overflow-hidden bg-white rounded-lg ring-1 sm:p-6 ring-gray-200">
              <div className="flex items-center text-sm font-medium text-gray-500 truncate">
                <div>Credits left</div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 ml-2 text-gray-300 hover:text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="mt-1 text-3xl font-semibold text-gray-900">
                758
              </div>
            </div>
          </div> */}
            <div className="mt-12 pb-2">
              <h1 className="text-xl font-semibold text-gray-900">
                Billing Information
              </h1>
            </div>
            <div className="max-w-xl mt-6 px-6 pt-6 bg-white rounded-md shadow-xs ring-1 ring-gray-300">
              <div className="py-6">
                <h3 className="mb-4 text-xl font-medium leading-6 text-neutral-700">
                  Subscription
                </h3>
                <div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-start space-x-2">
                      {/* <div className="font-medium text-gray-500">
                      20,000<span> word credits</span>
                    </div>
                    <div className="text-gray-500">on </div> */}
                      <div className="text-xl font-bold text-gray-700">
                        Early Access
                      </div>
                      {isTrial && (
                        <div className="inline-block px-2 py-1 text-xs font-semibold text-green-500 uppercase border border-green-400 rounded bg-green-50">
                          trialing
                        </div>
                      )}
                    </div>
                    <div className="mt-1 text-sm">
                      <div className="text-gray-500">
                        Billing cycle renews in{' '}
                        {subscriptionEnd &&
                          Math.floor(
                            (subscriptionEnd - Date.now() / 1000) /
                              60 /
                              60 /
                              24,
                          )}{' '}
                        days
                      </div>
                    </div>
                  </div>
                  <div className="font-medium text-gray-700 md:flex md:justify-end">
                    <div className="mt-4 md:flex md:items-center md:space-x-2">
                      <button
                        onClick={handleBillingButtonClick}
                        className="inline-flex items-center overflow-hidden ease-in-out outline-none focus:outline-none focus:ring-2 focus:ring-offset-2inline-flex justify-center transition-all duration-150 relative font-medium rounded-lg shadow-sm focusRing text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-700 selectionRing active:bg-gray-100 active:text-gray-700 px-3 py-2 text-sm leading-3 w-full md:w-auto"
                        type="button"
                      >
                        Edit payment details
                      </button>
                      {/* <button
                      className="inline-flex items-center overflow-hidden ease-in-out outline-none focus:outline-none focus:ring-2 focus:ring-offset-2inline-flex justify-center transition-all duration-150 relative font-medium rounded-lg focusRing text-gray-700 bg-white border border-black-300 shadow-sm hover:text-gray-500 selectionRing active:bg-gray-50 active:text-gray-800 px-3 py-2 text-sm leading-3 w-full md:w-auto"
                      type="button"
                    >
                      Edit plan
                    </button> */}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="p-6 text-center border-t border-gray-300">
              <div>
                <label
                  htmlFor="overagePolicy"
                  className="block text-sm font-medium text-gray-500"
                >
                  If I go over my plan limit for the month
                </label>
                <div className="mt-2 space-y-3 md:flex md:items-center md:justify-center md:space-x-3 md:space-y-0">
                  <div>
                    <select
                      id="overagePolicy"
                      name="overagePolicy"
                      className="w-full py-1 pl-3 pr-10 text-sm text-gray-700 border-gray-300 rounded-md outline-none sm:w-auto focus:border-gray-300 focus:outline-none selectionRing"
                    >
                      <option value="UPGRADE">
                        Upgrade account to the next tier (cheaper per word)
                      </option>
                      <option value="DO_NOTHING">
                        Do nothing and wait for me to manually update my plan
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div> */}
            </div>
            <div className="mt-4 max-w-xl">
              <div className="flex items-center p-6 transition-all duration-150 bg-white rounded-md ring-gray-300 ring-1">
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Invoices
                  </h3>
                  <p className="text-gray-500 text-sm">
                    View your payment history
                  </p>
                </div>
                <button
                  onClick={handleBillingButtonClick}
                  className="inline-flex items-center overflow-hidden ease-in-out outline-none focus:outline-none focus:ring-2 focus:ring-offset-2inline-flex justify-center transition-all duration-150 relative font-medium rounded-lg focusRing text-gray-700 bg-white border border-black-300 shadow-sm hover:text-gray-500 selectionRing active:bg-gray-50 active:text-gray-800 px-3 py-2 text-sm leading-3"
                  type="button"
                >
                  View billing history
                </button>
              </div>
            </div>
            <div className="mb-32 lg:mb-16"></div>
          </div>
        </article>
      </div>
    </>
  )
}

export default SettingsBody
