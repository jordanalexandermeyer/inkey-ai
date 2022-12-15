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

  const removeBackdropAndNavbar = () => {
    removeBackdrop()
    setShowNavbar(false)
  }

  const addBackdropAndNavbar = () => {
    addBackdrop()
    setShowNavbar(true)
  }

  const router = useRouter()

  return (
    <>
      <div className="hidden lg:flex lg:w-56 lg:flex-col lg:fixed lg:inset-y-0 z-10">
        <Navbar removeBackdropAndNavbar={removeBackdropAndNavbar} />
      </div>
      <div className="lg:hidden fixed bottom-0 border-t border-gray-200 left-0 w-screen bg-white shadow z-40">
        <div className="flex text-gray-800 h-16">
          <button
            className="grow h-full flex items-center justify-center"
            onClick={() => {
              if (showBackdrop) removeBackdropAndNavbar()
              else addBackdropAndNavbar()
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
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
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
            >
              <path
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                d="M11 39h7.5V26.5h11V39H37V19.5L24 9.75 11 19.5Zm-3 3V18L24 6l16 12v24H26.5V29.5h-5V42Zm16-17.65Z"
              />
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
              viewBox="0 0 48 48"
              strokeWidth="1"
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                d="M9 22.5q-1.25 0-2.125-.875T6 19.5V9q0-1.25.875-2.125T9 6h10.5q1.25 0 2.125.875T22.5 9v10.5q0 1.25-.875 2.125T19.5 22.5ZM9 42q-1.25 0-2.125-.875T6 39V28.5q0-1.25.875-2.125T9 25.5h10.5q1.25 0 2.125.875T22.5 28.5V39q0 1.25-.875 2.125T19.5 42Zm19.5-19.5q-1.25 0-2.125-.875T25.5 19.5V9q0-1.25.875-2.125T28.5 6H39q1.25 0 2.125.875T42 9v10.5q0 1.25-.875 2.125T39 22.5Zm0 19.5q-1.25 0-2.125-.875T25.5 39V28.5q0-1.25.875-2.125T28.5 25.5H39q1.25 0 2.125.875T42 28.5V39q0 1.25-.875 2.125T39 42ZM9 19.5h10.5V9H9Zm19.5 0H39V9H28.5Zm0 19.5H39V28.5H28.5ZM9 39h10.5V28.5H9Zm19.5-19.5Zm0 9Zm-9 0Zm0-9Z"
              />
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
          onClick={removeBackdropAndNavbar}
        ></div>
      )}
      <div
        className={classnames(
          'lg:hidden fixed inset-0 transition-width duration-150 flex z-20 pb-16',
          { 'w-56': showNavbar, 'w-0': !showNavbar },
        )}
      >
        <Navbar removeBackdropAndNavbar={removeBackdropAndNavbar} />
      </div>
    </>
  )
}

export default Navigation
