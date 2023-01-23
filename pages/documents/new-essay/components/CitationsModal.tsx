import { useState } from 'react'
import { useCitations } from './CitationsContextProvider'

const CitationsModal = ({ children }: { children?: React.ReactNode }) => {
  const { setShowCitationsModal } = useCitations()
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <div className="fixed inset-0 z-40 overflow-y-auto">
      <div className="flex items-center justify-center h-screen">
        <div
          onClick={() => setShowCitationsModal(false)}
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-50 opacity-100"
        ></div>
        <div className="z-10 flex flex-col w-full h-[90%] overflow-hidden rounded-2xl max-w-4xl bg-white border border-gray-300 shadow-lg">
          <div className="flex items-center justify-between border-b border-b-gray-300">
            <div className="flex">
              <div className="flex items-center gap-1.5 px-4 py-4 text-blue-700 border-r border-r-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="m13.15 34.85 14.5-7.15 7.15-14.5-14.5 7.15ZM24 26q-.85 0-1.425-.575Q22 24.85 22 24q0-.85.575-1.425Q23.15 22 24 22q.85 0 1.425.575Q26 23.15 26 24q0 .85-.575 1.425Q24.85 26 24 26Zm0 18q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Z" />
                </svg>
                Research
              </div>
              <div className="flex items-center gap-1.5 px-4 py-4 text-gray-700 border-r border-r-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="m31.3 34 4-8H26V12h14v14.4L36.2 34Zm-18 0 4-8H8V12h14v14.4L18.2 34Z" />
                </svg>
                Citations
              </div>
            </div>
            <button
              className="p-2 mr-2 hover:bg-gray-100 rounded-md"
              onClick={() => setShowCitationsModal(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 48 48"
                strokeWidth="1"
                stroke="currentColor"
                className="w-6 h-6 text-gray-700"
              >
                <path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col">
            <div className="px-8 py-5 border-b border-gray-300">
              <div className="flex items-center gap-3 px-4 border border-gray-300 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  stroke="currentColor"
                  viewBox="0 0 48 48"
                  className="w-5 h-5"
                >
                  <path d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z"></path>
                </svg>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full outline-none"
                />
                <button className="" onClick={() => setSearchQuery('')}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    stroke="currentColor"
                    viewBox="0 0 48 48"
                    className="w-4 h-4 text-gray-700"
                  >
                    <path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-5 px-8 py-5 max-h-[calc(90vh-140px)] overflow-y-scroll">
              <h2 className="text-lg font-semibold">Web Results</h2>
              {Array.from(Array(10)).map(() => (
                <ResourcePanel />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ResourcePanel = () => {
  return (
    <div className="flex flex-col gap-3 px-4 py-3 rounded-xl border border-blue-700 shadow-lg">
      <div className="flex justify-between">
        <a href="www.fortune.net" target="_blank" className="font-light">
          fortune.net
        </a>
        <button className="flex items-center gap-1 px-2 py-1 hover:bg-blue-50 rounded-md text-blue-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            stroke="currentColor"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M6 31.5v-3h15v3Zm0-8.25v-3h23.5v3ZM6 15v-3h23.5v3Zm26.5 25v-8.5H24v-3h8.5V20h3v8.5H44v3h-8.5V40Z" />
          </svg>
          Add citation
        </button>
      </div>
      <h3 className="font-medium">
        Democrats are pushing policies that may just make us all equal
      </h3>
      <p>
        Generally speaking, the Democrats are progressive and favor policies
        that promote equality and social justice. Generally speaking, the
        Democrats are progressive and favor policies that promote equality and
        social justice...
      </p>
      <button className="flex px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium self-end">
        Get Content
      </button>
    </div>
  )
}

export default CitationsModal
