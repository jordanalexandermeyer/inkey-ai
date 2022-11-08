import Link from 'next/link'

const DocumentsBody = () => {
  return (
    <div className="lg:ml-72 mt-1 py-6">
      <article>
        <div className="mx-auto px-4 sm:px-6 max-w-9xl">
          <div className="flex items-start">
            <div className="flex-grow">
              <h2 className="mb-6 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                <Link href="/documents">Documents</Link>
              </h2>
              <div className="flex text-sm text-gray-500 mb-6 font-semibold cursor-pointer">
                <div className="text-blue-700 border-b border-blue-700 mr-4">
                  <Link href="/documents">Documents</Link>
                </div>
                <div className="text-gray-500 mr-4">
                  <Link href="/documents/trash">Trash</Link>
                </div>
              </div>
              <div className="flex items-center invisible">
                <span className="w-24 font-medium">0 Selected</span>
                <button className="relative transition-all duration-150 before:transition-all before:duration-150 before:absolute before:inset-0 text-gray-500 hover:text-gray-600 p-2 flex text-xs font-medium items-center before:bg-gray-100 before:rounded-lg before:scale-50 before:opacity-0 hover:before:scale-100 hover:before:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="relative w-4 h-4 opacity-70"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                    ></path>
                  </svg>
                </button>
                <div className="relative inline-block text-left">
                  <button className="justify-center w-full relative transition-all duration-150 before:transition-all before:duration-150 before:absolute before:inset-0 text-gray-500 hover:text-gray-600 p-2 flex text-xs font-medium items-center before:bg-gray-100 before:rounded-lg before:scale-50 before:opacity-0 hover:before:scale-100 hover:before:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="relative w-4 h-4 opacity-70"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div>
                  <button className="relative transition-all duration-150 before:transition-all before:duration-150 before:absolute before:inset-0 text-gray-500 hover:text-gray-600 p-2 flex text-xs font-medium items-center before:bg-gray-100 before:rounded-lg before:scale-50 before:opacity-0 hover:before:scale-100 hover:before:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="relative w-4 h-4 opacity-70"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex flex-col flex-1">
                <div className="relative flex items-center">
                  <div className="absolute inset-y-0 left-0 flex pointer-events-none">
                    <kbd className="inline-flex items-center px-3 font-sans text-sm font-medium text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-4 h-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                    </kbd>
                  </div>
                  <input
                    id="-NGIX9FdwqGaN2LbmYh3"
                    autoComplete="off"
                    className="border focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 block w-full py-2 pr-3 text-gray-700 placeholder-gray-400 transition-shadow duration-150 ease-in-out bg-white border-gray-200 rounded-md shadow-sm outline-none resize-none focus:outline-none focus:ring-blue-700 focus:border-blue-700 text-sm pl-8"
                    placeholder="Search documents"
                    type="search"
                    value=""
                  />
                  <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                    <kbd className="hidden sm:inline-flex items-center px-2 font-sans text-sm font-medium text-gray-400 border border-gray-200 rounded">
                      /
                    </kbd>
                  </div>
                </div>
              </div>
              <Link
                id="newDoc"
                aria-label="newDoc"
                className="inline-flex items-center overflow-hidden ease-in-out outline-none focus:outline-none focus:ring-2 focus:ring-offset-2inline-flex justify-center transition-all duration-150 relative font-medium rounded-lg focusRing text-white bg-gradient-to-r from-purple-400 to-blue-400 shadow-sm hover:from-purple-300 hover:to-blue-300 selectionRing active:from-purple-500 active:to-blue-500 px-4 py-2 text-sm ml-2"
                href="/documents/new"
              >
                <span>New document</span>
              </Link>
            </div>
          </div>
          <table
            role="table"
            className="min-w-full text-left divide-y divide-gray-200 table-fixed w-full"
          >
            <thead>
              <tr role="row">
                <th scope="col" className="relative px-4 w-3">
                  <input
                    type="checkbox"
                    className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                  />
                </th>
                <th
                  colSpan={1}
                  role="columnheader"
                  className="px-6 py-2 text-sm font-normal text-left text-gray-600 last:text-right"
                  style={{ width: '60%' }}
                >
                  <span>Name</span>
                </th>
                <th
                  colSpan={1}
                  role="columnheader"
                  className="px-6 py-2 text-sm font-normal text-left text-gray-600 last:text-right"
                  style={{ width: 'auto' }}
                >
                  <span>Created by</span>
                </th>
                <th
                  colSpan={1}
                  role="columnheader"
                  className="px-6 py-2 text-sm font-normal text-left text-gray-600 last:text-right"
                  style={{ width: 'auto' }}
                >
                  <span>Modified</span>
                </th>
              </tr>
            </thead>
            <tbody
              role="rowgroup"
              className="bg-white divide-y divide-gray-200"
            >
              <tr role="row" className="cursor-pointer hover:bg-gray-50">
                <td className="relative px-4 w-3">
                  <div className="w-4 h-4">
                    <input
                      type="checkbox"
                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6 invisible"
                      value="fe1ec155-d398-4b8c-bf8b-8cb1621241fb"
                    />
                  </div>
                </td>
                <td
                  role="cell"
                  className="px-6 py-2 whitespace-nowrap font-medium text-sm text-gray-800 truncate max-w-xl last:text-right"
                >
                  Untitled
                </td>
                <td
                  role="cell"
                  className="px-6 py-2 whitespace-nowrap text-gray-600 text-xs truncate max-w-xl last:text-right"
                >
                  me
                </td>
                <td
                  role="cell"
                  className="px-6 py-2 whitespace-nowrap text-gray-600 text-xs truncate max-w-xl last:text-right"
                >
                  Nov 06, 2022
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-8 flex justify-between items-center">
            <span className="leading-5 text-neutral-500">1 — 1 of 1</span>
            <div className="flex items-center flex-initial space-x-2">
              <button
                disabled
                className="inline-flex items-center overflow-hidden ease-in-out outline-none focus:outline-none focus:ring-2 focus:ring-offset-2inline-flex justify-center transition-all duration-150 relative font-medium rounded-lg shadow-sm focusRing text-gray-400 bg-gray-100 cursor-not-allowed opacity-75 px-5 py-2 text-base leading-6"
                type="button"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  ></path>
                </svg>
              </button>
              <button
                disabled
                className="inline-flex items-center overflow-hidden ease-in-out outline-none focus:outline-none focus:ring-2 focus:ring-offset-2inline-flex justify-center transition-all duration-150 relative font-medium rounded-lg shadow-sm focusRing text-gray-400 bg-gray-100 cursor-not-allowed opacity-75 px-5 py-2 text-base leading-6"
                type="button"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="mb-32 lg:mb-16"></div>
        </div>
      </article>
    </div>
  )
}

export default DocumentsBody
