import classNames from 'classnames'
import Link from 'next/link'
import { NextRouter } from 'next/router'

const NavbarLink = ({
  router,
  href,
  children,
}: {
  router: NextRouter
  href: string
  children: JSX.Element[]
}) => {
  return (
    <ul className="pb-1 px-3">
      <li>
        <Link
          href="/"
          className={classNames(
            'w-full hover:bg-gray-50 rounded-md group flex items-center justify-between p-2 font-medium',
            {
              'text-gray-600 hover:text-gray-800': router.pathname != href,
              'text-blue-700': router.pathname === href,
            },
          )}
        >
          <span className="flex items-center">
            <svg
              viewBox="0 0 27 27"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className={classNames('mr-2 flex-shrink-0 h-5 w-5', {
                'text-gray-400 group-hover:text-gray-600':
                  router.pathname != href,
              })}
            >
              {children}
            </svg>
            Dashboard
          </span>
        </Link>
      </li>
    </ul>
  )
}

export default NavbarLink
