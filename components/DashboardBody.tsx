const Body = () => {
  return (
    <div className="lg:ml-72 mt-1 py-12 mb-36">
      <article>
        <div className="mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="relative mb-6 overflow-hidden border border-gray-200 rounded-md">
            <div>
              <div className="relative">
                <div className="grid">
                  <div className="relative left-0 row-span-full col-span-full transition-all duration-150 transform visible opacity-100">
                    <div className="flex flex-col items-start transition-all py-6 pl-6 pr-32 h-full md:pr-40 bg-gradient-to-r from-blue-500 to-green-400">
                      <div className="mb-2 md:mb-4">
                        <div className="inline-flex px-2 py-1 text-xs font-bold text-white uppercase bg-green-500 rounded-full md:px-3 md-text-sm">
                          Education
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold tracking-tight text-white md:text-2xl">
                        Jasper 101: Learn the Jasper Basics
                      </h3>
                      <p className="mt-1 mb-4 text-sm text-white text-opacity-70 md:text-lg md:mb-7">
                        The purpose of Jasper 101 is to build a solid foundation
                        and understanding of how Jasper works so you can start
                        using Jasper in the best way possible for your writing
                        needs. Earn 50K credits for attendance.
                      </p>
                      <button
                        className="inline-flex items-center overflow-hidden ease-in-out focus:outline-none focus:ring-offset-2inline-flex justify-center transition-all duration-150 relative rounded-lg focusRing space-x-2 font-bold text-white bg-white shadow-sm outline-none hover:bg-opacity-30 bg-opacity-20 ring-opacity-20 border-none focus:ring-0 px-4 py-2 text-sm"
                        type="button"
                      >
                        Sign Up Now
                      </button>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-full py-6 pr-6 md:w-40">
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
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="items-center p-6 mb-6 border border-blue-200 rounded bg-blue-50 md:flex md:items-center md:space-x-6">
            <div className="flex-grow mb-3 font-medium tracking-tight text-blue-500 md:mb-0">
              <p className="text-center md:text-left">
                Upgrade your plan before your trial ends in 5 days to get 5,000
                bonus credits
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
          </div>
          <div className=" p-6 mb-6 text-sm text-gray-400 border border-gray-200 rounded-md">
            <div className="mb-3 md:flex md:items-center md:space-x-3">
              <div className="mb-3 text-2xl font-bold tracking-tight text-gray-800 md:mb-0">
                Refer your friends
              </div>
              <div className="inline-block px-3 py-1 text-sm font-medium leading-4 text-green-600 border border-green-200 rounded-full bg-green-50">
                Give 10k credits → Get 10k credits
              </div>
            </div>
            <div className="text-base text-gray-500 md:my-0 md:leading-7">
              For each new account that signs up with your link you and your
              friend each get 10k free credits. Credits are applied 7 days after
              your referrals start their subscription.
            </div>
            <button
              className="inline-flex items-center overflow-hidden ease-in-out outline-none focus:outline-none focus:ring-2 focus:ring-offset-2inline-flex justify-center transition-all duration-150 relative font-medium rounded-lg focusRing text-gray-700 bg-white border border-black-300 shadow-sm hover:text-gray-500 selectionRing active:bg-gray-50 active:text-gray-800 px-5 py-2 text-base leading-6 mt-3"
              type="button"
            >
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4 opacity-60"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  ></path>
                </svg>
                <div>Copy share link</div>
              </div>
            </button>
          </div>
          <div className=" p-6 mb-6 text-sm text-gray-400 border border-gray-200 rounded-md">
            <div className="mb-3 text-2xl font-bold tracking-tight text-gray-800">
              Recent documents
            </div>
            <table
              role="table"
              className="min-w-full text-left divide-y divide-gray-200 table-fixed w-full mb-6"
            >
              <thead>
                <tr role="row">
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
            <div className="mb-32 lg:mb-16"></div>
            <div className="text-center">
              <button
                className="inline-flex items-center overflow-hidden ease-in-out outline-none focus:outline-none focus:ring-2 focus:ring-offset-2inline-flex justify-center transition-all duration-150 relative font-medium rounded-lg focusRing text-gray-700 bg-white border border-black-300 shadow-sm hover:text-gray-500 selectionRing active:bg-gray-50 active:text-gray-800 px-3 py-2 text-sm leading-3"
                type="button"
              >
                See all documents
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default Body
