import { ChangeEventHandler, useState } from 'react'

const TemplateTextArea = ({
  label,
  placeholder,
  maxLength,
  onChange,
  value,
}: {
  label: string
  placeholder: string
  maxLength: number
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  value: any
}) => {
  const [numberOfCharacters, setNumberOfCharacters] = useState(0)
  return (
    <div>
      <div className="mb-6 last:mb-1">
        <div className="flex flex-col flex-1">
          <div className="flex justify-end items-center">
            <div className="flex-grow mb-1 flex items-center">
              <label className="text-sm font-medium dark:text-gray-300 text-gray-700">
                {label}
              </label>
            </div>
            <div className="flex items-center justify-end px-3 py-2 text-xs text-gray-600">
              <span className="text-xs">
                {numberOfCharacters}/{maxLength}
              </span>
            </div>
          </div>
          <div className="relative flex items-center">
            <textarea
              maxLength={maxLength}
              rows={4}
              placeholder={placeholder}
              className="px-3 py-2 w-full block text-sm text-gray-600 placeholder-gray-400 transition-shadow duration-150 ease-in-out bg-white border border-gray-200 rounded shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500"
              value={value}
              onChange={(e) => {
                onChange(e)
                setNumberOfCharacters(e.target.value.length)
              }}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TemplateTextArea
