import classNames from 'classnames'
import { Feature } from 'types'

export const IncludedFeature = ({
  text,
  color,
}: {
  text: string
  color: string
}) => {
  return (
    <li className="flex space-x-3">
      <svg
        className={classNames('flex-shrink-0 w-5 h-5', {
          'text-green-500': color == 'green',
          'text-gray-400': color == 'gray',
        })}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Check icon</title>
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="text-base text-left font-normal leading-tight text-gray-500">
        {text}
      </span>
    </li>
  )
}

export const ExcludedFeature = ({
  text,
  color,
}: {
  text: string
  color: string
}) => {
  return (
    <li className="flex space-x-3 line-through decoration-gray-500">
      <svg
        className={`flex-shrink-0 w-5 h-5 text-${color}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Check icon</title>
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="text-base text-left font-normal leading-tight text-gray-500">
        {text}
      </span>
    </li>
  )
}

const FeatureList = ({ features }: { features: Array<Feature> }) => {
  return (
    <ul role="list" className="space-y-5">
      {features.map((feature, index) => {
        if (feature.included)
          return (
            <IncludedFeature
              key={index}
              text={feature.text}
              color={feature.color}
            />
          )
        else
          return (
            <ExcludedFeature
              key={index}
              text={feature.text}
              color={feature.color}
            />
          )
      })}
    </ul>
  )
}

export default FeatureList
