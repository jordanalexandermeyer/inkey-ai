import { EventName, track } from 'utils/segment'

const Output = ({
  toast,
  text,
  bottomElementRef,
  textElementRef,
}: {
  text: string
  toast: any
  bottomElementRef: any
  textElementRef: any
}) => {
  return (
    <div className="px-6 py-3">
      <div
        className="w-full mt-2 mb-3 leading-7 text-gray-800 whitespace-pre-wrap pre focus:outline-none"
        ref={textElementRef}
      >
        {text}
      </div>
      <div ref={bottomElementRef}></div>
    </div>
  )
}

export default Output
