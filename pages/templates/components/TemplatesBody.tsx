import { useState } from 'react'
import { Template, templates } from '../templates'
import TemplateCard from './TemplateCard'

const TemplatesBody = () => {
  const [searchText, setSearchText] = useState('')

  const templateArray = Object.values(templates)
  const filtered = templateArray.filter((template: Template) =>
    template.title.toLowerCase().includes(searchText.trim().toLowerCase()),
  )

  return (
    <div className="lg:ml-56 mt-1 min-h-screen">
      <article>
        <div className="mx-auto px-4 sm:px-6 max-w-9xl">
          <div className="flex-1">
            <div className="pb-36">
              <div className="flex flex-col items-center pt-6 pb-3 bg-inherit">
                <div className="flex w-full items-center">
                  <h2 className="flex-grow text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    Templates
                  </h2>
                  <div className="flex items-center justify-center max-w-xs md:min-w-[320px]">
                    {/* <div className="flex items-center">
                    <div className="flex items-center">
                    <button
                    className="inline-flex items-center overflow-hidden ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2inline-flex justify-center transition-all duration-150 relative leading-5 font-medium shadow-sm focusRing text-center bg-transparent focus:ring-transparent rounded outline-none shadow-transparent"
                    type="button"
                    >
                    <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 flex items-center rounded-md justify-center hover:bg-gray-200 transition-all duration-150 text-gray-400 hover:text-gray-500 px-2 py-1.5 bg-gray-100 aspect-square w-9 h-9"
                    >
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"></path>
                    </svg>
                    </button>
                    <div className="w-0.5 h-6 bg-gray-300 mx-4"></div>
                    </div>
                  </div> */}

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
                <div className="space-y-8 pt-8">
                  {/* <div id="headlessui-radiogroup-5" role="radiogroup">
                    {filters.map((filter, index) => {
                      return (
                        <TemplateFilter
                          name={filterState[index].name}
                          selected={filterState[index].selected}
                          onClick={() => {
                            // set templates to show
                            setTemplatesToShow(filter.show)
                            // set all filters to "unselected"
                            for (let i = 0; i < filterState.length; i++) {
                              filterState[i].selected = false
                            }
                            // set clicked filter to "selected"
                            filterState[index].selected = true
                          }}
                        />
                      )
                    })}
                  </div> */}
                  <div className="my-2 grid gap-5 mb-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filtered.map((template, index) => {
                      return (
                        <TemplateCard
                          key={index}
                          icon={template.icon}
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
      </article>
    </div>
  )
}

export default TemplatesBody
