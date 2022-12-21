import type { NextPage } from 'next'
import ProtectedPage from '../components/ProtectedPage'
import Page from '../components/Page'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { useState } from 'react'
import { useUser } from 'utils/useUser'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

const Home: NextPage = () => {
  const db = getFirestore()
  const [feedback, setFeedback] = useState('')
  const { user } = useUser()

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
              <div className="relative mb-6 overflow-hidden border border-gray-200 rounded-md">
                <div>
                  <div className="relative">
                    <div className="grid">
                      <div className="relative left-0 row-span-full col-span-full transition-all duration-150 transform visible opacity-100">
                        <div className="flex flex-col items-start transition-all py-6 px-6 h-full md:pr-40 bg-blue-700">
                          <div className="mb-2 md:mb-4">
                            <div className="inline-flex px-2 py-1 text-xs font-bold text-white uppercase bg-green-500 rounded-full md:px-3 md-text-sm">
                              Get started
                            </div>
                          </div>
                          <div className="text-lg font-semibold tracking-tight text-white md:text-2xl">
                            Ask Inkey 🦑
                          </div>
                          <p className="mt-1 mb-4 text-sm text-white text-opacity-80 md:text-lg md:mb-7">
                            You can ask Inkey to do just about anything and it
                            will provide a thoughtful and intelligent response.
                            Try it out!
                          </p>
                          <Link
                            href={'/ask-inkey'}
                            className="flex flex-col w-full items-stretch md:items-start"
                          >
                            <button
                              className="px-16 py-2 text-md overflow-hidden ease-in-out focus:outline-none focus:ring-offset-2 transition-all duration-150 relative rounded-lg focusRing space-x-2 font-bold text-white bg-white shadow-sm outline-none hover:bg-opacity-30 bg-opacity-20 ring-opacity-20 border-none focus:ring-0"
                              type="button"
                            >
                              Ask a question
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <article>
            <div className="mx-auto px-4 sm:px-6 max-w-4xl">
              <div className="relative mb-6 overflow-hidden border border-gray-200 rounded-md">
                <div>
                  <div className="relative">
                    <div className="grid">
                      <div className="relative left-0 row-span-full col-span-full transition-all duration-150 transform visible opacity-100">
                        <div className="flex flex-col items-start transition-all py-6 px-6 h-full md:pr-40 ">
                          <div className="text-lg font-semibold tracking-tight md:text-2xl">
                            Use Templates 🎭
                          </div>
                          <p className="mt-1 mb-4 text-sm text-opacity-80 md:text-lg md:mb-7">
                            Each template is something different that Inkey can
                            do. If there is anything we are missing, submit a
                            feature request below to get a new template added!
                          </p>
                          <Link
                            className="flex flex-col w-full items-stretch md:items-start"
                            href={'/templates'}
                          >
                            <button
                              className="font-bold text-white bg-blue-500 hover:bg-opacity-30 px-16 py-2 text-md overflow-hidden ease-in-out focus:outline-none focus:ring-offset-2 transition-all duration-150 relative rounded-lg focusRing space-x-2 ring-opacity-20 border-none focus:ring-0"
                              type="button"
                            >
                              See templates
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <article>
            <div className="mx-auto px-4 sm:px-6 max-w-4xl">
              <div className="relative mb-6 overflow-hidden border border-gray-200 rounded-md">
                <div>
                  <div className="relative">
                    <div className="grid">
                      <div className="relative left-0 row-span-full col-span-full transition-all duration-150 transform visible opacity-100">
                        <div className="flex flex-col items-start transition-all py-6 px-6 h-full md:pr-40 bg-blue-700">
                          <div className="text-lg font-semibold tracking-tight text-white md:text-2xl">
                            Write a Persuasive Essay 📣
                          </div>
                          <p className="mt-1 mb-4 text-sm text-white text-opacity-80 md:text-lg md:mb-7">
                            The best way to learn what Inkey can do is by trying
                            it out. Click the button below to write an A+
                            persuasive essay in 1 minute!
                          </p>
                          <Link
                            className="flex flex-col w-full items-stretch md:items-start"
                            href={'/templates/persuasive-essay'}
                          >
                            <button
                              className="px-20 py-2 text-md overflow-hidden ease-in-out focus:outline-none focus:ring-offset-2 transition-all duration-150 relative rounded-lg focusRing space-x-2 font-bold text-white bg-white shadow-sm outline-none hover:bg-opacity-30 bg-opacity-20 ring-opacity-20 border-none focus:ring-0"
                              type="button"
                            >
                              Try it out!
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <article>
            <div className="mx-auto px-4 sm:px-6 max-w-4xl">
              <div className="p-6 mb-6 border border-gray-200 rounded-md">
                <div className="mb-3 md:flex md:items-center md:space-x-3">
                  <div className="text-lg font-semibold tracking-tight md:text-2xl">
                    What do you want us to build? 👷
                  </div>
                  <div className="inline-block px-3 py-1 text-sm font-medium leading-4 text-green-600 border border-green-200 rounded-full bg-green-50">
                    Give feedback → Get 5000 free words!
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
                    className="px-16 py-2 text-md overflow-hidden ease-in-out focus:outline-none focus:ring-offset-2 transition-all duration-150 relative rounded-lg focusRing space-x-2 font-medium text-gray-700 bg-white border border-black-300 shadow-sm hover:text-gray-500 selectionRing active:bg-gray-50 active:text-gray-800 mt-4"
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
