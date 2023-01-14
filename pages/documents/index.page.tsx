import Page from 'components/Page'
import ProtectedPage from 'components/ProtectedPage'
import { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
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
import { strip } from '@/utils/helpers'

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
  const sortPanelRef = createRef<any>()

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        sortPanelRef.current &&
        !sortPanelRef.current.contains(event.target)
      ) {
        setShowSortPanel(false)
      }
    }
    window.document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [sortPanelRef])

  const switchDocumentView = () => {
    if (documentView == DocumentView.PANELS) setDocumentView(DocumentView.LIST)
    if (documentView == DocumentView.LIST) setDocumentView(DocumentView.PANELS)
  }

  const sortDocumentsByName = () => {
    setDocuments((documents) => {
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
        return documentsCopy.sort((documentA, documentB) => {
          if (documentA.title < documentB.title) return -1
          if (documentA.title > documentB.title) return 1
          return 0
        })
      }
    })
  }

  const sortDocumentsByDateModified = () => {
    setDocuments((documents) => {
      const documentsCopy: Document[] = JSON.parse(JSON.stringify(documents))
      documentsCopy.sort((documentA, documentB) => {
        if (documentA.modifiedDate < documentB.modifiedDate) return -1
        if (documentA.modifiedDate > documentB.modifiedDate) return 1
        return 0
      })
      if (JSON.stringify(documents) == JSON.stringify(documentsCopy)) {
        return documentsCopy.sort((documentA, documentB) => {
          if (documentA.modifiedDate < documentB.modifiedDate) return 1
          if (documentA.modifiedDate > documentB.modifiedDate) return -1
          return 0
        })
      } else {
        return documentsCopy.sort((documentA, documentB) => {
          if (documentA.modifiedDate < documentB.modifiedDate) return -1
          if (documentA.modifiedDate > documentB.modifiedDate) return 1
          return 0
        })
      }
    })
  }

  const createDocument = async (options: CreateDocumentOptions = {}) => {
    setNewDocumentLoading(true)
    const newDocument = await saveDocumentToDb(user!.uid, options)
    setNewDocumentLoading(false)
    addNewDocumentToDocuments(newDocument)
  }

  const deleteDocument = async (documentId: string) => {
    removeDocumentFromDocuments(documentId)
    await deleteDocumentInDb(documentId)
  }

  const addNewDocumentToDocuments = (newDocument: Document) => {
    documents.push(newDocument)
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
      setDocuments(documents)
      setIsLoading(false)
    }
    if (user) loadDocuments()
  }, [user, isLoadingUser])

  return (
    <ProtectedPage>
      <Page title="Documents - Inkey">
        <div className="flex flex-col w-full mb-32">
          <div className="flex w-full justify-center bg-gray-50 px-6">
            <div className="flex flex-col w-full max-w-5xl gap-6 py-8">
              <div className="flex w-full items-center">
                <h2 className="text-2xl text-gray-900">Start a new document</h2>
              </div>
              <div className="flex w-full gap-x-28">
                <div className="flex flex-col items-center gap-2 font-medium">
                  <button
                    onClick={() => createDocument()}
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
                  <button className="flex justify-center items-center text-gray-300 border rounded-md border-gray-300 hover:border-blue-700 hover:text-blue-700 h-42 w-32 bg-white">
                    <Image
                      priority
                      alt="picture of essay"
                      src={essayPicture}
                      className="rounded-md"
                    ></Image>
                  </button>
                  <h3>Essay</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center px-6">
            <div className="flex flex-col w-full max-w-5xl gap-6 py-8">
              <div className="flex w-full justify-between items-center">
                <h2 className="text-2xl text-gray-900">Recent documents</h2>
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
                      <div
                        ref={sortPanelRef}
                        className="z-10 absolute right-0 bg-white w-52 flex flex-col border rounded-md text-gray-600"
                      >
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            setShowSortPanel(false)
                            sortDocumentsByName()
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
                          onClick={(e) => {
                            e.preventDefault()
                            setShowSortPanel(false)
                            sortDocumentsByDateModified()
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
  const actionsRef = createRef<any>()

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (actionsRef.current && !actionsRef.current.contains(event.target)) {
        setShowPanel(false)
      }
    }
    window.document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [actionsRef])

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
                ref={actionsRef}
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
                      numberOfWords: document.numberOfWords,
                      citations: document.citations,
                      totalStorageUsed: document.totalStorageUsed,
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
          <th className="text-left px-4 py-4 text-gray-900">Title</th>
          <th className="text-left px-4 py-4 text-gray-900">Size</th>
          <th className="text-left px-4 py-4 text-gray-900">Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
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
        {newDocumentLoading && <DocumentRowLoading />}
      </tbody>
    </table>
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
      {newDocumentLoading && <DocumentPanelLoading />}
    </div>
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
  const actionsRef = createRef<any>()

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (actionsRef.current && !actionsRef.current.contains(event.target)) {
        setShowPanel(false)
      }
    }
    window.document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [actionsRef])

  return (
    <tr className="border-t">
      <td className="whitespace-nowrap px-4 py-6 text-gray-900 font-medium">
        <Link href={`/documents/${document.id}`} className="hover:underline">
          {document.title}
        </Link>
      </td>
      <td className="whitespace-nowrap px-4 py-6 text-gray-700">
        {document.totalStorageUsed} KB
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
              ref={actionsRef}
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
                    numberOfWords: document.numberOfWords,
                    citations: document.citations,
                    totalStorageUsed: document.totalStorageUsed,
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
