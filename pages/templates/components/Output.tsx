const Output = ({
  text,
  onClick,
}: {
  text: string
  onClick: CallableFunction
}) => {
  return (
    <div className="px-6 py-3 border-b border-gray-200 group">
      <div className="flex justify-start border rounded-lg p-2">
        <button onClick={(e) => onClick()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="currentColor"
            className="w-7 text-gray-500 hover:text-gray-300"
          >
            <path d="M9 43.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.8h3v30.15h23.7v3Zm6-6q-1.2 0-2.1-.9-.9-.9-.9-2.1v-28q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h22v-28H15v28Zm0 0v-28 28Z" />
          </svg>
        </button>
      </div>
      <div className="w-full mt-2 mb-3 text-base font-medium leading-7 text-gray-800 whitespace-pre-wrap pre">
        {text}
      </div>
    </div>
  )
}

export default Output
