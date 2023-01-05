import { addDoc, collection, getFirestore } from 'firebase/firestore'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useReferral } from 'utils/useReferral'
import { useUser } from 'utils/useUser'
import Page from '../components/Page'
import ProtectedPage from '../components/ProtectedPage'
import { EventName, track } from 'utils/segment'

const Home: NextPage = () => {
  const db = getFirestore()
  const [feedback, setFeedback] = useState('')
  const { user } = useUser()
  const { referralCode } = useReferral()

  const submitFeedback = async () => {
    await addDoc(collection(db, 'feedback'), {
      uid: user?.uid,
      comments: feedback,
      time_submitted: Math.floor(Date.now() / 1000),
      seen: false,
    })
    setFeedback('')
  }

  return (
    <ProtectedPage>
      <Page title="Dashboard - Inkey">
        <div className="mt-1 py-12 mb-36">
          <article>
            <div className="mx-auto px-4 sm:px-6 max-w-4xl">
              <div className="p-6 mb-6 border bg-blue-700 rounded-md shadow-lg">
                <div className="mb-2 md:mb-4">
                  <div className="inline-flex px-2 py-1 text-xs font-bold text-white uppercase bg-green-500 rounded-full md:px-3 md-text-sm">
                    Get started
                  </div>
                </div>
                <div className="text-lg font-semibold tracking-tight text-white md:text-2xl">
                  Use Templates 🎭
                </div>
                <p className="mt-1 mb-4 text-sm text-white text-opacity-80 md:text-lg md:mb-7">
                  Each template is something different that Inkey can do. If
                  there is anything we are missing, submit a feature request
                  below to get a new template added!
                </p>
                <div className="flex flex-col w-full items-stretch md:items-start">
                  <Link
                    href={'/templates'}
                    className="inline-flex items-center justify-center font-medium text-white bg-blue-500 hover:bg-opacity-80 px-5 py-2 text-md overflow-hidden ease-in-out focus:outline-none focus:ring-offset-2 transition-all duration-150 relative rounded-lg space-x-2 ring-opacity-20 border-none focus:ring-0"
                    onClick={() =>
                      track(EventName.SEE_TEMPLATES_BUTTON_CLICKED)
                    }
                  >
                    See templates
                  </Link>
                </div>
              </div>
            </div>
          </article>
          <article>
            <div className="mx-auto px-4 sm:px-6 max-w-4xl">
              <div className="p-6 mb-6 border border-gray-200 rounded-md shadow-lg">
                <div className="mb-3 md:flex md:items-center md:space-x-3">
                  <div className="text-lg font-semibold tracking-tight md:text-2xl flex gap-1 items-center">
                    Ask Inkey
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#1A56DB"
                      viewBox="0 0 390 475"
                      className="h-5 w-5 md:h-6 md:w-6"
                    >
                      <path d="M342.243 134.246C342.243 134.246 341.393 134.86 340.491 134.603C339.694 134.376 339.293 133.779 339.293 133.779C339.293 133.779 314.464 94.8552 298.724 73.9407C289.054 61.0904 258.357 26.9951 258.357 26.9951C258.357 26.9951 247.818 16.8587 250.283 15.686C254.8 13.5373 263.163 16.5246 267.103 18.4226C307.242 37.7572 390 79.0045 390 90.4129C390 105.879 342.243 134.246 342.243 134.246Z" />
                      <path d="M47.7571 134.246C47.7571 134.246 48.6072 134.86 49.5089 134.603C50.3062 134.376 50.7069 133.779 50.7069 133.779C50.7069 133.779 75.5362 94.8552 91.2757 73.9407C100.946 61.0904 131.643 26.9951 131.643 26.9951C131.643 26.9951 142.182 16.8587 139.717 15.686C135.2 13.5373 126.837 16.5246 122.897 18.4226C82.7581 37.7572 0 79.0045 0 90.4129C0 105.879 47.7571 134.246 47.7571 134.246Z" />
                      <path d="M59.0376 380.207V399.208L42.2848 406.283C22.7397 414.571 20.1904 416.794 20.1904 425.891C20.1904 436.2 27.3528 442.163 39.614 442.163C45.5625 442.062 48.5974 441.052 69.3565 432.258C87.6875 424.476 93.029 421.747 95.2142 419.018C97.7635 415.683 97.8849 414.874 97.8849 388.494C97.8849 388.494 98.0686 370.491 94.2218 365.687C90.3749 360.883 78.4613 361.306 78.4613 361.306C78.4613 361.306 67.2937 360.883 63.4469 365.687C59.6 370.491 59.0376 380.207 59.0376 380.207Z" />
                      <path d="M331.173 380.129V399.13L347.926 406.205C367.471 414.493 370.021 416.716 370.021 425.813C370.021 436.122 362.858 442.085 350.597 442.085C344.649 441.984 341.614 440.974 320.855 432.18C302.524 424.398 297.182 421.669 294.997 418.94C292.448 415.605 292.326 414.796 292.326 388.417C292.326 388.417 292.142 370.414 295.989 365.609C299.836 360.805 311.75 361.228 311.75 361.228C311.75 361.228 322.917 360.805 326.764 365.609C330.611 370.414 331.173 380.129 331.173 380.129Z" />
                      <path d="M136.737 389.816V418.318L118.042 434.085C102.503 447.022 99.1042 450.459 98.0116 453.996C94.0054 466.327 107.723 477.748 122.534 474.413C126.783 473.503 131.153 470.37 149.848 455.007C162.11 444.9 172.914 435.399 173.885 433.883C175.221 431.66 175.585 424.484 175.585 396.184C175.585 396.184 175.012 370.499 171.165 365.695C167.318 360.891 156.161 361.314 156.161 361.314C156.161 361.314 144.237 361.314 140.39 365.695C136.543 370.076 136.737 389.816 136.737 389.816Z" />
                      <path d="M253.474 389.718V418.22L272.169 433.988C287.708 446.925 291.107 450.361 292.2 453.899C296.206 466.229 282.488 477.65 267.677 474.315C263.428 473.405 259.058 470.272 240.363 454.909C228.102 444.802 217.297 435.301 216.326 433.785C214.991 431.562 214.626 424.386 214.626 396.086C214.626 396.086 215.199 370.401 219.046 365.597C222.893 360.793 234.05 361.216 234.05 361.216C234.05 361.216 245.974 361.216 249.821 365.597C253.668 369.978 253.474 389.718 253.474 389.718Z" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M184.201 2.12252C177.524 5.45789 154.216 24.9647 143.168 36.3857C79.9831 101.764 41.3722 193.803 31.9168 301.059C30.3043 319.357 37.29 325.72 37.29 325.72C41.1366 329.884 45.7531 332.766 49.9847 334.368L50.0429 334.39C54.3006 336.001 63.5246 339.492 80.1399 339.501L194.762 339.6H309.648C309.648 339.6 329.523 339.655 340.038 334.688L340.135 334.642C345.647 332.038 348.908 330.498 352.732 326.04C356.579 321.557 359.279 314.043 358.041 301.059C357.212 292.365 356.2 283.324 355.129 275.419C340.804 167.677 295.523 76.8142 227.297 18.4961C208.966 2.72893 204.231 0 195.127 0C190.392 0 187.114 0.606438 184.201 2.12252ZM135.606 248.211C135.606 266.784 121.827 281.84 104.831 281.84C87.8343 281.84 74.0559 266.784 74.0559 248.211C74.0559 229.638 87.8343 214.582 104.831 214.582C121.827 214.582 135.606 229.638 135.606 248.211ZM285.628 281.84C302.624 281.84 316.403 266.784 316.403 248.211C316.403 229.638 302.624 214.582 285.628 214.582C268.631 214.582 254.853 229.638 254.853 248.211C254.853 266.784 268.631 281.84 285.628 281.84Z"
                      />
                    </svg>
                  </div>
                </div>
                <p className="mt-1 mb-4 text-sm md:text-lg">
                  You can ask Inkey to do just about anything. Writing essays,
                  answering coding questions, translating — it does it all!
                </p>
                <div className="flex flex-col w-full items-stretch md:items-start">
                  <Link
                    href={'/ask-inkey'}
                    className="inline-flex items-center justify-center font-medium text-white bg-blue-500 hover:bg-opacity-80 px-5 py-2 text-md overflow-hidden ease-in-out focus:outline-none focus:ring-2 transition-all duration-150 relative rounded-lg space-x-2 ring-opacity-20 border-none focus:ring-0"
                    onClick={() =>
                      track(EventName.ASK_A_QUESTION_BUTTON_CLICKED)
                    }
                  >
                    Ask a question
                  </Link>
                </div>
              </div>
            </div>
          </article>
          <article>
            <div className="mx-auto px-4 sm:px-6 max-w-4xl">
              <div className="p-6 mb-6 border border-gray-200 rounded-md shadow-lg">
                <div className="mb-3 md:flex md:items-center md:space-x-3">
                  <div className="text-lg font-semibold tracking-tight md:text-2xl">
                    Refer your friends 🎁
                  </div>
                  <div className="inline-block px-3 py-1 text-sm font-medium leading-4 text-green-600 border border-green-200 rounded-full bg-green-50">
                    Give 5000 words → Get 5000 words!
                  </div>
                </div>
                <p className="mt-1 mb-4 text-sm md:text-lg">
                  For each new account that signs up with your link you and your
                  friend each get 5000 free words. Bonus words are credited on
                  sign up.
                </p>
                <div className="flex flex-col w-full items-stretch md:items-start">
                  <button
                    className="inline-flex items-center overflow-hidden ease-in-out outline-none focus:outline-none focus:ring-2 justify-center transition-all duration-150 relative font-medium rounded-lg text-gray-700 bg-white border border-black-300 shadow-sm hover:text-gray-500 active:bg-gray-50 active:text-gray-800 px-5 py-2 text-base leading-6"
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        'https://app.inkey.ai/signup?referral_code=' +
                          referralCode?.id,
                      )
                      track(EventName.SHARE_LINK_COPIED)
                      toast.success('Copied to clipboard!')
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        fill="currentColor"
                        className="h-4 w-4 opacity-60"
                      >
                        <path d="M9 43.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.8h3v30.15h23.7v3Zm6-6q-1.2 0-2.1-.9-.9-.9-.9-2.1v-28q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h22v-28H15v28Zm0 0v-28 28Z" />
                      </svg>
                      <div>Copy share link</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </article>
          <article>
            <div className="mx-auto px-4 sm:px-6 max-w-4xl">
              <div className="p-6 mb-6 border border-gray-200 rounded-md shadow-lg">
                <div className="mb-3 md:flex md:items-center md:space-x-3">
                  <div className="text-lg font-semibold tracking-tight md:text-2xl">
                    What do you want us to build? 👷
                  </div>
                  <div className="inline-block px-3 py-1 text-sm font-medium leading-4 text-green-600 border border-green-200 rounded-full bg-green-50">
                    Give feedback → Get 5000 words!
                  </div>
                </div>
                <p className="mt-1 mb-4 text-sm md:text-lg">
                  We want to get better at serving you! Tell us what you want us
                  to build. If we build the feature you request, we'll credit
                  you 5000 free words!
                </p>
                <div className="relative flex items-center">
                  <input
                    className="border focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 block w-full py-2 pr-3 text-gray-700 placeholder-gray-400 transition-shadow duration-150 ease-in-out bg-white border-gray-200 rounded-md shadow-sm outline-none resize-none focus:outline-none focus:ring-blue-700 focus:border-blue-700 text-sm"
                    placeholder="Can you build...?"
                    type="text"
                    maxLength={200}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-full items-stretch md:items-start">
                  <button
                    className="inline-flex items-center overflow-hidden ease-in-out outline-none focus:outline-none focus:ring-2 justify-center transition-all duration-150 relative font-medium rounded-lg text-gray-700 bg-white border border-black-300 shadow-sm hover:text-gray-500 selectionRing active:bg-gray-50 active:text-gray-800 px-5 py-2 text-base leading-6 mt-3"
                    type="button"
                    disabled={feedback.length == 0}
                    onClick={() => {
                      toast.promise(submitFeedback(), {
                        loading: 'Submitting feedback',
                        success: () => {
                          track(EventName.FEEDBACK_SUBMITTED)
                          return 'Feedback submitted. Thank you!'
                        },
                        error:
                          'Something went wrong! Please refresh the page and try again.',
                      })
                    }}
                  >
                    Give feedback
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </Page>
    </ProtectedPage>
  )
}

export default Home
