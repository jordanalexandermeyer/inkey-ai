import Page from 'components/Page'
import ProtectedPage from 'components/ProtectedPage'
import { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import { MobileView, BrowserView } from 'react-device-detect'
import essayPicture from '../../public/assets/template-essay.png'
import {
  createDocument as saveDocumentToDb,
  CreateDocumentOptions,
  deleteDocument as deleteDocumentInDb,
  Document,
  getDocuments as getDocumentsFromDb,
} from '@/db/documents'
import { useUser } from '@/utils/useUser'
import { useEffect, createRef } from 'react'
import Link from 'next/link'
import {
  convertBytesToKilobytes,
  roundToTwoDecimals,
  strip,
} from '@/utils/helpers'
import sizeof from 'firestore-size'

enum DocumentView {
  LIST = 'list',
  PANELS = 'panels',
}

const DocumentsPage: NextPage = () => {
  const { user, isLoading: isLoadingUser } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [newDocumentLoading, setNewDocumentLoading] = useState(false)
  const [documents, setDocuments] = useState<Document[]>([])
  const [documentView, setDocumentView] = useState(DocumentView.PANELS)
  const [showSortPanel, setShowSortPanel] = useState(false)

  const switchDocumentView = () => {
    if (documentView == DocumentView.PANELS) setDocumentView(DocumentView.LIST)
    if (documentView == DocumentView.LIST) setDocumentView(DocumentView.PANELS)
  }

  const sortDocumentsByName = (documents: Document[]) => {
    const documentsCopy: Document[] = JSON.parse(JSON.stringify(documents))
    documentsCopy.sort((documentA, documentB) => {
      if (documentA.title < documentB.title) return -1
      if (documentA.title > documentB.title) return 1
      return 0
    })
    if (JSON.stringify(documents) == JSON.stringify(documentsCopy)) {
      return documentsCopy.sort((documentA, documentB) => {
        if (documentA.title < documentB.title) return 1
        if (documentA.title > documentB.title) return -1
        return 0
      })
    } else {
      return documentsCopy
    }
  }

  const sortDocumentsByDateModified = (documents: Document[]) => {
    const documentsCopy: Document[] = JSON.parse(JSON.stringify(documents))
    documentsCopy.sort((documentA, documentB) => {
      if (documentA.modifiedDate < documentB.modifiedDate) return 1
      if (documentA.modifiedDate > documentB.modifiedDate) return -1
      return 0
    })
    if (JSON.stringify(documents) == JSON.stringify(documentsCopy)) {
      return documentsCopy.sort((documentA, documentB) => {
        if (documentA.modifiedDate < documentB.modifiedDate) return -1
        if (documentA.modifiedDate > documentB.modifiedDate) return 1
        return 0
      })
    } else {
      return documentsCopy
    }
  }

  const createDocument = async (options: CreateDocumentOptions = {}) => {
    setNewDocumentLoading(true)
    const newDocument = await saveDocumentToDb(user!.uid, options)
    setNewDocumentLoading(false)
    addNewDocumentToDocuments(newDocument)
    return newDocument
  }

  const deleteDocument = async (documentId: string) => {
    removeDocumentFromDocuments(documentId)
    await deleteDocumentInDb(documentId)
  }

  const addNewDocumentToDocuments = (newDocument: Document) => {
    documents.unshift(newDocument)
  }

  const removeDocumentFromDocuments = (documentId: string) => {
    setDocuments((documents) => {
      const documentsCopy: Document[] = JSON.parse(JSON.stringify(documents))
      return documentsCopy.filter((document) => document.id != documentId)
    })
  }

  useEffect(() => {
    const loadDocuments = async () => {
      setIsLoading(true)
      const documents = await getDocumentsFromDb(user!.uid)
      const sortedDocuments = sortDocumentsByDateModified(documents)
      setDocuments(sortedDocuments)
      setIsLoading(false)
    }
    if (user) loadDocuments()
  }, [user, isLoadingUser])

  return (
    <ProtectedPage>
      <Page title="Documents - Inkey">
        <BrowserView>
          <div className="flex flex-col w-full mb-32">
            <div className="flex w-full justify-center bg-gray-50 px-6">
              <div className="flex flex-col w-full max-w-5xl gap-6 py-8">
                <div className="flex w-full items-center">
                  <h2 className="text-2xl text-gray-900">
                    Start a new document
                  </h2>
                </div>
                <div className="flex w-full gap-x-28">
                  <div className="flex flex-col items-center gap-2 font-medium">
                    <button
                      onClick={async () => {
                        const document = await createDocument()
                        window.location.href = `/documents/${document.id}`
                      }}
                      className="flex justify-center items-center text-gray-300 border rounded-md border-gray-300 hover:border-blue-700 hover:text-blue-700 h-40 w-32 bg-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 48 48"
                        strokeWidth="1"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"
                        />
                      </svg>
                    </button>
                    <h3>Blank</h3>
                  </div>
                  <div className="flex flex-col items-center gap-2 font-medium">
                    <Link
                      href={'/documents/new-essay'}
                      className="flex justify-center items-center text-gray-300 border rounded-md border-gray-300 hover:border-blue-700 hover:text-blue-700 h-42 w-32 bg-white"
                    >
                      <Image
                        priority
                        alt="picture of essay"
                        src={essayPicture}
                        className="rounded-md"
                      ></Image>
                    </Link>
                    <h3>Essay</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center px-6">
              <div className="flex flex-col w-full max-w-5xl gap-6 py-8">
                <div className="flex w-full justify-between items-center">
                  <h2 className="text-2xl text-gray-900">Your documents</h2>
                  <div className="flex gap-1 text-gray-700">
                    <button
                      onClick={switchDocumentView}
                      className="p-2 hover:bg-gray-100 rounded-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 48 48"
                        strokeWidth="1"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        {documentView == DocumentView.PANELS ? (
                          <path
                            fill="currentColor"
                            d="M6 38V10h36v28Zm3-19.65h5.3V13H9Zm8.3 0H39V13H17.3Zm0 8.3H39v-5.3H17.3Zm0 8.35H39v-5.35H17.3ZM9 35h5.3v-5.35H9Zm0-8.35h5.3v-5.3H9Z"
                          />
                        ) : (
                          <path
                            fill="currentColor"
                            d="M6 22.5V6h16.5v16.5ZM6 42V25.5h16.5V42Zm19.5-19.5V6H42v16.5Zm0 19.5V25.5H42V42ZM9 19.5h10.5V9H9Zm19.5 0H39V9H28.5Zm0 19.5H39V28.5H28.5ZM9 39h10.5V28.5H9Zm19.5-19.5Zm0 9Zm-9 0Zm0-9Z"
                          />
                        )}
                      </svg>
                    </button>
                    <div
                      onMouseOver={() => setShowSortPanel(true)}
                      onMouseOut={() => setShowSortPanel(false)}
                      className="relative"
                    >
                      <div className="p-2 hover:bg-gray-100 rounded-md ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 48 48"
                          strokeWidth=""
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            fill="currentColor"
                            d="m4 34 8.1-20h3.15l8.05 20h-3.15l-1.9-4.95h-9.2L7.15 34Zm6.05-7.55h7.2l-3.5-9.25h-.2ZM27.4 34v-3.1l11.65-14.3H28.3V14h13.6v3.15L30.35 31.4H42V34ZM19.2 8.8 24 4l4.8 4.8ZM24 44l-4.8-4.8h9.6Z"
                          />
                        </svg>
                      </div>
                      {showSortPanel && (
                        <div className="z-10 absolute right-0 bg-white w-52 flex flex-col border rounded-md text-gray-600">
                          <button
                            onClick={() => {
                              setDocuments((documents) =>
                                sortDocumentsByName(documents),
                              )
                            }}
                            className="flex items-center gap-2 w-full p-2 hover:bg-gray-50"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 48 48"
                              strokeWidth="1"
                              stroke="currentColor"
                              className="h-5 w-5"
                            >
                              <path
                                fill="currentColor"
                                d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z"
                              />
                            </svg>
                            <p>Sort by name</p>
                          </button>
                          <button
                            onClick={() => {
                              setDocuments((documents) =>
                                sortDocumentsByDateModified(documents),
                              )
                            }}
                            className="flex items-center gap-2 w-full p-2 hover:bg-gray-50"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 48 48"
                              strokeWidth="1"
                              stroke="currentColor"
                              className="h-5 w-5"
                            >
                              <path
                                fill="currentColor"
                                d="M39 40H13q-1.2 0-2.1-.9-.9-.9-.9-2.1V5q0-1.2.9-2.1.9-.9 2.1-.9h17.4L42 13.6V37q0 1.2-.9 2.1-.9.9-2.1.9ZM28.9 14.9V5H13v32h26V14.9ZM7 46q-1.2 0-2.1-.9Q4 44.2 4 43V12.05h3V43h24.9v3Zm6-41v9.9V5v32V5Z"
                              />
                            </svg>
                            <p>Sort by date modified</p>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {isLoading ? (
                  <DocumentPanelLoadingState />
                ) : documentView == DocumentView.PANELS ? (
                  <DocumentPanels
                    documents={documents}
                    newDocumentLoading={newDocumentLoading}
                    deleteDocument={deleteDocument}
                    createDocument={createDocument}
                  />
                ) : (
                  <DocumentTable
                    documents={documents}
                    newDocumentLoading={newDocumentLoading}
                    deleteDocument={deleteDocument}
                    createDocument={createDocument}
                  />
                )}
              </div>
            </div>
          </div>
        </BrowserView>
        <MobileView>
          <div className="flex flex-col w-full justify-center items-center pt-24 px-8 gap-8">
            <h1 className="text-3xl font-medium text-center">
              This product is only available on desktop.
            </h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 390 475"
              strokeWidth="2"
              stroke="currentColor"
              className="h-32 w-32 text-blue-700"
            >
              <path
                d="M342.243 134.246C342.243 134.246 341.393 134.86 340.491 134.603C339.694 134.376 339.293 133.779 339.293 133.779C339.293 133.779 314.464 94.8552 298.724 73.9407C289.054 61.0904 258.357 26.9951 258.357 26.9951C258.357 26.9951 247.818 16.8587 250.283 15.686C254.8 13.5373 263.163 16.5246 267.103 18.4226C307.242 37.7572 390 79.0045 390 90.4129C390 105.879 342.243 134.246 342.243 134.246Z"
                fill="currentColor"
              />
              <path
                d="M47.7571 134.246C47.7571 134.246 48.6072 134.86 49.5089 134.603C50.3062 134.376 50.7069 133.779 50.7069 133.779C50.7069 133.779 75.5362 94.8552 91.2757 73.9407C100.946 61.0904 131.643 26.9951 131.643 26.9951C131.643 26.9951 142.182 16.8587 139.717 15.686C135.2 13.5373 126.837 16.5246 122.897 18.4226C82.7581 37.7572 0 79.0045 0 90.4129C0 105.879 47.7571 134.246 47.7571 134.246Z"
                fill="currentColor"
              />
              <path
                d="M59.0376 380.207V399.208L42.2848 406.283C22.7397 414.571 20.1904 416.794 20.1904 425.891C20.1904 436.2 27.3528 442.163 39.614 442.163C45.5625 442.062 48.5974 441.052 69.3565 432.258C87.6875 424.476 93.029 421.747 95.2142 419.018C97.7635 415.683 97.8849 414.874 97.8849 388.494C97.8849 388.494 98.0686 370.491 94.2218 365.687C90.3749 360.883 78.4613 361.306 78.4613 361.306C78.4613 361.306 67.2937 360.883 63.4469 365.687C59.6 370.491 59.0376 380.207 59.0376 380.207Z"
                fill="currentColor"
              />
              <path
                d="M331.173 380.129V399.13L347.926 406.205C367.471 414.493 370.021 416.716 370.021 425.813C370.021 436.122 362.858 442.085 350.597 442.085C344.649 441.984 341.614 440.974 320.855 432.18C302.524 424.398 297.182 421.669 294.997 418.94C292.448 415.605 292.326 414.796 292.326 388.417C292.326 388.417 292.142 370.414 295.989 365.609C299.836 360.805 311.75 361.228 311.75 361.228C311.75 361.228 322.917 360.805 326.764 365.609C330.611 370.414 331.173 380.129 331.173 380.129Z"
                fill="currentColor"
              />
              <path
                d="M136.737 389.816V418.318L118.042 434.085C102.503 447.022 99.1042 450.459 98.0116 453.996C94.0054 466.327 107.723 477.748 122.534 474.413C126.783 473.503 131.153 470.37 149.848 455.007C162.11 444.9 172.914 435.399 173.885 433.883C175.221 431.66 175.585 424.484 175.585 396.184C175.585 396.184 175.012 370.499 171.165 365.695C167.318 360.891 156.161 361.314 156.161 361.314C156.161 361.314 144.237 361.314 140.39 365.695C136.543 370.076 136.737 389.816 136.737 389.816Z"
                fill="currentColor"
              />
              <path
                d="M253.474 389.718V418.22L272.169 433.988C287.708 446.925 291.107 450.361 292.2 453.899C296.206 466.229 282.488 477.65 267.677 474.315C263.428 473.405 259.058 470.272 240.363 454.909C228.102 444.802 217.297 435.301 216.326 433.785C214.991 431.562 214.626 424.386 214.626 396.086C214.626 396.086 215.199 370.401 219.046 365.597C222.893 360.793 234.05 361.216 234.05 361.216C234.05 361.216 245.974 361.216 249.821 365.597C253.668 369.978 253.474 389.718 253.474 389.718Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M184.201 2.12252C177.524 5.45789 154.216 24.9647 143.168 36.3857C79.9831 101.764 41.3722 193.803 31.9168 301.059C30.3043 319.357 37.29 325.72 37.29 325.72C41.1366 329.884 45.7531 332.766 49.9847 334.368L50.0429 334.39C54.3006 336.001 63.5246 339.492 80.1399 339.501L194.762 339.6H309.648C309.648 339.6 329.523 339.655 340.038 334.688L340.135 334.642C345.647 332.038 348.908 330.498 352.732 326.04C356.579 321.557 359.279 314.043 358.041 301.059C357.212 292.365 356.2 283.324 355.129 275.419C340.804 167.677 295.523 76.8142 227.297 18.4961C208.966 2.72893 204.231 0 195.127 0C190.392 0 187.114 0.606438 184.201 2.12252ZM135.606 248.211C135.606 266.784 121.827 281.84 104.831 281.84C87.8343 281.84 74.0559 266.784 74.0559 248.211C74.0559 229.638 87.8343 214.582 104.831 214.582C121.827 214.582 135.606 229.638 135.606 248.211ZM285.628 281.84C302.624 281.84 316.403 266.784 316.403 248.211C316.403 229.638 302.624 214.582 285.628 214.582C268.631 214.582 254.853 229.638 254.853 248.211C254.853 266.784 268.631 281.84 285.628 281.84Z"
                fill="currentColor"
              />
            </svg>
            <div className="flex flex-col gap-2">
              <p className="text-xl">Meanwhile, try this 👇</p>
              <Link
                href="/templates/general-essay"
                className="flex justify-center items-center px-6 py-3 text-xl font-semibold rounded-md text-white bg-blue-700"
              >
                Essay Writer
              </Link>
            </div>
          </div>
        </MobileView>
      </Page>
    </ProtectedPage>
  )
}

export default DocumentsPage

const DocumentPanel = ({
  document,
  createDocument,
  deleteDocument,
}: {
  document: Document
  createDocument: CallableFunction
  deleteDocument: CallableFunction
}) => {
  const [showPanel, setShowPanel] = useState(false)
  const actionsPanelRef = createRef<any>()
  const actionsButtonRef = createRef<any>()

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        actionsPanelRef.current &&
        actionsButtonRef.current &&
        !actionsPanelRef.current.contains(event.target) &&
        !actionsButtonRef.current.contains(event.target)
      ) {
        setShowPanel(false)
      }
    }
    window.document.addEventListener('mouseup', handleClickOutside)
    return () => {
      window.document.removeEventListener('mouseup', handleClickOutside)
    }
  }, [actionsPanelRef])

  return (
    <Link
      href={`/documents/${document.id}`}
      className="border rounded-lg border-gray-300 h-64 w-52 p-4 bg-white shadow-xl hover:border-blue-700 cursor-pointer"
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-3">
          <p className="font-medium text-ellipsis overflow-hidden whitespace-nowrap text-gray-900">
            {document.title}
          </p>
          <p className="text-xs line-clamp-9 break-words text-gray-700">
            {strip(document.content)}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">
            {new Date(document.modifiedDate).toLocaleString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
          </p>
          <div>
            <button
              ref={actionsButtonRef}
              onClick={(e) => {
                e.preventDefault()
                setShowPanel(!showPanel)
              }}
              className="p-1 hover:bg-gray-200 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 48 48"
                strokeWidth="2"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  fill="currentColor"
                  d="M24 40q-1 0-1.7-.7t-.7-1.7q0-1 .7-1.7t1.7-.7q1 0 1.7.7t.7 1.7q0 1-.7 1.7T24 40Zm0-13.6q-1 0-1.7-.7t-.7-1.7q0-1 .7-1.7t1.7-.7q1 0 1.7.7t.7 1.7q0 1-.7 1.7t-1.7.7Zm0-13.6q-1 0-1.7-.7t-.7-1.7q0-1 .7-1.7T24 8q1 0 1.7.7t.7 1.7q0 1-.7 1.7t-1.7.7Z"
                />
              </svg>
            </button>
            {showPanel && (
              <div
                ref={actionsPanelRef}
                className="absolute -translate-x-10 bg-white flex-col border rounded-md text-gray-600"
              >
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setShowPanel(false)
                    deleteDocument(document.id)
                  }}
                  className="flex items-center gap-2 w-full p-2 hover:bg-gray-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 48 48"
                    strokeWidth="1"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fill="currentColor"
                      d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z"
                    />
                  </svg>
                  <p>Delete</p>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setShowPanel(false)
                    createDocument({
                      title: document.title + ' Copy',
                      content: document.content,
                      citations: document.citations,
                      citationStyleId: document.citationStyleId,
                    })
                  }}
                  className="flex items-center gap-2 w-full p-2 hover:bg-gray-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 48 48"
                    strokeWidth="1"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fill="currentColor"
                      d="M39 40H13q-1.2 0-2.1-.9-.9-.9-.9-2.1V5q0-1.2.9-2.1.9-.9 2.1-.9h17.4L42 13.6V37q0 1.2-.9 2.1-.9.9-2.1.9ZM28.9 14.9V5H13v32h26V14.9ZM7 46q-1.2 0-2.1-.9Q4 44.2 4 43V12.05h3V43h24.9v3Zm6-41v9.9V5v32V5Z"
                    />
                  </svg>
                  <p>Duplicate</p>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

const DocumentPanels = ({
  documents,
  newDocumentLoading,
  createDocument,
  deleteDocument,
}: {
  documents: Document[]
  newDocumentLoading: boolean
  deleteDocument: CallableFunction
  createDocument: CallableFunction
}) => {
  return (
    <div className="flex flex-wrap w-full justify-start gap-x-16 gap-y-12">
      {newDocumentLoading && <DocumentPanelLoading />}
      {documents.map((document, index) => {
        return (
          <DocumentPanel
            key={index}
            document={document}
            createDocument={createDocument}
            deleteDocument={deleteDocument}
          />
        )
      })}
    </div>
  )
}

const DocumentTable = ({
  documents,
  newDocumentLoading,
  deleteDocument,
  createDocument,
}: {
  documents: Document[]
  newDocumentLoading: boolean
  deleteDocument: CallableFunction
  createDocument: CallableFunction
}) => {
  return (
    <table className="table-auto w-full border-collapse">
      <thead>
        <tr className="border-b">
          <th className="text-left px-4 py-4 text-gray-500">Title</th>
          <th className="text-left px-4 py-4 text-gray-500">Size</th>
          <th className="text-left px-4 py-4 text-gray-500">Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {newDocumentLoading && <DocumentRowLoading />}
        {documents.map((document, index) => {
          return (
            <DocumentRow
              key={index}
              document={document}
              deleteDocument={deleteDocument}
              createDocument={createDocument}
            />
          )
        })}
      </tbody>
    </table>
  )
}

const DocumentRow = ({
  document,
  createDocument,
  deleteDocument,
}: {
  document: Document
  createDocument: CallableFunction
  deleteDocument: CallableFunction
}) => {
  const [showPanel, setShowPanel] = useState(false)
  const actionsPanelRef = createRef<any>()
  const actionsButtonRef = createRef<any>()

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        actionsPanelRef.current &&
        actionsButtonRef.current &&
        !actionsPanelRef.current.contains(event.target) &&
        !actionsButtonRef.current.contains(event.target)
      ) {
        setShowPanel(false)
      }
    }
    window.document.addEventListener('mouseup', handleClickOutside)
    return () => {
      window.document.removeEventListener('mouseup', handleClickOutside)
    }
  }, [actionsPanelRef])

  return (
    <tr className="border-t">
      <td className="px-4 py-6 text-gray-900 font-medium">
        <Link href={`/documents/${document.id}`} className="hover:underline">
          {document.title}
        </Link>
      </td>
      <td className="whitespace-nowrap px-4 py-6 text-gray-700">
        {roundToTwoDecimals(convertBytesToKilobytes(sizeof(document)))} KB
      </td>
      <td className="whitespace-nowrap px-4 py-6 text-gray-700">
        {new Date(document.modifiedDate).toLocaleString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })}
      </td>
      <td>
        <div>
          <button
            ref={actionsButtonRef}
            onClick={(e) => {
              e.preventDefault()
              setShowPanel(!showPanel)
            }}
            className="p-2 hover:bg-gray-200 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 48 48"
              strokeWidth="2"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                fill="currentColor"
                d="M24 40q-1 0-1.7-.7t-.7-1.7q0-1 .7-1.7t1.7-.7q1 0 1.7.7t.7 1.7q0 1-.7 1.7T24 40Zm0-13.6q-1 0-1.7-.7t-.7-1.7q0-1 .7-1.7t1.7-.7q1 0 1.7.7t.7 1.7q0 1-.7 1.7t-1.7.7Zm0-13.6q-1 0-1.7-.7t-.7-1.7q0-1 .7-1.7T24 8q1 0 1.7.7t.7 1.7q0 1-.7 1.7t-1.7.7Z"
              />
            </svg>
          </button>
          {showPanel && (
            <div
              ref={actionsPanelRef}
              className="z-10 absolute -translate-x-10  bg-white flex-col border rounded-md text-gray-600"
            >
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setShowPanel(false)
                  deleteDocument(document.id)
                }}
                className="flex items-center gap-2 w-full p-2 hover:bg-gray-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 48 48"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fill="currentColor"
                    d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z"
                  />
                </svg>
                <p>Delete</p>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setShowPanel(false)
                  createDocument({
                    title: document.title + ' Copy',
                    content: document.content,
                    citations: document.citations,
                    citationStyleId: document.citationStyleId,
                  })
                }}
                className="flex items-center gap-2 w-full p-2 hover:bg-gray-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 48 48"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fill="currentColor"
                    d="M39 40H13q-1.2 0-2.1-.9-.9-.9-.9-2.1V5q0-1.2.9-2.1.9-.9 2.1-.9h17.4L42 13.6V37q0 1.2-.9 2.1-.9.9-2.1.9ZM28.9 14.9V5H13v32h26V14.9ZM7 46q-1.2 0-2.1-.9Q4 44.2 4 43V12.05h3V43h24.9v3Zm6-41v9.9V5v32V5Z"
                  />
                </svg>
                <p>Duplicate</p>
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  )
}

const DocumentRowLoading = () => {
  return (
    <tr className="border-t animate-pulse">
      <td className="px-4 py-6 text-gray-900 font-medium">
        <div className="rounded h-5 bg-gray-300"></div>
      </td>
      <td className="px-4 py-6 text-gray-700">
        <div className="rounded h-5 bg-gray-300"></div>
      </td>
      <td className="px-4 py-6 text-gray-700">
        <div className="rounded h-5 bg-gray-300"></div>
      </td>
      <td>
        <div className="rounded h-5 bg-gray-300"></div>
      </td>
    </tr>
  )
}

const DocumentPanelLoadingState = () => {
  return (
    <div className="flex flex-wrap w-full justify-start gap-x-16 gap-y-12">
      <DocumentPanelLoading />
      <DocumentPanelLoading />
      <DocumentPanelLoading />
      <DocumentPanelLoading />
    </div>
  )
}

const DocumentPanelLoading = () => {
  return (
    <div className="border rounded-lg border-gray-300 h-64 w-52 p-4 bg-white shadow-xl">
      <div className="animate-pulse flex flex-col justify-between h-full">
        <div className="flex flex-col gap-5">
          <div className="rounded h-5 bg-gray-300"></div>
          <div className="flex flex-col gap-3">
            <div className="rounded h-2 bg-gray-300"></div>
            <div className="rounded h-2 bg-gray-300"></div>
            <div className="rounded h-2 bg-gray-300"></div>
            <div className="rounded h-2 bg-gray-300"></div>
          </div>
        </div>
        <div className="rounded h-2 w-full bg-gray-300"></div>
      </div>
    </div>
  )
}
