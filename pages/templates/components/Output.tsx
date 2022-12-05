import {
  GrammarlyEditorPlugin,
  GrammarlyButton,
} from '@grammarly/editor-sdk-react'
import { useEffect, useRef } from 'react'

const Output = ({
  toast,
  text,
  textEditorReference,
}: {
  text: string
  toast: any
  textEditorReference: any
}) => {
  return (
    <div className="px-6 py-3">
      <div className="sticky top-14 z-10 flex justify-start border rounded-lg p-2 bg-white">
        <button
          onClick={(e) => {
            navigator.clipboard.writeText(
              textEditorReference.current.textContent,
            )
            toast.success('Copied to clipboard!')
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="currentColor"
            className="w-7 text-gray-500 hover:text-gray-300 mr-3"
          >
            <path d="M9 43.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.8h3v30.15h23.7v3Zm6-6q-1.2 0-2.1-.9-.9-.9-.9-2.1v-28q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h22v-28H15v28Zm0 0v-28 28Z" />
          </svg>
        </button>
        <GrammarlyButton />
      </div>
      <GrammarlyEditorPlugin
        clientId={process.env.NEXT_PUBLIC_GRAMMARLY_API_KEY}
      >
        <div
          contentEditable="true"
          suppressContentEditableWarning={true}
          className="w-full mt-2 mb-3 text-base font-medium leading-7 text-gray-800 whitespace-pre-wrap pre focus:outline-none"
          ref={textEditorReference}
        >
          {text}
        </div>
      </GrammarlyEditorPlugin>
    </div>
  )
}

export default Output
