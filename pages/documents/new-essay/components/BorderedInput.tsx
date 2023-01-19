import { mergeRefs } from '@/utils/helpers'
import { useEffect, useRef } from 'react'
import { ChangeEventHandler, KeyboardEventHandler } from 'react'

const BorderedInput = ({
  value,
  onChange,
  placeholder,
  onKeyDown,
  isLoading,
  reference,
}: {
  value: string
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  placeholder?: string
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>
  isLoading?: boolean
  reference?: any
}) => {
  const textAreaRef = useRef<any>()

  useEffect(() => {
    const target = textAreaRef.current as HTMLTextAreaElement
    if (target) {
      target.style.height = ''
      target.style.height = target.scrollHeight + 'px'
    }
  }, [value])

  return (
    <div className="flex flex-col w-full p-2 border border-gray-300 rounded-lg bg-white">
      {isLoading ? (
        <>
          <div className="animate-pulse h-4 m-3 bg-gray-300 rounded-lg"></div>
        </>
      ) : (
        <textarea
          ref={reference ? mergeRefs(textAreaRef, reference) : textAreaRef}
          value={value}
          onChange={onChange}
          className="bg-transparent h-9 p-1 w-full overflow-hidden text-lg border-0 resize-none focus:ring-0 focus-visible:ring-0 placeholder-gray-300"
          placeholder={placeholder}
          onKeyDown={onKeyDown}
        ></textarea>
      )}
    </div>
  )
}

export default BorderedInput
