import Navbar from './Navbar'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import classnames from 'classnames'

const Navigation = () => {
  const [showNavbar, setShowNavbar] = useState(false)
  const [opacity, setOpacity] = useState(0)
  const [showBackdrop, setShowBackdrop] = useState(false)

  const removeBackdrop = () => {
    setOpacity(0)
    setTimeout(() => setShowBackdrop(false), 150)
  }

  const addBackdrop = () => {
    setShowBackdrop(true)
    // need to wait a bit for the above to render the element so the transition occurs
    setTimeout(() => setOpacity(50), 10)
  }

  const router = useRouter()

  return (
    <>
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0">
        <Navbar id="1" />
      </div>
      <div className="lg:hidden fixed bottom-0 border-t border-gray-200 left-0 w-screen bg-white shadow z-40">
        <div className="flex text-gray-800 h-16">
          <button
            className="grow h-full flex items-center justify-center"
            onClick={() => {
              if (showBackdrop) {
                removeBackdrop()
                setShowNavbar(false)
              } else {
                addBackdrop()
                setShowNavbar(true)
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  (!showNavbar && 'M4 6h16M4 12h16M4 18h16') ||
                  'M6 18L18 6M6 6l12 12'
                }
              ></path>
            </svg>
          </button>
          <Link
            className={classnames(
              'grow h-full flex items-center justify-center',
              {
                'bg-gray-200/75': router.pathname === '/',
              },
            )}
            href="/"
          >
            <svg
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0 w-7 h-7"
            >
              <path
                d="M23 12.1663V19C23 20.6569 21.6569 22 20 22H7C5.34315 22 4 20.6569 4 19V12.1663C4 11.2437 4.42452 10.3724 5.15108 9.80377L11.6511 4.71682C12.7372 3.86684 14.2628 3.86684 15.3489 4.71682L21.8489 9.80377C22.5755 10.3724 23 11.2437 23 12.1663Z"
                stroke="currentColor"
                strokeWidth="2"
              ></path>
              <path
                d="M17 17.2747C17 17.704 16.7154 18.0813 16.3026 18.1992L14.4615 18.7253C13.8331 18.9048 13.1669 18.9048 12.5385 18.7253L10.6974 18.1992C10.2846 18.0813 10 17.704 10 17.2747V17.2747C10 16.6359 10.6114 16.1747 11.2257 16.3502L12.8794 16.8227C13.285 16.9386 13.715 16.9386 14.1206 16.8227L15.7743 16.3502C16.3886 16.1747 17 16.6359 17 17.2747V17.2747Z"
                fill="currentColor"
              ></path>
            </svg>
          </Link>
          <Link
            className={classnames(
              'grow h-full flex items-center justify-center',
              {
                'bg-gray-200/75': router.asPath.includes('/templates'),
              },
            )}
            href="/templates"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
              className="flex-shrink-0 w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
      {showBackdrop && (
        <div
          className={classnames(
            'lg:hidden fixed inset-0 bg-gray-700 transition-opacity duration-150 z-20',
            {
              'opacity-0': opacity == 0,
              'opacity-50': opacity == 50,
            },
          )}
          onClick={() => {
            removeBackdrop()
            setShowNavbar(false)
          }}
        ></div>
      )}
      <div
        className={classnames(
          'lg:hidden fixed inset-0 transition-width duration-150 flex z-20 pb-16',
          { 'w-72': showNavbar, 'w-0': !showNavbar },
        )}
      >
        <Navbar id="2" />
      </div>
    </>
  )
}

export default Navigation
