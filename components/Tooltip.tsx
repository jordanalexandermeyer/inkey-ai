import React, { memo } from 'react'

export type TooltipProps = {
  children: React.ReactNode
  disabled?: boolean
  contents: React.ReactNode
}

const Tooltip: React.FC<TooltipProps> = memo((props) => {
  return (
    <div className="z-40 group relative flex">
      {!props.disabled && (
        <span className="pointer-events-none absolute top-[120%] left-0 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-white opacity-0 transition group-hover:opacity-100">
          {props.contents}
        </span>
      )}

      {props.children}
    </div>
  )
})

Tooltip.displayName = 'Tooltip'

export default Tooltip
