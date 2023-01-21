import { useUser } from '@/utils/useUser'
import Modal from 'components/Modal'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import type { NextPage } from 'next'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { FilterMap, FilterType } from 'types'
import { EventName, track } from 'utils/segment'
import Page from '../components/Page'
import ProtectedPage from '../components/ProtectedPage'
import { filters } from './templates/components/constants'
import TemplateCard from './templates/components/TemplateCard'
import TemplateFilter from './templates/components/TemplateFilter'
import { Template, templates } from './templates/templates'

const Templates: NextPage = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const db = getFirestore()
  const [feedback, setFeedback] = useState('')
  const { user } = useUser()
  const [searchText, setSearchText] = useState('')
  const [filterState, setFilterState] = useState<FilterMap>(
    JSON.parse(JSON.stringify(filters)),
  )
  const templateArray = Object.values(templates)
  const filtered = templateArray.filter((template: Template) =>
    template.title.toLowerCase().includes(searchText.trim().toLowerCase()),
  )

  const onFilterClick = (key: FilterType | string, index: number) => {
    setFilterState((filterState) => {
      const copy = { ...filterState }
      const copyKeys = Object.keys(copy)
      for (let i = 0; i < copyKeys.length; i++) {
        if (copyKeys[i] != key) copy[copyKeys[i]].selected = false
      }
      copy[key].selected = !filterState[key].selected
      return copy
    })
  }

  const submitFeedback = async () => {
    await addDoc(collection(db, 'feedback'), {
      uid: user?.uid,
      comments: feedback,
      time_submitted: Math.floor(Date.now() / 1000),
      seen: false,
    })
    setFeedback('')
    setShowFeedbackModal(false)
  }

  const activeFilters = Object.keys(filterState).filter((key) => {
    if (filterState[key].selected) return key
  })

  return (
    <ProtectedPage>
      <Page title="Dashboard - Inkey">
        {showFeedbackModal && (
          <Modal
            setShowModal={() => {
              setShowFeedbackModal(false)
              setFeedback('')
            }}
          >
            <div className="flex flex-col items-center max-w-lg px-8 pb-8 gap-3">
              <div className="font-semibold text-center tracking-tight text-2xl">
                What do you want us to build? 👷
              </div>
              <div className="px-3 py-1 text-sm font-medium text-green-600 border border-green-200 rounded-full bg-green-50">
                Give feedback → Get 5000 words!
              </div>
              <p className="mt-1 mb-4 text-center">
                We are always looking for ways to make Inkey better! Tell us
                what you want us to build. If we build the feature you request,
                we'll credit you 5000 free words!
              </p>
              <form
                className="w-full flex flex-col gap-3"
                onSubmit={(e) => {
                  e.preventDefault()
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
                <input
                  className="border w-full py-2 pr-3 text-gray-700 placeholder-gray-400 bg-white border-gray-300 rounded-md text-sm"
                  placeholder="Can you build...?"
                  type="text"
                  maxLength={200}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                <button
                  className="px-5 py-2 w-full font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:cursor-pointer disabled:cursor-not-allowed active:bg-gray-50 transition-colors"
                  type="submit"
                  disabled={feedback.trim() == ''}
                >
                  Give feedback
                </button>
              </form>
            </div>
          </Modal>
        )}
        <div className="mt-1 min-h-screen">
          <div className="mx-auto px-4 sm:px-6 max-w-9xl">
            <div className="flex-1">
              <div className="pb-36">
                <div className="flex flex-col items-center pt-6 pb-3 bg-inherit">
                  <div className="flex w-full items-center">
                    <h2 className="flex-grow text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                      Dashboard
                    </h2>
                    <div className="flex items-center justify-center max-w-[12rem] sm:min-w-[320px]">
                      <div className="flex items-center">
                        <div className="flex items-center">
                          <button
                            onClick={() => setShowFeedbackModal(true)}
                            className="inline-flex items-center overflow-hidden ease-in-out focus:outline-none focus:ring-2 justify-center transition-all duration-150 relative leading-5 font-medium shadow-sm focusRing text-center bg-transparent focus:ring-transparent rounded outline-none shadow-transparent"
                            type="button"
                          >
                            <svg
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-9 h-9 flex items-center rounded-md justify-center hover:bg-gray-200 transition-all duration-150 text-gray-400 hover:text-gray-500 px-2 py-1.5 bg-gray-100 aspect-square"
                            >
                              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"></path>
                            </svg>
                          </button>
                          <div className="w-0.5 h-6 bg-gray-300 mx-4"></div>
                        </div>
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="relative flex items-center">
                          <div className="absolute inset-y-0 left-0 flex pointer-events-none">
                            <kbd className="inline-flex items-center px-3 font-sans text-sm font-medium text-gray-400">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                aria-hidden="true"
                                className="w-4 h-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                ></path>
                              </svg>
                            </kbd>
                          </div>
                          <input
                            id="filterTemplates"
                            autoComplete="off"
                            className="border focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 block w-full py-2 pr-3 text-gray-700 placeholder-gray-400 transition-shadow duration-150 ease-in-out bg-white border-gray-200 rounded-md shadow-sm outline-none resize-none focus:outline-none focus:ring-blue-700 focus:border-blue-700 text-sm pl-8"
                            placeholder="Search..."
                            type="search"
                            value={searchText}
                            onChange={(e) => {
                              setSearchText(e.target.value)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap w-full items start gap-2 mt-10 pb-4">
                    {Object.keys(filterState).map((key, index) => {
                      return (
                        <TemplateFilter
                          key={index}
                          name={filterState[key].text}
                          selected={filterState[key].selected}
                          onClick={() => {
                            track(EventName.TEMPLATE_FILTER_CLICKED, {
                              title: filterState[key].text,
                            })
                            onFilterClick(key, index)
                          }}
                        />
                      )
                    })}
                  </div>
                  <div className="w-full my-2 grid gap-5 mb-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filtered.map((template, index) => {
                      if (
                        activeFilters.length == 0 ||
                        activeFilters.includes(template.attribute)
                      )
                        return (
                          <TemplateCard
                            key={index}
                            icon={template.icon}
                            svgIcon={template.svgIcon}
                            title={template.title}
                            description={template.description}
                            href={template.href}
                            newCard={template.new}
                          />
                        )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Page>
    </ProtectedPage>
  )
}

export default Templates
