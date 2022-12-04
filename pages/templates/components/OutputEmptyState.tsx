const OutputEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center my-20 py-40 xl:inset-0 xl:absolute xl:mt-0">
      <div className="max-w-lg relative py-3 pl-8 space-x-2 text-xs text-gray-400 rounded-md ring-1 ring-gray-200 mx-3">
        <div className="absolute inset-y-0 left-0 flex items-center justify-center w-8 bg-gray-100 rounded-l-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="block w-4 h-4 text-gray-500 "
          >
            <path
              fillRule="evenodd"
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="flex-grow pl-2 pr-4 text-left">
          <div className="mb-1 text-sm font-medium text-gray-500">
            Answer the prompts
          </div>
          <div>
            Get the best results by trying multiple inputs and of varying
            lengths.
          </div>
        </div>
      </div>
    </div>
  )
}

export default OutputEmptyState
