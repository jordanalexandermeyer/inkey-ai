import { addDoc, collection, getFirestore } from 'firebase/firestore'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useReferral } from 'utils/useReferral'
import { useUser } from 'utils/useUser'
import Page from '../components/Page'
import ProtectedPage from '../components/ProtectedPage'

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
                  <div className="text-lg font-semibold tracking-tight md:text-2xl">
                    Ask Inkey 🦑
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
                        success: 'Feedback submitted. Thank you!',
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
