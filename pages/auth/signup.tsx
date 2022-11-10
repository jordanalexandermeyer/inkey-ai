import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Signup: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up - Ghostwritten</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex min-h-screen bg-white">
        <div className="relative z-10 flex flex-col justify-center flex-1 px-4 py-12 lg:flex-none lg:px-16 xl:px-24 lg:shadow-2xl">
          <div className="w-full max-w-sm mx-auto lg:w-96">
            <div>
              <div className="flex items-center space-x-3">
                <svg
                  viewBox="0 0 192 192"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-auto h-12"
                >
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    d="M85.7945 0.250732C75.1253 1.11288 64.6716 4.77707 56.9661 10.435C44.4648 19.5954 37.2981 33.0127 32.4485 56.1832C29.7004 69.5467 29.1615 70.5166 16.8219 83.1256C8.03864 92.1244 6.58375 93.8487 4.80555 97.5668C0.979723 105.434 0.602529 107.967 0.27922 126.772C0.0097954 142.992 0.00979546 143.531 1.08749 144.824C2.16519 146.171 2.27296 146.171 12.8883 146.44C27.2755 146.818 27.545 146.925 33.3106 157.433C36.5976 163.414 40.7467 168.048 44.5187 169.88C46.1891 170.689 49.8533 171.658 53.4097 172.305C56.7505 172.898 60.6303 173.868 62.0313 174.568C63.5939 175.323 66.7193 178.017 70.4373 181.789C75.1792 186.692 77.0651 188.201 79.8672 189.494C87.0877 192.835 97.4336 192.835 104.654 189.494C107.456 188.201 109.342 186.638 114.138 181.789C117.802 178.071 121.089 175.269 122.544 174.514C123.891 173.868 127.771 172.898 131.112 172.305C134.56 171.712 138.386 170.689 139.895 169.934C143.882 167.994 147.654 164.007 150.672 158.511C154.39 151.721 156.114 149.458 158.701 148.003C160.802 146.764 161.61 146.71 171.579 146.44C180.847 146.225 182.356 146.063 183.164 145.201C184.08 144.339 184.134 142.884 184.08 127.688C184.08 110.068 183.811 107.535 181.332 101.177C179.015 95.3575 176.59 92.1783 167.161 82.5868C155.252 70.4627 154.983 69.9239 151.75 54.9439C147.493 35.0603 141.835 23.3673 132.135 14.2608C120.874 3.69936 104.6 -1.20416 85.7945 0.250732ZM76.9574 45.0829C79.2205 46.4301 80.5677 49.5554 80.8371 53.8123C81.2143 60.1168 78.1428 64.5354 73.401 64.5354C68.9824 64.5354 65.8571 60.3324 65.8571 54.405C65.8571 46.5378 71.515 41.796 76.9574 45.0829ZM114.623 45.1368C117.263 46.7534 118.395 49.5015 118.395 54.2972C118.395 60.7095 115.754 64.5354 111.228 64.5354C106.971 64.5354 104.169 61.2484 103.684 55.5905C103.038 47.2383 108.911 41.6343 114.623 45.1368Z"
                    fill="#542DF0"
                  />
                </svg>
              </div>
              <h2 className="mt-6 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                {' '}
                Create your account{' '}
              </h2>
              <p className="mt-2 text-sm leading-5 text-gray-600 max-w">
                {' '}
                You'll be up &amp; running in 2 minutes{' '}
              </p>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="relative inline-flex items-center justify-center overflow-hidden font-semibold transition duration-100 ease-in-out rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 sm:px-6 px-4 h-14 text-lg sm:text-lg leading-5 tracking-tight text-white bg-blue-600 shadow-sm hover:bg-blue-400 selectionRing active:bg-blue-700 w-full"
              >
                <span className="flex items-center space-x-4">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                    className="w-5 h-5"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    ></path>
                  </svg>
                  <div className="whitespace-nowrap">Continue with Google</div>
                </span>
              </button>
              {/* <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm leading-5">
              <span className="px-2 text-gray-500 bg-white">
              {' '}
              Or register with your email{' '}
              </span>
              </div>
            </div> */}

              <div className="mt-6">
                {/* <form className="space-y-6" data-gtm-form-interact-id="0">
                <div className="grid grid-cols-2 gap-3 mt-1">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      {' '}
                      First name{' '}
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        id="firstName"
                        autoComplete="given-name"
                        type="text"
                        required={true}
                        className="block w-full form-input"
                        data-gtm-form-interact-field-id="0"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      {' '}
                      Last name{' '}
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        id="lastName"
                        autoComplete="family-name"
                        type="text"
                        required={true}
                        className="block w-full form-input"
                        data-gtm-form-interact-field-id="1"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    {' '}
                    Email address{' '}
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      id="email"
                      autoComplete="email"
                      type="email"
                      required={true}
                      className="block w-full form-input"
                      data-gtm-form-interact-field-id="2"
                    />
                  </div>
                </div>
                <div>
                  <span className="block w-full rounded-md shadow-sm">
                    <button
                      type="submit"
                      className="relative inline-flex items-center justify-center overflow-hidden font-semibold transition duration-100 ease-in-out rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 px-5 py-2 text-base leading-6 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-sm hover:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 selectionRing dark:ring-offset-gray-900 active:bg-gray-50 active:text-gray-800 w-full"
                    >
                      <div className="flex items-center space-x-2">
                        <div>Continue</div>
                        <svg
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </button>
                  </span>
                </div>
              </form> */}
                <p className="mt-6 text-sm text-center text-gray-400">
                  {' '}
                  Already have an account?{' '}
                  <Link
                    href="/auth/login"
                    className="text-blue-400 hover:text-blue-500"
                  >
                    Login
                  </Link>
                </p>
                <div className="relative"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-0 flex-1 hidden w-0 bg-gray-100 lg:block">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-purple-700 to-purple-400">
            <div className="max-w-3xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8">
              <p className="max-w-2xl mx-auto text-4xl font-bold leading-10 tracking-tight text-center text-white">
                Join students at leading universities.
              </p>
              <div className="flex flex-wrap items-center justify-center mt-10 space-x-8 opacity-80">
                <div className="relative mb-6">
                  <img src="/schools/yale.png" alt="" className="h-10" />
                </div>
                <div className="relative mb-6">
                  <img src="/schools/harvard.png" alt="" className="h-10" />
                </div>
                <div className="relative mb-6">
                  <img src="/schools/stanford.png" alt="" className="h-10" />
                </div>
                <div className="relative mb-6">
                  <img src="/schools/berkeley.png" alt="" className="h-10" />
                </div>
                <div className="relative mb-6">
                  <img
                    src="/schools/georgia-tech.png"
                    alt=""
                    className="h-10"
                  />
                </div>
                <div className="relative mb-6">
                  <img src="/schools/uiuc.png" alt="" className="h-10" />
                </div>
                <div className="relative mb-6">
                  <img src="/schools/mit.png" alt="" className="h-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
