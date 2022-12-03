import Link from 'next/link'

const Body = () => {
  return (
    <>
      <div className="lg:ml-72 mt-1 py-12 mb-36">
        <article>
          <div className="mx-auto px-4 sm:px-6 max-w-4xl">
            <div className="relative mb-6 overflow-hidden border border-gray-200 rounded-md">
              <div>
                <div className="relative">
                  <div className="grid">
                    <div className="relative left-0 row-span-full col-span-full transition-all duration-150 transform visible opacity-100">
                      <div className="flex flex-col items-start transition-all py-6 px-6 h-full md:pr-40 bg-purple-700">
                        <div className="mb-2 md:mb-4">
                          <div className="inline-flex px-2 py-1 text-xs font-bold text-white uppercase bg-green-500 rounded-full md:px-3 md-text-sm">
                            Get started
                          </div>
                        </div>
                        <div className="text-lg font-semibold tracking-tight text-white md:text-2xl">
                          Ghostwritten 101: Write a Persuasive Essay 📣
                        </div>
                        <p className="mt-1 mb-4 text-sm text-white text-opacity-80 md:text-lg md:mb-7">
                          The best way to learn how to use Ghostwritten is by
                          trying it out. Click the button below to write an A+
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
            <div className="relative mb-6 overflow-hidden border border-gray-300 rounded-md">
              <div>
                <div className="relative">
                  <div className="grid">
                    <div className="relative left-0 row-span-full col-span-full transition-all duration-150 transform visible opacity-100">
                      <div className="flex flex-col items-start transition-all py-6 px-6 h-full md:pr-40 ">
                        <div className="text-lg font-semibold tracking-tight md:text-2xl">
                          Ghostwritten 102: Using Templates 🎭
                        </div>
                        <p className="mt-1 mb-4 text-sm text-opacity-80 md:text-lg md:mb-7">
                          Each template is a different type of essay that
                          Ghostwritten can write. If there are any types of
                          essays that are missing, email{' '}
                          <i>jordan@ghostwritten.ai</i> to get a new one added!
                        </p>
                        <Link
                          className="flex flex-col w-full items-stretch md:items-start"
                          href={'/templates'}
                        >
                          <button
                            className="font-bold text-white bg-blue-700 hover:bg-opacity-30 px-16 py-2 text-md overflow-hidden ease-in-out focus:outline-none focus:ring-offset-2 transition-all duration-150 relative rounded-lg focusRing space-x-2  ring-opacity-20 border-none focus:ring-0"
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
      </div>
    </>
  )
}

export default Body
