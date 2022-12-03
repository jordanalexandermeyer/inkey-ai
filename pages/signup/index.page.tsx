import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  getAuth,
  GoogleAuthProvider,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
} from 'firebase/auth'
import classNames from 'classnames'
import { useAuthState } from 'react-firebase-hooks/auth'
import toast, { Toaster } from 'react-hot-toast'

const Signup: NextPage = () => {
  const auth = getAuth()
  const router = useRouter()
  const [user, loading, error] = useAuthState(auth)
  const [email, setEmail] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)

  const handleEmailSignIn = async () => {
    setIsDisabled(true)
    const actionCodeSettings = {
      url: `${window.location.href}?email=${email}`,
      handleCodeInApp: true,
    }

    await toast.promise(
      sendSignInLinkToEmail(auth, email, actionCodeSettings),
      {
        loading: 'Sending email',
        success: 'Email sent! Please check your spam folder.',
        error: (error) => {
          setIsDisabled(false)
          return error.message
        },
      },
      {
        success: {
          duration: 5000,
        },
      },
    )
    setEmail('')
    setIsDisabled(false)
  }

  const signInWithGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
  }

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const urlParams = new URLSearchParams(window.location.search)
      const urlEmail = urlParams.get('email') || ''
      setEmail(urlEmail)

      toast.promise(
        signInWithEmailLink(auth, urlEmail, window.location.href),
        {
          loading: 'Signing up',
          success: 'Done!',
          error: 'Email link is expired',
        },
        {
          success: {
            duration: 100,
          },
        },
      )
    }
  }, [])

  return (
    <>
      <Head>
        <title>Sign Up - Ghostwritten</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Toaster />
      <div className="flex min-h-screen bg-white">
        <div className="relative z-10 flex flex-col justify-center flex-1 px-4 py-12 lg:flex-none lg:px-16 xl:px-24 lg:shadow-2xl">
          <div className="w-full max-w-sm mx-auto lg:w-96">
            <div>
              <div className="flex items-center justify-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="192"
                  height="192"
                  viewBox="0 0 192 192"
                  fill="none"
                  className="w-auto h-12"
                >
                  <path
                    d="M89.7945 0.250729C79.1253 1.11289 68.6716 4.77706 60.9661 10.435C48.4648 19.5954 41.2981 33.0127 36.4485 56.1832C33.7004 69.5467 33.1615 70.5166 20.8219 83.1256C12.0386 92.1244 10.5837 93.8487 8.80555 97.5668C4.97972 105.434 4.60253 107.967 4.27922 126.772C4.0098 142.992 4.0098 143.531 5.08749 144.824C6.16519 146.171 6.27296 146.171 16.8883 146.44C31.2755 146.818 31.545 146.925 37.3106 157.433C40.5976 163.414 44.7467 168.048 48.5187 169.88C50.1891 170.689 53.8533 171.658 57.4097 172.305C60.7505 172.898 64.6303 173.868 66.0313 174.568C67.5939 175.323 70.7193 178.017 74.4373 181.789C79.1792 186.692 81.0651 188.201 83.8672 189.494C91.0877 192.835 101.434 192.835 108.654 189.494C111.456 188.201 113.342 186.638 118.138 181.789C121.802 178.071 125.089 175.269 126.544 174.514C127.891 173.868 131.771 172.898 135.112 172.305C138.56 171.712 142.386 170.689 143.895 169.934C147.882 167.994 151.654 164.007 154.672 158.511C158.39 151.721 160.114 149.458 162.701 148.003C164.802 146.764 165.61 146.71 175.579 146.44C184.847 146.225 186.356 146.063 187.164 145.201C188.08 144.339 188.134 142.884 188.08 127.688C188.08 110.068 187.811 107.535 185.332 101.177C183.015 95.3575 180.59 92.1783 171.161 82.5868C159.252 70.4627 158.983 69.9239 155.75 54.9439C151.493 35.0603 145.835 23.3673 136.135 14.2608C124.874 3.69936 108.6 -1.20416 89.7945 0.250729ZM80.9574 45.0829C83.2205 46.4301 84.5677 49.5554 84.8371 53.8123C85.2143 60.1168 82.1428 64.5354 77.401 64.5354C72.9824 64.5354 69.8571 60.3324 69.8571 54.405C69.8571 46.5378 75.515 41.796 80.9574 45.0829ZM118.623 45.1368C121.263 46.7534 122.395 49.5015 122.395 54.2972C122.395 60.7095 119.754 64.5354 115.228 64.5354C110.971 64.5354 108.169 61.2484 107.684 55.5905C107.038 47.2383 112.911 41.6343 118.623 45.1368Z"
                    fill="url(#paint0_linear_76_69)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_76_69"
                      x1="96.1121"
                      y1="192"
                      x2="96.1121"
                      y2="0"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#542DF0" stopOpacity="0.1" />
                      <stop offset="1" stopColor="#542DF0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h2 className="mt-6 text-3xl text-center font-bold leading-9 tracking-tight text-gray-900">
                {' '}
                Create your account{' '}
              </h2>
              <p className="mt-2 text-sm text-center leading-5 text-gray-600 max-w">
                {' '}
                You'll be up &amp; running in 2 minutes{' '}
              </p>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                onClick={signInWithGoogle}
                className="relative inline-flex items-center justify-center overflow-hidden font-semibold transition duration-100 ease-in-out rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 sm:px-6 px-4 h-14 text-lg sm:text-lg leading-5 tracking-tight text-white bg-blue-600 shadow-sm hover:bg-blue-400 selectionRing active:bg-blue-700 w-full"
              >
                <span
                  className={classNames('flex items-center space-x-4', {
                    invisible: loading,
                  })}
                >
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
                <svg
                  role="status"
                  className={classNames(
                    'absolute inline w-6 h-6 text-white animate-spin',
                    {
                      invisible: !loading,
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
              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm leading-5">
                  <span className="px-2 text-gray-500 bg-white">
                    {' '}
                    Or register with your email{' '}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <form
                  className="space-y-6"
                  data-gtm-form-interact-id="0"
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleEmailSignIn()
                  }}
                >
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
                        type="email"
                        required={true}
                        className="mr-3 border focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 block w-full py-2 pr-3 text-gray-700 placeholder-gray-400 transition-shadow duration-150 ease-in-out bg-white border-gray-200 rounded-md shadow-sm outline-none resize-none focus:outline-none focus:ring-blue-700 focus:border-blue-700"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isDisabled}
                        autoComplete="email"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="block w-full rounded-md shadow-sm">
                      <button
                        type="submit"
                        className="relative inline-flex items-center justify-center overflow-hidden font-semibold transition duration-100 ease-in-out rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 px-5 py-2 text-base leading-6 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-sm hover:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 selectionRing dark:ring-offset-gray-900 active:bg-gray-50 active:text-gray-800 w-full"
                      >
                        {' '}
                        Signup with Email{' '}
                      </button>
                    </span>
                  </div>
                </form>
                <p className="mt-6 text-sm text-center text-gray-400">
                  {' '}
                  Already have an account?{' '}
                  <Link
                    href="/login"
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
