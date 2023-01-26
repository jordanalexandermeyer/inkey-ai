import classNames from 'classnames'
import LeftMenu from 'components/LeftMenu'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import DatePicker from 'react-datepicker'
import {
  Citation,
  CitationsModalPanels,
  CitationSource,
  CitationStyle,
  ContributorType,
  getApaFullCitation,
  getApaInTextCitation,
  getMlaFullCitation,
  getMlaInTextCitation,
  newCitation,
  Resource,
  useCitations,
} from './CitationsContextProvider'
let psl = require('psl')

const CitationsModal = () => {
  const { panelShowing } = useCitations()

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto">
      <div className="flex items-center justify-center h-screen">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-50 opacity-100"></div>
        <div className="z-10 flex flex-col w-full h-[90%] overflow-hidden rounded-2xl max-w-4xl bg-white border border-gray-300 shadow-lg">
          <CitationsModalNav />
          {panelShowing == CitationsModalPanels.RESEARCH && <ResearchPanel />}
          {panelShowing == CitationsModalPanels.CITATIONS && <CitationsPanel />}
        </div>
      </div>
    </div>
  )
}

const ResearchPanel = () => {
  const {
    searchQuery,
    setSearchQuery,
    isSearchLoading,
    resources,
    submitSearch,
  } = useCitations()

  const handleSubmit = async () => {
    await submitSearch(searchQuery)
  }

  return (
    <div className="flex flex-col">
      <div className="px-4 md:px-8 py-5 border-b border-gray-300">
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            await handleSubmit()
          }}
          className="flex items-center gap-3 px-4 border border-gray-300 focus-within:border-blue-700 rounded-full"
        >
          <button type="submit" className="hover:text-blue-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              stroke="currentColor"
              viewBox="0 0 48 48"
              className="w-5 h-5"
            >
              <path d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z"></path>
            </svg>
          </button>
          <input
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full outline-none"
          />
          <button type="button" onClick={() => setSearchQuery('')}>
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
        </form>
      </div>
      {isSearchLoading ? (
        <div className="flex h-[calc(90vh-200px)] justify-center items-center max-h-[calc(90vh-140px)]">
          <svg
            className="w-10 h-10 text-blue-700 animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#d1d5db"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ) : (
        <div className="flex flex-col gap-5 px-4 md:px-8 pt-5 pb-8 h-[calc(90vh-140px)] overflow-auto">
          <h2 className="text-lg font-semibold">Web Results</h2>
          {resources.length > 0
            ? resources.map((resource: Resource, index: number) => (
                <ResourceCard key={index} index={index} />
              ))
            : 'No results were found. Try changing your search query.'}
        </div>
      )}
    </div>
  )
}

const ResourceCard = ({ index }: { index: number }) => {
  const {
    setCitations,
    setPanelShowing,
    setEditingCitation,
    resources,
    setEditingCitationIndex,
    setShowEditCitationsPanel,
  } = useCitations()
  const title = resources[index].title
  const snippet = resources[index].snippet
  const link = resources[index].link
  const date = resources[index].date
  const domain = new URL(link).hostname
  const parsed = psl.parse(domain)
  const secondLevelDomain = parsed.sld

  return (
    <div className="flex flex-col gap-3 px-4 py-3 rounded-xl border border-gray-300 hover:border-blue-700 shadow-md">
      <div className="flex justify-between items-center">
        <a href={link} target="_blank" className="text-sm">
          {domain}
        </a>
        <button
          onClick={() => {
            const newCitation: Citation = {
              citationSource: CitationSource.WEBSITE,
              publicationInfo: {
                title,
                containerTitle: secondLevelDomain,
                url: link,
                ...(date && { publishDate: date }),
                accessDate: new Date().getTime(),
              },
              contributors: [
                {
                  contributorType: ContributorType.AUTHOR,
                  title: '',
                  initials: '',
                  firstName: '',
                  lastName: '',
                },
              ],
            }
            setCitations((currentCitations) => {
              const newCitations: Citation[] = JSON.parse(
                JSON.stringify(currentCitations),
              )
              newCitations.splice(0, 0, newCitation)
              return newCitations
            })

            toast.success(
              'Citation added! Please fill out any missing information.',
              {
                duration: 5000,
              },
            )
            setEditingCitationIndex(0)
            setEditingCitation(newCitation)
            setShowEditCitationsPanel(true)
            setPanelShowing(CitationsModalPanels.CITATIONS)
          }}
          className="flex items-center gap-1 px-2 py-1 hover:bg-blue-50 rounded-md text-blue-700"
        >
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
      <h3 className="font-medium">{title}</h3>
      <p>{snippet}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm">
          {date &&
            new Date(date).toLocaleDateString('en-us', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
        </span>
        <a
          href={link}
          target="_blank"
          className="flex px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium self-end"
        >
          Read more
        </a>
      </div>
    </div>
  )
}

const CitationsModalNav = () => {
  const {
    panelShowing,
    setPanelShowing,
    setShowCitationsModal,
    setShowEditCitationsPanel,
  } = useCitations()

  return (
    <div className="flex items-center justify-between border-b border-b-gray-300">
      <div className="flex">
        <button
          onClick={() => {
            setPanelShowing(CitationsModalPanels.RESEARCH)
            setShowEditCitationsPanel(false)
          }}
          className={classNames(
            'flex items-center gap-1.5 px-4 py-4 border-r border-r-gray-300 hover:bg-gray-100 active:bg-gray-200 transition-colors',
            {
              'text-blue-700': panelShowing == CitationsModalPanels.RESEARCH,
              'text-gray-700': panelShowing == CitationsModalPanels.CITATIONS,
            },
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="m13.15 34.85 14.5-7.15 7.15-14.5-14.5 7.15ZM24 26q-.85 0-1.425-.575Q22 24.85 22 24q0-.85.575-1.425Q23.15 22 24 22q.85 0 1.425.575Q26 23.15 26 24q0 .85-.575 1.425Q24.85 26 24 26Zm0 18q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Z" />
          </svg>
          Research
        </button>
        <button
          onClick={() => {
            setPanelShowing(CitationsModalPanels.CITATIONS)
            setShowEditCitationsPanel(false)
          }}
          className={classNames(
            'flex items-center gap-1.5 px-4 py-4 border-r border-r-gray-300 hover:bg-gray-100 active:bg-gray-200 transition-colors',
            {
              'text-blue-700': panelShowing == CitationsModalPanels.CITATIONS,
              'text-gray-700': panelShowing == CitationsModalPanels.RESEARCH,
            },
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="m31.3 34 4-8H26V12h14v14.4L36.2 34Zm-18 0 4-8H8V12h14v14.4L18.2 34Z" />
          </svg>
          Citations
        </button>
      </div>
      <button
        className="p-2 mr-2 hover:bg-gray-100 rounded-md"
        onClick={() => {
          setShowCitationsModal(false)
          setPanelShowing(CitationsModalPanels.RESEARCH)
          setShowEditCitationsPanel(false)
        }}
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
  )
}

const CitationsPanel = () => {
  const { showEditCitationsPanel } = useCitations()

  return (
    <>
      {showEditCitationsPanel ? <EditCitationPanel /> : <CitationsPanelHome />}
    </>
  )
}

const CitationsPanelHome = () => {
  const {
    citationStyle,
    setCitationStyle,
    citations,
    setEditingCitation,
    setEditingCitationIndex,
    setShowEditCitationsPanel,
  } = useCitations()

  return (
    <div className="flex flex-col">
      <div className="px-4 md:px-8 py-5 border-b border-gray-300">
        <label
          htmlFor="citation-style"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Citation style
        </label>
        <select
          id="citation-style"
          value={citationStyle}
          onChange={(e: any) => setCitationStyle(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        >
          <option value={CitationStyle.APA}>
            APA (American Psychological Association)
          </option>
          <option value={CitationStyle.MLA}>
            MLA (Modern Language Association)
          </option>
        </select>
      </div>
      <div className="flex flex-col gap-5 px-4 md:px-8 pt-5 pb-8 h-[calc(90vh-168px)] overflow-auto">
        {citations.length > 0 ? (
          citations.map((citation: Citation, index: number) => (
            <CitationCard key={index} index={index} citation={citation} />
          ))
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center h-full w-full md:text-lg">
            <p className="text-center">
              No citations were found. Add a citation in the "Research" tab or
              create a new citation by clicking the button below.
            </p>
            <button
              onClick={() => {
                setEditingCitation(newCitation)
                setEditingCitationIndex(undefined)
                setShowEditCitationsPanel(true)
              }}
              className="whitespace-nowrap py-2 px-4 rounded-full text-white font-medium bg-blue-600 hover:bg-blue-700 active:bg-blue-500 transition-colors"
            >
              + Create Citation
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const EditCitationPanel = () => {
  const {
    setCitations,
    setShowEditCitationsPanel,
    editingCitationIndex,
    editingCitation,
    setEditingCitation,
  } = useCitations()

  const publishDate = editingCitation.publicationInfo.publishDate
    ? new Date(editingCitation.publicationInfo.publishDate)
    : null

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center px-4 py-3 border-b border-b-gray-300">
        <button
          onClick={() => {
            setShowEditCitationsPanel(false)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            stroke="currentColor"
            fill="currentColor"
            className="h-6 w-6 text-gray-700"
          >
            <path d="M24 40 8 24 24 8l2.1 2.1-12.4 12.4H40v3H13.7l12.4 12.4Z" />
          </svg>
        </button>
        <button
          onClick={() => {
            setCitations((currentCitations) => {
              const newCitations: Citation[] = JSON.parse(
                JSON.stringify(currentCitations),
              )
              if (typeof editingCitationIndex == 'number') {
                newCitations.splice(editingCitationIndex, 1, editingCitation)
                return newCitations
              } else {
                newCitations.splice(0, 0, editingCitation)
                return newCitations
              }
            })
            setShowEditCitationsPanel(false)
          }}
          className="py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-400 transition-colors rounded-full"
        >
          Save citation
        </button>
      </div>
      <div className="flex flex-col px-4 pt-4 md:px-8 gap-3 pb-8 h-[calc(90vh-122px)] overflow-auto">
        <div className="text-lg font-medium">Source</div>
        <div className="flex items-center">
          <div className="pr-2">Type</div>
          <select
            onChange={(e: any) => {
              // setEditingCitation((currentEditingCitation) => {
              //   const newCitation: Citation = JSON.parse(
              //     JSON.stringify(currentEditingCitation),
              //   )
              //   newCitation.citationSource = e.target.value
              //   return newCitation
              // })
            }}
            value={editingCitation?.citationSource}
            className="h-10 border border-gray-300 rounded-md"
          >
            <option value={CitationSource.WEBSITE}>Website</option>
            <option value={CitationSource.BOOK}>Book (Coming Soon)</option>
            <option value={CitationSource.JOURNAL}>
              Journal Article (Coming Soon)
            </option>
          </select>
        </div>
        <div className="flex items-center">
          <div className="pr-2">Title</div>
          <input
            onChange={(e: any) => {
              setEditingCitation((currentEditingCitation) => {
                const newCitation: Citation = JSON.parse(
                  JSON.stringify(currentEditingCitation),
                )
                newCitation.publicationInfo.title = e.target.value
                return newCitation
              })
            }}
            value={editingCitation?.publicationInfo.title}
            className="h-10 p-2 w-full border border-gray-300 rounded-md"
          ></input>
        </div>
        <div className="border"></div>
        <div className="text-lg font-medium">Contributors</div>
        {editingCitation?.contributors.map((contributor, index) => (
          <div key={index} className="flex gap-1 items-center">
            <select
              onChange={(e: any) => {
                setEditingCitation((currentEditingCitation) => {
                  const newCitation: Citation = JSON.parse(
                    JSON.stringify(currentEditingCitation),
                  )
                  newCitation.contributors[index].contributorType =
                    ContributorType.AUTHOR
                  return newCitation
                })
              }}
              value={editingCitation.contributors[index].contributorType}
              className="border border-gray-300 h-10 rounded-md"
            >
              <option value={ContributorType.AUTHOR}>Author</option>
              <option value={ContributorType.EDITOR}>
                Editor (Coming Soon)
              </option>
              <option value={ContributorType.TRANSLATOR}>
                Translator (Coming Soon)
              </option>
              <option value={ContributorType.ILLUSTRATOR}>
                Illustrator (Coming Soon)
              </option>
            </select>
            <div className="flex gap-1">
              {/* <input
                placeholder="Title"
                onChange={(e: any) => {
                  setEditingCitation((currentEditingCitation) => {
                    const newCitation: Citation = JSON.parse(
                      JSON.stringify(currentEditingCitation),
                    )
                    newCitation.contributors[index].title = e.target.value
                    return newCitation
                  })
                }}
                value={editingCitation.contributors[index].title}
                className="h-10 w-full p-2 flex border border-gray-300 rounded-md"
              ></input>
              <input
                placeholder="Initials"
                onChange={(e: any) => {
                  setEditingCitation((currentEditingCitation) => {
                    const newCitation: Citation = JSON.parse(
                      JSON.stringify(currentEditingCitation),
                    )
                    newCitation.contributors[index].initials = e.target.value
                    return newCitation
                  })
                }}
                value={editingCitation.contributors[index].initials}
                className="h-10 w-full p-2 border border-gray-300 rounded-md"
              ></input> */}
              <input
                placeholder="First Name"
                onChange={(e: any) => {
                  setEditingCitation((currentEditingCitation) => {
                    const newCitation: Citation = JSON.parse(
                      JSON.stringify(currentEditingCitation),
                    )
                    newCitation.contributors[index].firstName = e.target.value
                    return newCitation
                  })
                }}
                value={editingCitation.contributors[index].firstName}
                className="h-10 w-full p-2 border border-gray-300 rounded-md"
              ></input>
              <input
                placeholder="Last Name"
                onChange={(e: any) => {
                  setEditingCitation((currentEditingCitation) => {
                    const newCitation: Citation = JSON.parse(
                      JSON.stringify(currentEditingCitation),
                    )
                    newCitation.contributors[index].lastName = e.target.value
                    return newCitation
                  })
                }}
                value={editingCitation.contributors[index].lastName}
                className="h-10 w-full p-2 border border-gray-300 rounded-md"
              ></input>
            </div>
            <button
              onClick={() => {
                setEditingCitation((currentEditingCitation) => {
                  const newCitation: Citation = JSON.parse(
                    JSON.stringify(currentEditingCitation),
                  )
                  newCitation.contributors.splice(index, 1)
                  return newCitation
                })
              }}
              className={classNames({
                invisible: editingCitation.contributors.length < 2,
              })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-3 0 48 48"
                stroke="currentColor"
                className="h-4 w-4 text-gray-700"
              >
                <path d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z" />
              </svg>
            </button>
          </div>
        ))}
        <button
          onClick={() => {
            setEditingCitation((currentEditingCitation) => {
              const newCitation: Citation = JSON.parse(
                JSON.stringify(currentEditingCitation),
              )
              newCitation.contributors?.push({
                contributorType: ContributorType.AUTHOR,
                title: '',
                initials: '',
                firstName: '',
                lastName: '',
              })
              return newCitation
            })
          }}
          className="py-2 px-4 font-medium border border-gray-300 rounded-md md:self-start hover:bg-gray-100 active:bg-gray-200 transition-colors"
        >
          + Add
        </button>
        <div className="border"></div>
        <div className="text-lg font-medium">Publication Information</div>
        <div className="flex items-center">
          <div className="pr-2 whitespace-nowrap">Website Title</div>
          <input
            onChange={(e: any) => {
              setEditingCitation((currentEditingCitation) => {
                const newCitation: Citation = JSON.parse(
                  JSON.stringify(currentEditingCitation),
                )
                newCitation.publicationInfo.containerTitle = e.target.value
                return newCitation
              })
            }}
            value={editingCitation.publicationInfo.containerTitle}
            className="h-10 p-2 w-full border border-gray-300 rounded-md"
          ></input>
        </div>
        <div className="flex items-center">
          <div className="pr-2">URL</div>
          <input
            onChange={(e: any) => {
              setEditingCitation((currentEditingCitation) => {
                const newCitation: Citation = JSON.parse(
                  JSON.stringify(currentEditingCitation),
                )
                newCitation.publicationInfo.url = e.target.value
                return newCitation
              })
            }}
            value={editingCitation.publicationInfo.url}
            className="h-10 p-2 w-full border border-gray-300 rounded-md"
          ></input>
        </div>
        <div className="flex items-center">
          <div className="pr-2 whitespace-nowrap">Year Published</div>
          <DatePicker
            selected={publishDate}
            onChange={(date) => {
              setEditingCitation((currentEditingCitation) => {
                if (date == null) return currentEditingCitation
                const newCitation: Citation = JSON.parse(
                  JSON.stringify(currentEditingCitation),
                )
                newCitation.publicationInfo.publishDate = date.getTime()
                return newCitation
              })
            }}
            popperPlacement="top-start"
            showYearPicker
            dateFormat="yyyy"
            maxDate={new Date()}
            className="border border-gray-300 rounded-md w-full max-w-[4rem]"
          />
        </div>
        <div className="flex items-center">
          <div className="pr-2 whitespace-nowrap">Date Accessed</div>
          <DatePicker
            selected={new Date(editingCitation.publicationInfo.accessDate)}
            onChange={(date) => {
              setEditingCitation((currentEditingCitation) => {
                if (date == null) return currentEditingCitation
                const newCitation: Citation = JSON.parse(
                  JSON.stringify(currentEditingCitation),
                )
                newCitation.publicationInfo.accessDate = date.getTime()
                return newCitation
              })
            }}
            todayButton="Today"
            popperPlacement="top-start"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            maxDate={new Date()}
            className="border border-gray-300 rounded-md w-full max-w-[7rem]"
          />
        </div>
      </div>
    </div>
  )
}

const CitationCard = ({
  citation,
  index,
}: {
  citation: Citation
  index: number
}) => {
  const [showMenu, setShowMenu] = useState(false)
  const {
    setCitations,
    citations,
    setShowEditCitationsPanel,
    setEditingCitationIndex,
    citationStyle,
    setEditingCitation,
  } = useCitations()

  const [inTextCitation, setInTextCitation] = useState('')
  const [fullCitation, setFullCitation] = useState('')

  useEffect(() => {
    const apaInTextCitation = getApaInTextCitation(citations[index])
    const apaFullTextCitation = getApaFullCitation(citations[index])
    const mlaInTextCitation = getMlaInTextCitation(citations[index])
    const mlaFullCitation = getMlaFullCitation(citations[index])
    switch (citationStyle) {
      case CitationStyle.APA:
        setInTextCitation(apaInTextCitation)
        setFullCitation(apaFullTextCitation)
        break
      case CitationStyle.MLA:
        setInTextCitation(mlaInTextCitation)
        setFullCitation(mlaFullCitation)
        break
    }
  }, [citationStyle])

  return (
    <div className="flex flex-col gap-3 px-4 py-3 rounded-xl border-[0.5px] border-blue-700">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">{citation.publicationInfo.title}</h1>
        <div className="relative text-gray-700">
          <button
            onClick={() => setShowMenu(true)}
            className="flex items-center gap-1 p-1 hover:bg-gray-100 active:bg-gray-200 transition-colors rounded-md text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              stroke="currentColor"
              strokeWidth="3"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M24.05 41.7q-1.25 0-2.125-.875t-.875-2.075q0-1.2.875-2.1.875-.9 2.075-.9 1.25 0 2.1.9.85.9.85 2.1 0 1.2-.85 2.075-.85.875-2.05.875Zm0-14.75q-1.25 0-2.125-.875T21.05 24q0-1.25.875-2.1.875-.85 2.075-.85 1.25 0 2.1.85.85.85.85 2.05 0 1.25-.85 2.125t-2.05.875Zm0-14.7q-1.25 0-2.125-.875T21.05 9.25q0-1.25.875-2.125T24 6.25q1.25 0 2.1.875.85.875.85 2.125t-.85 2.125q-.85.875-2.05.875Z" />
            </svg>
          </button>
          {showMenu && (
            <LeftMenu setShowMenu={setShowMenu}>
              <button
                onClick={() => {
                  setEditingCitationIndex(index)
                  setEditingCitation(
                    JSON.parse(JSON.stringify(citations[index])),
                  )
                  setShowEditCitationsPanel(true)
                }}
                className="flex whitespace-nowrap items-center gap-2 px-3 py-2 hover:bg-gray-100 active:bg-gray-200 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="h-5 w-5"
                >
                  <path d="m39.7 14.7-6.4-6.4 2.1-2.1q.85-.85 2.125-.825 1.275.025 2.125.875L41.8 8.4q.85.85.85 2.1t-.85 2.1Zm-2.1 2.1L12.4 42H6v-6.4l25.2-25.2Z" />
                </svg>
                Edit
              </button>
              <button
                onClick={() => {
                  setShowMenu(false)
                  setCitations((currentCitations) => {
                    const newCitations: Citation[] = JSON.parse(
                      JSON.stringify(currentCitations),
                    )
                    newCitations.splice(index, 1)
                    return newCitations
                  })
                }}
                className="flex whitespace-nowrap items-center gap-2 px-3 py-2 hover:bg-gray-100 active:bg-gray-200 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-3 0 48 48"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z" />
                </svg>
                Delete
              </button>
              <a
                onClick={() => setShowMenu(false)}
                href={citation.publicationInfo.url}
                target="_blank"
                className="flex whitespace-nowrap items-center gap-2 px-3 py-2 hover:bg-gray-100 active:bg-gray-200 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h13.95v3H9v30h30V25.05h3V39q0 1.2-.9 2.1-.9.9-2.1.9Zm10.1-10.95L17 28.9 36.9 9H25.95V6H42v16.05h-3v-10.9Z" />
                </svg>
                Open resource
              </a>
            </LeftMenu>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium whitespace-nowrap">In-Text Citation:</span>
        <span className="truncate">{inTextCitation}</span>
        <button
          onClick={() => {
            window.navigator.clipboard.writeText(inTextCitation)
            toast.success('Copied to clipboard!')
          }}
          className="text-gray-700 hover:text-blue-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M9 43.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.8h3v30.15h23.7v3Zm6-6q-1.2 0-2.1-.9-.9-.9-.9-2.1v-28q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h22v-28H15v28Zm0 0v-28 28Z" />
          </svg>
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium whitespace-nowrap">Full Citation:</span>
        <span className="truncate">{fullCitation}</span>
        <button
          onClick={() => {
            window.navigator.clipboard.writeText(fullCitation)
            toast.success('Copied to clipboard!')
          }}
          className="text-gray-700 hover:text-blue-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M9 43.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.8h3v30.15h23.7v3Zm6-6q-1.2 0-2.1-.9-.9-.9-.9-2.1v-28q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h22v-28H15v28Zm0 0v-28 28Z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default CitationsModal
