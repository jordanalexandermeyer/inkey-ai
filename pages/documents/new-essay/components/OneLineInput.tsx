import { createRef, useEffect } from 'react'
import { ChangeEventHandler, KeyboardEventHandler } from 'react'

const OneLineInput = ({
  value,
  onChange,
  placeholder,
  onKeyDown,
  isLoading,
  autoFocus,
  focus,
}: {
  value: string
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  placeholder?: string
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>
  isLoading?: boolean
  autoFocus?: boolean
  focus?: boolean
}) => {
  const textAreaRef = createRef<any>()

  useEffect(() => {
    const target = textAreaRef.current as HTMLTextAreaElement
    if (target) {
      target.style.height = ''
      target.style.height = target.scrollHeight + 'px'
    }
  }, [value])

  useEffect(() => {
    if (focus) textAreaRef.current.focus()
  }, [focus])

  return (
    <div className="flex border-b border-b-black">
      {isLoading ? (
        <div className="animate-pulse h-3 m-3 w-full bg-gray-500 rounded-lg"></div>
      ) : (
        <textarea
          ref={textAreaRef}
          autoFocus={autoFocus}
          value={value}
          onChange={onChange}
          className="h-9 p-1 w-full overflow-hidden text-xl border-0 resize-none focus:ring-0 focus-visible:ring-0 placeholder-gray-300"
          placeholder={placeholder}
          onKeyDown={onKeyDown}
        ></textarea>
      )}
    </div>
  )
}

export default OneLineInput
