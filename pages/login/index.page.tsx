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

const Login: NextPage = () => {
  const router = useRouter()
  const auth = getAuth()
  const [user, loading, error] = useAuthState(auth)
  const [email, setEmail] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)

  const signInWithGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
  }

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
          loading: 'Logging in',
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
        <title>Login - Inkey</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Toaster />
      <div className="flex min-h-screen bg-white">
        <div className="relative z-10 flex flex-col justify-center flex-1 px-4 py-8 bg-white ring-1 ring-black ring-opacity-5 sm:px-6">
          <div className="w-full max-w-sm mx-auto lg:w-96">
            <div>
              <div className="flex items-center justify-center flex-shrink-0 select-none">
                <div>
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
              </div>
              <h2 className="mt-6 text-3xl text-center font-bold leading-9 tracking-tight text-gray-900">
                {' '}
                Sign in to your account{' '}
              </h2>
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
                    Or sign in with your email{' '}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="mt-6">
                <form
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
                  <div className="mt-6">
                    <span className="block w-full rounded-md shadow-sm">
                      <button
                        type="submit"
                        className="relative inline-flex items-center justify-center overflow-hidden font-semibold transition duration-100 ease-in-out rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 px-5 py-2 text-base leading-6 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-sm hover:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 selectionRing dark:ring-offset-gray-900 active:bg-gray-50 active:text-gray-800 w-full"
                        disabled={isDisabled}
                      >
                        {' '}
                        Login with Email{' '}
                      </button>
                    </span>
                  </div>{' '}
                  <p className="mt-6 text-sm text-center text-gray-400">
                    {' '}
                    Don't have an account yet?{' '}
                    <Link href="/signup" className="text-blue-400">
                      Get started here
                    </Link>
                  </p>
                  <div className="relative"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
