import Link from 'next/link'
import { ReactElement } from 'react'
import { EventName, track } from 'utils/segment'

const TemplateCard = ({
  title,
  description,
  icon,
  svgIcon,
  href,
  newCard,
}: {
  title: string
  description: string
  icon?: string
  svgIcon?: ReactElement
  href: string
  newCard?: boolean
}) => {
  return (
    <div id="template-card">
      <Link
        href={href}
        onClick={() => track(EventName.TEMPLATE_PANEL_CLICKED, { title })}
      >
        <div className="relative p-6 transition-all h-full focus:ring-gray-400 focus:shadow-xl duration-150 rounded-2xl shadow-sm hover:shadow-lg hover:ring-gray-300 hover:ring-2 ring-1 ring-gray-200 group flex flex-col bg-white">
          <div className="flex flex-col justify-center items-center">
            {newCard && (
              <div className="absolute right-4 top-4 text-sm font-bold text-white uppercase bg-green-400 rounded-full px-3 py-1">
                New
              </div>
            )}
            <div className="flex items-center justify-center w-16 h-16 text-2xl rounded-full text-gray-600 mb-6 bg-gray-100/75">
              {icon && <span className="text-3xl">{icon}</span>}
              {svgIcon && svgIcon}
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-700">
              {title}
            </h3>
            <p className="text-gray-500 text-center">{description}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default TemplateCard
