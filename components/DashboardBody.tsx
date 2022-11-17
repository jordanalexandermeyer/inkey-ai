import { addDoc, collection, getFirestore } from 'firebase/firestore'
import Link from 'next/link'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'

const Body = () => {
  const auth = getAuth()
  const db = getFirestore()
  const [feedback, setFeedback] = useState('')
  const [user] = useAuthState(auth)

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
    <>
      <Toaster />
      <div className="lg:ml-72 mt-1 py-12 mb-36">
        <article>
          <div className="mx-auto px-4 sm:px-6 max-w-4xl">
            <div className="relative mb-6 overflow-hidden border border-gray-200 rounded-md">
              <div>
                <div className="relative">
                  <div className="grid">
                    <div className="relative left-0 row-span-full col-span-full transition-all duration-150 transform visible opacity-100">
                      <div className="flex flex-col items-start transition-all py-6 pl-6 pr-32 h-full md:pr-40 bg-gradient-to-r from-purple-700 to-blue-400">
                        <div className="mb-2 md:mb-4">
                          <div className="inline-flex px-2 py-1 text-xs font-bold text-white uppercase bg-green-500 rounded-full md:px-3 md-text-sm">
                            Education
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold tracking-tight text-white md:text-2xl">
                          Ghostwritten 101: Write a Five Paragraph Essay
                        </h3>
                        <p className="mt-1 mb-4 text-sm text-white text-opacity-70 md:text-lg md:mb-7">
                          The best way to learn how to use Ghostwritten is by
                          trying it out. Click the button below to write a five
                          paragraph essay with only a prompt and a thesis!
                        </p>
                        <Link href={'/templates/five-paragraph-essay'}>
                          <button
                            className="inline-flex items-center overflow-hidden ease-in-out focus:outline-none focus:ring-offset-2inline-flex justify-center transition-all duration-150 relative rounded-lg focusRing space-x-2 font-bold text-white bg-white shadow-sm outline-none hover:bg-opacity-30 bg-opacity-20 ring-opacity-20 border-none focus:ring-0 px-4 py-2 text-sm"
                            type="button"
                          >
                            Try it out!
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* <div className="absolute top-0 right-0 w-32 h-full py-6 pr-6 md:w-40">
                  <div className="relative flex items-center justify-end h-full">
                    <div className="absolute top-0 right-0 text-sm text-white text-opacity-70 basis-full">
                      1 of 1
                    </div>
                    <button
                      className="inline-flex items-center overflow-hidden ease-in-out focus:outline-none focus:ring-offset-2inline-flex justify-center transition-all duration-150 relative leading-5 focusRing space-x-2 font-bold text-white bg-white shadow-sm outline-none hover:bg-opacity-30 bg-opacity-20 ring-opacity-20 border-none focus:ring-0 py-2 pl-4 pr-3 rounded-full"
                      type="button"
                    >
                      <span>Next</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="w-6 h-6 opacity-60"
                      >
                        <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path>
                      </svg>
                    </button>
                  </div>
                </div> */}
                </div>
              </div>
            </div>
            {/* <div className="items-center p-6 mb-6 border border-blue-200 rounded bg-blue-50 md:flex md:items-center md:space-x-6">
            <div className="flex-grow mb-3 font-medium tracking-tight text-blue-500 md:mb-0">
              <p className="text-center md:text-left">
                Upgrade your plan before your trial ends in 5 days to get a free
                month!
              </p>
            </div>
            <div className="flex justify-center">
              <button
                id="setPlan"
                aria-label="setPlan"
                className="items-center overflow-hidden ease-in-out outline-none focus:outline-none focus:ring-2 focus:ring-offset-2inline-flex justify-center transition-all duration-150 relative font-medium rounded-lg focusRing text-white bg-gradient-to-r from-purple-400 to-blue-400 shadow-sm hover:from-purple-300 hover:to-blue-300 selectionRing active:from-purple-500 active:to-blue-500 px-5 py-2 text-base leading-6 hidden md:block"
                type="button"
              >
                Select plan
              </button>
              <button
                id="setPlan"
                aria-label="setPlan"
                className="items-center overflow-hidden ease-in-out outline-none focus:outline-none focus:ring-2 focus:ring-offset-2inline-flex justify-center transition-all duration-150 relative font-medium rounded-lg focusRing text-white bg-gradient-to-r from-purple-400 to-blue-400 shadow-sm hover:from-purple-300 hover:to-blue-300 selectionRing active:from-purple-500 active:to-blue-500 px-5 py-2 text-base leading-6 block md:hidden"
                type="button"
              >
                Select plan
              </button>
            </div>
          </div> */}
            <div className=" p-6 mb-6 text-sm text-gray-400 border border-gray-200 rounded-md">
              <div className="mb-3 md:flex md:items-center md:space-x-3">
                <div className="mb-3 text-2xl font-bold tracking-tight text-gray-800 md:mb-0">
                  What do you want us to build?
                </div>
                <div className="inline-block px-3 py-1 text-sm font-medium leading-4 text-green-600 border border-green-200 rounded-full bg-green-50">
                  Give feedback → Get a free month
                </div>
              </div>
              <div className="text-base text-gray-500 md:my-0 md:leading-7">
                We want to get better at serving you! Tell us what types of
                templates you want us to build. If we build your template, we'll
                give you a free month of Ghostwritten!
              </div>
              <div className="relative flex items-center pt-2">
                <input
                  className="border focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 block w-full py-2 pr-3 text-gray-700 placeholder-gray-400 transition-shadow duration-150 ease-in-out bg-white border-gray-200 rounded-md shadow-sm outline-none resize-none focus:outline-none focus:ring-blue-700 focus:border-blue-700 text-sm"
                  placeholder="Can you build a template that takes in ____ and writes ____ ?"
                  type="text"
                  maxLength={200}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
              <button
                className="inline-flex items-center overflow-hidden ease-in-out outline-none focus:outline-none focus:ring-2 focus:ring-offset-2inline-flex justify-center transition-all duration-150 relative font-medium rounded-lg focusRing text-gray-700 bg-white border border-black-300 shadow-sm hover:text-gray-500 selectionRing active:bg-gray-50 active:text-gray-800 px-5 py-2 text-base leading-6 mt-3"
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
                <div className="flex items-center space-x-2">
                  <div>Give feedback</div>
                </div>
              </button>
            </div>
          </div>
        </article>
      </div>
    </>
  )
}

export default Body
