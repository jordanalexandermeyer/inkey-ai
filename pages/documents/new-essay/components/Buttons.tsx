import classNames from 'classnames'
import { MouseEventHandler } from 'react'

export const NextButton = ({
  onClick,
  disabled,
  isLoading,
  reference,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  isLoading?: boolean
  reference?: any
}) => {
  return (
    <button
      ref={reference}
      disabled={disabled}
      onClick={onClick}
      className="flex items-center justify-center bg-blue-500 text-white rounded-lg transition-colors hover:bg-blue-600 active:bg-blue-300 disabled:bg-blue-300 disabled:hover:cursor-not-allowed"
    >
      <div
        className={classNames(
          'flex items-center justify-center gap-2 py-3 px-4',
          {
            invisible: isLoading,
          },
        )}
      >
        <span className="text-lg font-semibold">Next</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          stroke="currentColor"
          strokeWidth="4"
          className="h-4 w-4"
        >
          <path
            fill="currentColor"
            d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z"
          />
        </svg>
      </div>
      <svg
        className={classNames('absolute inline w-6 h-6 text-white', {
          'animate-spin visible': isLoading,
          invisible: !isLoading,
        })}
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
    </button>
  )
}

export const RegenerateButton = ({
  onClick,
  disabled,
  isLoading,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  isLoading?: boolean
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg transition-colors hover:from-blue-600 hover:to-purple-600 active:from-blue-300 active:to-purple-300 disabled:from-blue-300 disabled:to-purple-300 disabled:hover:cursor-not-allowed"
    >
      <div
        className={classNames(
          'flex items-center justify-center gap-2 py-3 px-4',
          {
            invisible: isLoading,
          },
        )}
      >
        <span className="text-lg font-semibold">Regenerate</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -5 48 48"
          stroke="currentColor"
          strokeWidth="1"
          className="h-5 w-5"
        >
          <path
            fill="currentColor"
            d="M17.6 39q-5.95-2-9.8-7.15Q3.95 26.7 3.95 20q0-1.6.25-3.2t.8-3.15L1.8 15.5.3 12.95l8.65-5 5 8.6-2.6 1.5-2.9-4.95q-.7 1.65-1.075 3.4T7 20.05q0 5.8 3.425 10.25t8.725 6.05ZM32 13v-3h5.75q-2.4-3.3-6.025-5.15Q28.1 3 24 3q-3.45 0-6.425 1.25Q14.6 5.5 12.3 7.7L10.75 5q2.7-2.35 6.05-3.675Q20.15 0 23.95 0q4.4 0 8.3 1.775Q36.15 3.55 39 6.8V3h3v10Zm-2.25 31-8.65-5 5-8.6 2.55 1.5-2.9 5.05q6.5-.65 10.875-5.475Q41 26.65 41 20.05 41 19 40.875 18q-.125-1-.375-2h3.1q.2 1 .3 2 .1 1 .1 2 0 7.15-4.475 12.65T28.1 39.6l3.15 1.85Z"
          />
        </svg>
      </div>
      <svg
        className={classNames('absolute inline w-6 h-6 text-white', {
          'animate-spin visible': isLoading,
          invisible: !isLoading,
        })}
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
    </button>
  )
}

export const BackButton = ({
  onClick,
  disabled,
  reference,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  reference?: any
}) => {
  return (
    <button
      ref={reference}
      disabled={disabled}
      onClick={onClick}
      className="flex items-center justify-center bg-white text-gray-700 rounded-lg transition-colors border border-gray-300 active:bg-gray-100 disabled:hover:cursor-not-allowed"
    >
      <div className="flex items-center justify-center gap-1 py-3 px-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          stroke="currentColor"
          strokeWidth="4"
          className="h-4 w-4"
        >
          <path
            fill="currentColor"
            d="M20 44 0 24 20 4l2.8 2.85L5.65 24 22.8 41.15Z"
          />
        </svg>
        <span className="text-lg font-semibold">Back</span>
      </div>
    </button>
  )
}
