import classNames from 'classnames'

const TemplateFilter = ({
  name,
  selected,
}: {
  name: string
  selected: boolean
}) => {
  return (
    <div
      className={classNames({
        'cursor-pointer border inline-flex items-center justify-center mr-2 mb-2 px-3.5 py-1 text-sm font-medium rounded-full border-gray-300 bg-white hover:text-gray-800 text-gray-600 hover:shadow hover:ring-gray-200': !selected,
        'cursor-pointer border inline-flex items-center justify-center mr-2 mb-2 px-3.5 py-1 text-sm font-medium rounded-full border-blue-400 bg-blue-400 focusRing text-white hover:bg-opacity-100': selected,
      })}
      id="headlessui-radiogroup-option-8"
      role="radio"
      aria-checked="false"
    >
      {name}
    </div>
  )
}

export default TemplateFilter
