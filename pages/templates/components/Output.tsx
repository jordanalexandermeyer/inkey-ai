const Output = ({ text }: { text: string }) => {
  return (
    <div className="px-6 py-3 border-b border-gray-200 group">
      <div className="w-full mt-2 mb-3 text-base font-medium leading-7 text-gray-800 whitespace-pre-wrap pre">
        {text}
      </div>
    </div>
  )
}

export default Output
