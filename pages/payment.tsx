import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { createCheckoutSession } from '../lib/createCheckoutSession'

const Payment = () => {
  const auth = getAuth()
  const [user, loading, error] = useAuthState(auth)

  const handleClick = async () => {
    if (user) {
      await createCheckoutSession(user.uid)
    }
  }

  return (
    <div className="min-h-screen pb-12 bg-gray-100">
      <div className="flex items-center p-6 space-x-5">
        <div className="flex-grow">
          <svg
            viewBox="0 0 2400 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block w-auto h-10"
          >
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M212.333 0.933211C185.933 3.06654 160.067 12.1332 141 26.1332C110.067 48.7999 92.3333 81.9999 80.3333 139.333C73.5333 172.4 72.2 174.8 41.6666 206C19.9333 228.267 16.3333 232.533 11.9333 241.733C2.46662 261.2 1.53329 267.467 0.733285 314C0.0666187 354.133 0.0666188 355.467 2.73329 358.667C5.39995 362 5.66662 362 31.9333 362.667C67.5333 363.6 68.2 363.867 82.4666 389.867C90.6 404.667 100.867 416.133 110.2 420.667C114.333 422.667 123.4 425.067 132.2 426.667C140.467 428.133 150.067 430.533 153.533 432.267C157.4 434.133 165.133 440.8 174.333 450.133C186.067 462.267 190.733 466 197.667 469.2C215.533 477.467 241.133 477.467 259 469.2C265.933 466 270.6 462.133 282.467 450.133C291.533 440.933 299.667 434 303.267 432.133C306.6 430.533 316.2 428.133 324.467 426.667C333 425.2 342.467 422.667 346.2 420.8C356.067 416 365.4 406.133 372.867 392.533C382.067 375.733 386.333 370.133 392.733 366.533C397.933 363.467 399.933 363.333 424.6 362.667C447.533 362.133 451.267 361.733 453.267 359.6C455.533 357.467 455.667 353.867 455.533 316.267C455.533 272.667 454.867 266.4 448.733 250.667C443 236.267 437 228.4 413.667 204.667C384.2 174.667 383.533 173.333 375.533 136.267C365 87.0665 351 58.1332 327 35.5999C299.133 9.46654 258.867 -2.66679 212.333 0.933211ZM190.467 111.867C196.067 115.2 199.4 122.933 200.067 133.467C201 149.067 193.4 160 181.667 160C170.733 160 163 149.6 163 134.933C163 115.467 177 103.733 190.467 111.867ZM283.667 112C290.2 116 293 122.8 293 134.667C293 150.533 286.467 160 275.267 160C264.733 160 257.8 151.867 256.6 137.867C255 117.2 269.533 103.333 283.667 112Z"
              fill="#542DF0"
            />
          </svg>
        </div>
        <button
          type="submit"
          className="relative inline-flex items-center justify-center overflow-hidden font-semibold transition duration-100 ease-in-out rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 px-3 py-2 text-sm leading-3 text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-700 selectionRing active:bg-gray-100 active:text-gray-700"
          onClick={() => signOut(auth)}
        >
          <div className="flex items-center space-x-2">
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              ></path>
            </svg>
            <div>Sign out</div>
          </div>
        </button>
      </div>
      <div className="px-4 pt-20 mb-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            {' '}
            Try it free for 5 days{' '}
          </h2>
        </div>
      </div>
      <div>
        <div className="relative">
          <div className="relative z-10 px-4 mx-auto max-w-8xl sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto sm:space-y-4 space-y-reverse">
              <div className="h-740 flex flex-col overflow-hidden rounded-lg drop-shadow-xl">
                <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                  <div className="sm:flex sm:items-center sm:space-x-4">
                    <h3
                      id="tier-standard"
                      className="inline-flex px-4 py-2 font-bold leading-4 rounded-full text bg-gray-100 text-blue-700"
                    >
                      {' '}
                      Early Access{' '}
                    </h3>
                    <div>
                      <div className="inline-block mt-2 text-sm leading-5 text-gray-500 border-b-2 border-gray-300 sm:mt-0">
                        Pricing available for a limited time
                      </div>
                    </div>
                  </div>
                  <div className="flex items-  mt-3 text-6xl font-extrabold">
                    {' '}
                    $20{' '}
                    <span className="ml-1 text-2xl font-medium text-gray-500">
                      {' '}
                      /mo{' '}
                    </span>
                  </div>
                  <p className="mt-3 text-lg text-gray-500">
                    {' '}
                    Access to everything. As an early user, your price will
                    never go up.{' '}
                  </p>
                </div>
                <div className="px-6 pb-6 space-y-2 bg-white sm:px-10">
                  <div className="inline-block w-full px-4 py-2 font-semibold text-center text-gray-500 bg-gray-100 rounded sm:text-lg">
                    <span>20,000</span>
                    <span> words generated (~40 essays)</span>
                  </div>
                </div>
                <div className="flex flex-col justify-between flex-1 px-6 pt-6 pb-8 space-y-6 bg-white border-t border-gray-100 sm:p-10 sm:pt-6">
                  <div className="flex flex-col justify-start">
                    <button
                      type="submit"
                      onClick={() => handleClick()}
                      className="relative inline-flex items-center justify-center overflow-hidden font-semibold transition duration-100 ease-in-out rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center w-full space-x-2 sm:px-6 px-4 h-14 text-lg sm:text-lg leading-5 tracking-tight text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-sm hover:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 selectionRing dark:ring-offset-gray-900 active:bg-gray-50 active:text-gray-800"
                    >
                      <div> Start free trial </div>
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
                    <div className="mt-3 text-sm text-center text-gray-400">
                      {' '}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl px-4 py-16 mx-auto sm:px-6 lg:py-20 lg:px-8">
          <div>
            <div className="space-y-4">
              <h2 className="text-3xl font-extrabold leading-9 text-gray-900">
                {' '}
                Frequently asked questions{' '}
              </h2>
            </div>
            <div className="mt-12">
              <dl className="space-y-12">
                <div className="space-y-2">
                  <dt className="text-lg font-medium leading-6 text-gray-900">
                    {' '}
                    How are word credits calculated?{' '}
                  </dt>
                  <dd className="text-base leading-6 text-gray-500">
                    {' '}
                    Word credits are calculated by counting each word that is
                    generated by Jasper.{' '}
                  </dd>
                </div>
                <div className="space-y-2">
                  <dt className="text-lg font-medium leading-6 text-gray-900">
                    {' '}
                    How do I get more credits?{' '}
                  </dt>
                  <dd className="text-base leading-6 text-gray-500">
                    {' '}
                    You have the option to increase your monthly budget for word
                    credits at any time.{' '}
                  </dd>
                </div>
                <div className="space-y-2">
                  <dt className="text-lg font-medium leading-6 text-gray-900">
                    {' '}
                    What if I go over my monthly plan budget for word credits?{' '}
                  </dt>
                  <dd className="text-base leading-6 text-gray-500">
                    {' '}
                    If your account goes over your monthly budget for word
                    credits you will be charged for overages at $10 per 5,000
                    words.{' '}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
