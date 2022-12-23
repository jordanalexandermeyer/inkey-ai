import classNames from 'classnames'

const TemplateFilter = ({
  name,
  selected,
  onClick,
}: {
  name: string
  selected: boolean
  onClick: CallableFunction
}) => {
  return (
    <div
      className={classNames(
        'select-none cursor-pointer border inline-flex items-center justify-center px-3.5 py-1 text-sm font-medium rounded-full',
        {
          'border-gray-300 bg-white hover:text-gray-800 text-gray-600 hover:shadow hover:ring-gray-200': !selected,
          'border-blue-500 bg-blue-500 focusRing text-white hover:bg-opacity-100': selected,
        },
      )}
      onClick={() => onClick()}
    >
      {name}
    </div>
  )
}

export default TemplateFilter
