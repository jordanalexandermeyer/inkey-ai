import { useEffect, useRef } from 'react'
import { ChangeEventHandler, KeyboardEventHandler } from 'react'

const BorderedInput = ({
  value,
  onChange,
  placeholder,
  onKeyDown,
  isLoading,
}: {
  value: string
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  placeholder?: string
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>
  isLoading?: boolean
}) => {
  const textAreaRef = useRef<any>()

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && value.trim() == '') {
      event.preventDefault()
    } else if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      // move to next step here
    }
  }

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
          <div className="animate-pulse h-2 m-3 bg-gray-500 rounded-lg"></div>
          <div className="animate-pulse h-2 m-3 bg-gray-500 rounded-lg"></div>
        </>
      ) : (
        <textarea
          ref={textAreaRef}
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
