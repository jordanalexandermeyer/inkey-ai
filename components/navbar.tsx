import classNames from 'classnames'
import { NextRouter } from 'next/router'

const Navbar = ({ router }: { router: NextRouter }) => {
  return (
    <div className="flex flex-col flex-grow bg-white border-r border-gray-200 overflow-y-auto w-full sm:w-72 pt-7">
      <div className="flex-shrink-0 flex flex-col items-start justify-center px-5 space-y-6">
        <a href="/" className="text-2xl font-medium flex flex-row items-center">
          <span className="text-4xl mr-2">👻✍️</span>Ghostwritten
        </a>
      </div>
      <nav className="my-5 flex-1 flex flex-col relative space-y-1 border-t pt-3">
        <ul className="pb-1 px-3">
          <li>
            <a
              href="/"
              className={classNames(
                'w-full hover:bg-gray-50 rounded-md group flex items-center justify-between p-2 font-medium',
                {
                  'text-gray-600 hover:text-gray-800': router.pathname != '/',
                  'text-blue-700': router.pathname === '/',
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
                      router.pathname != '/',
                  })}
                >
                  <path
                    d="M23 12.1663V19C23 20.6569 21.6569 22 20 22H7C5.34315 22 4 20.6569 4 19V12.1663C4 11.2437 4.42452 10.3724 5.15108 9.80377L11.6511 4.71682C12.7372 3.86684 14.2628 3.86684 15.3489 4.71682L21.8489 9.80377C22.5755 10.3724 23 11.2437 23 12.1663Z"
                    stroke="currentColor"
                    stroke-width="2"
                  ></path>
                  <path
                    d="M17 17.2747C17 17.704 16.7154 18.0813 16.3026 18.1992L14.4615 18.7253C13.8331 18.9048 13.1669 18.9048 12.5385 18.7253L10.6974 18.1992C10.2846 18.0813 10 17.704 10 17.2747V17.2747C10 16.6359 10.6114 16.1747 11.2257 16.3502L12.8794 16.8227C13.285 16.9386 13.715 16.9386 14.1206 16.8227L15.7743 16.3502C16.3886 16.1747 17 16.6359 17 17.2747V17.2747Z"
                    fill="white"
                  ></path>
                </svg>
                Dashboard
              </span>
            </a>
          </li>
        </ul>
        <ul className="pb-1 px-3">
          <li>
            <a
              href="/templates"
              className={classNames(
                'w-full hover:bg-gray-50 rounded-md group flex items-center justify-between p-2 font-medium',
                {
                  'text-gray-600 hover:text-gray-800':
                    router.pathname != '/templates',
                  'text-blue-700': router.pathname === '/templates',
                },
              )}
            >
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className={classNames('mr-2 flex-shrink-0 h-5 w-5', {
                    'text-gray-400 group-hover:text-gray-600':
                      router.pathname != '/templates',
                  })}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  ></path>
                </svg>
                Templates
              </span>
            </a>
          </li>
        </ul>
        <ul className="pb-1 px-3">
          <li>
            <a
              href="/documents"
              className={classNames(
                'w-full hover:bg-gray-50 rounded-md group flex items-center justify-between p-2 font-medium',
                {
                  'text-gray-600 hover:text-gray-800':
                    router.pathname != '/documents',
                  'text-blue-700': router.pathname === '/documents',
                },
              )}
            >
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className={classNames('mr-2 flex-shrink-0 h-5 w-5', {
                    'text-gray-400 group-hover:text-gray-600':
                      router.pathname != '/documents',
                  })}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  ></path>
                </svg>
                Documents
              </span>
            </a>
          </li>
        </ul>
        <ul className="pb-1 px-3">
          <li>
            <a
              href="/settings"
              className={classNames(
                'w-full hover:bg-gray-50 rounded-md group flex items-center justify-between p-2 font-medium',
                {
                  'text-gray-600 hover:text-gray-800':
                    router.pathname != '/settings',
                  'text-blue-700': router.pathname === '/settings',
                },
              )}
            >
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className={classNames('mr-2 flex-shrink-0 h-5 w-5', {
                    'text-gray-400 group-hover:text-gray-600':
                      router.pathname != '/settings',
                  })}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                Settings
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
