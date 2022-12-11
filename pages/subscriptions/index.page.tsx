import { getAuth, signOut } from 'firebase/auth'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import ProtectedPage from '../../components/ProtectedPage'
import classNames from 'classnames'

const Subscriptions: NextPage = () => {
  const auth = getAuth()
  const router = useRouter()
  const [user] = useAuthState(auth)
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    if (user) {
      setIsLoading(true)
      const response = await fetch(
        `/api/checkout?price_id=${process.env.NEXT_PUBLIC_STRIPE_PAY_AS_YOU_GO_PRODUCT}`,
        {
          method: 'GET',

          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      )

      const data = await response.json()
      const checkoutUrl = data.checkoutUrl
      setIsLoading(false)
      router.push(checkoutUrl)
    }
  }

  return (
    <ProtectedPage>
      <div className="min-h-screen pb-12 bg-gray-100">
        <div className="flex items-center p-6 space-x-5">
          <div className="flex-grow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 390 475"
              fill="none"
              className="w-auto h-14"
            >
              <path
                d="M342.243 134.246C342.243 134.246 341.393 134.86 340.491 134.603C339.694 134.376 339.293 133.779 339.293 133.779C339.293 133.779 314.464 94.8552 298.724 73.9407C289.054 61.0904 258.357 26.9951 258.357 26.9951C258.357 26.9951 247.818 16.8587 250.283 15.686C254.8 13.5373 263.163 16.5246 267.103 18.4226C307.242 37.7572 390 79.0045 390 90.4129C390 105.879 342.243 134.246 342.243 134.246Z"
                fill="#1A56DB"
              />
              <path
                d="M47.7571 134.246C47.7571 134.246 48.6072 134.86 49.5089 134.603C50.3062 134.376 50.7069 133.779 50.7069 133.779C50.7069 133.779 75.5362 94.8552 91.2757 73.9407C100.946 61.0904 131.643 26.9951 131.643 26.9951C131.643 26.9951 142.182 16.8587 139.717 15.686C135.2 13.5373 126.837 16.5246 122.897 18.4226C82.7581 37.7572 0 79.0045 0 90.4129C0 105.879 47.7571 134.246 47.7571 134.246Z"
                fill="#1A56DB"
              />
              <path
                d="M59.0376 380.207V399.208L42.2848 406.283C22.7397 414.571 20.1904 416.794 20.1904 425.891C20.1904 436.2 27.3528 442.163 39.614 442.163C45.5625 442.062 48.5974 441.052 69.3565 432.258C87.6875 424.476 93.029 421.747 95.2142 419.018C97.7635 415.683 97.8849 414.874 97.8849 388.494C97.8849 388.494 98.0686 370.491 94.2218 365.687C90.3749 360.883 78.4613 361.306 78.4613 361.306C78.4613 361.306 67.2937 360.883 63.4469 365.687C59.6 370.491 59.0376 380.207 59.0376 380.207Z"
                fill="#1A56DB"
              />
              <path
                d="M331.173 380.129V399.13L347.926 406.205C367.471 414.493 370.021 416.716 370.021 425.813C370.021 436.122 362.858 442.085 350.597 442.085C344.649 441.984 341.614 440.974 320.855 432.18C302.524 424.398 297.182 421.669 294.997 418.94C292.448 415.605 292.326 414.796 292.326 388.417C292.326 388.417 292.142 370.414 295.989 365.609C299.836 360.805 311.75 361.228 311.75 361.228C311.75 361.228 322.917 360.805 326.764 365.609C330.611 370.414 331.173 380.129 331.173 380.129Z"
                fill="#1A56DB"
              />
              <path
                d="M136.737 389.816V418.318L118.042 434.085C102.503 447.022 99.1042 450.459 98.0116 453.996C94.0054 466.327 107.723 477.748 122.534 474.413C126.783 473.503 131.153 470.37 149.848 455.007C162.11 444.9 172.914 435.399 173.885 433.883C175.221 431.66 175.585 424.484 175.585 396.184C175.585 396.184 175.012 370.499 171.165 365.695C167.318 360.891 156.161 361.314 156.161 361.314C156.161 361.314 144.237 361.314 140.39 365.695C136.543 370.076 136.737 389.816 136.737 389.816Z"
                fill="#1A56DB"
              />
              <path
                d="M253.474 389.718V418.22L272.169 433.988C287.708 446.925 291.107 450.361 292.2 453.899C296.206 466.229 282.488 477.65 267.677 474.315C263.428 473.405 259.058 470.272 240.363 454.909C228.102 444.802 217.297 435.301 216.326 433.785C214.991 431.562 214.626 424.386 214.626 396.086C214.626 396.086 215.199 370.401 219.046 365.597C222.893 360.793 234.05 361.216 234.05 361.216C234.05 361.216 245.974 361.216 249.821 365.597C253.668 369.978 253.474 389.718 253.474 389.718Z"
                fill="#1A56DB"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M184.201 2.12252C177.524 5.45789 154.216 24.9647 143.168 36.3857C79.9831 101.764 41.3722 193.803 31.9168 301.059C30.3043 319.357 37.29 325.72 37.29 325.72C41.1366 329.884 45.7531 332.766 49.9847 334.368L50.0429 334.39C54.3006 336.001 63.5246 339.492 80.1399 339.501L194.762 339.6H309.648C309.648 339.6 329.523 339.655 340.038 334.688L340.135 334.642C345.647 332.038 348.908 330.498 352.732 326.04C356.579 321.557 359.279 314.043 358.041 301.059C357.212 292.365 356.2 283.324 355.129 275.419C340.804 167.677 295.523 76.8142 227.297 18.4961C208.966 2.72893 204.231 0 195.127 0C190.392 0 187.114 0.606438 184.201 2.12252ZM135.606 248.211C135.606 266.784 121.827 281.84 104.831 281.84C87.8343 281.84 74.0559 266.784 74.0559 248.211C74.0559 229.638 87.8343 214.582 104.831 214.582C121.827 214.582 135.606 229.638 135.606 248.211ZM285.628 281.84C302.624 281.84 316.403 266.784 316.403 248.211C316.403 229.638 302.624 214.582 285.628 214.582C268.631 214.582 254.853 229.638 254.853 248.211C254.853 266.784 268.631 281.84 285.628 281.84Z"
                fill="#1A56DB"
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
              😱 Your free trial has run out!{' '}
            </h2>
            <p className="text-xl mt-4 text-gray-900">
              To continue writing essays at the speed of light ⚡️, sign up
              below!
            </p>
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
                        Pay As You Go{' '}
                      </h3>
                    </div>
                    <div className="flex items-baseline mt-3 text-5xl font-extrabold">
                      {' '}
                      $0.99{' '}
                      <span className="text-xl font-medium text-gray-500">
                        {' '}
                        /1000 words generated{' '}
                      </span>
                    </div>
                    <p className="mt-3 text-lg text-gray-500">
                      This plan gives you unlimited access to all of our
                      templates and products.
                    </p>
                  </div>
                  <div className="flex flex-col justify-between flex-1 px-6 pt-6 pb-8 space-y-6 bg-white border-t border-gray-100 sm:p-10 sm:pt-6">
                    <div className="flex flex-col justify-start">
                      <button
                        type="submit"
                        onClick={() => handleClick()}
                        className="relative inline-flex items-center justify-center overflow-hidden font-semibold transition duration-100 ease-in-out rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center w-full space-x-2 sm:px-6 px-4 h-14 text-lg sm:text-lg leading-5 tracking-tight text-white bg-blue-600 shadow-sm hover:bg-blue-400 selectionRing active:bg-blue-700"
                      >
                        <div
                          className={classNames(
                            'relative inline-flex items-center justify-center overflow-hidden font-semibold flex items-center w-full space-x-2 sm:px-6 px-4 h-14 text-lg sm:text-lg leading-5 tracking-tight text-white',
                            {
                              invisible: isLoading,
                            },
                          )}
                        >
                          <div>Start</div>
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
                        </div>
                        <svg
                          role="status"
                          className={classNames(
                            'absolute inline w-6 h-6 text-white animate-spin',
                            {
                              invisible: !isLoading,
                            },
                          )}
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
        </div>
      </div>
    </ProtectedPage>
  )
}

export default Subscriptions
