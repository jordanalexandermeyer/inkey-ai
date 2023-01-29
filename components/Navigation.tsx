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
        <div className="flex text-gray-600 h-16">
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
                d="M6 22.5V6h16.5v16.5ZM6 42V25.5h16.5V42Zm19.5-19.5V6H42v16.5Zm0 19.5V25.5H42V42ZM9 19.5h10.5V9H9Zm19.5 0H39V9H28.5Zm0 19.5H39V28.5H28.5ZM9 39h10.5V28.5H9Zm19.5-19.5Zm0 9Zm-9 0Zm0-9Z"
              />
            </svg>
          </Link>
          <Link
            className={classnames(
              'grow h-full flex items-center justify-center',
              {
                'bg-gray-200/75': router.asPath.includes('/ask-inkey'),
              },
            )}
            href="/ask-inkey"
          >
            <svg
              viewBox="0 0 390 475"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
            >
              <path
                d="M342.243 134.246C342.243 134.246 341.393 134.86 340.491 134.603C339.694 134.376 339.293 133.779 339.293 133.779C339.293 133.779 314.464 94.8552 298.724 73.9407C289.054 61.0904 258.357 26.9951 258.357 26.9951C258.357 26.9951 247.818 16.8587 250.283 15.686C254.8 13.5373 263.163 16.5246 267.103 18.4226C307.242 37.7572 390 79.0045 390 90.4129C390 105.879 342.243 134.246 342.243 134.246Z"
                fill="currentColor"
              />
              <path
                d="M47.7571 134.246C47.7571 134.246 48.6072 134.86 49.5089 134.603C50.3062 134.376 50.7069 133.779 50.7069 133.779C50.7069 133.779 75.5362 94.8552 91.2757 73.9407C100.946 61.0904 131.643 26.9951 131.643 26.9951C131.643 26.9951 142.182 16.8587 139.717 15.686C135.2 13.5373 126.837 16.5246 122.897 18.4226C82.7581 37.7572 0 79.0045 0 90.4129C0 105.879 47.7571 134.246 47.7571 134.246Z"
                fill="currentColor"
              />
              <path
                d="M59.0376 380.207V399.208L42.2848 406.283C22.7397 414.571 20.1904 416.794 20.1904 425.891C20.1904 436.2 27.3528 442.163 39.614 442.163C45.5625 442.062 48.5974 441.052 69.3565 432.258C87.6875 424.476 93.029 421.747 95.2142 419.018C97.7635 415.683 97.8849 414.874 97.8849 388.494C97.8849 388.494 98.0686 370.491 94.2218 365.687C90.3749 360.883 78.4613 361.306 78.4613 361.306C78.4613 361.306 67.2937 360.883 63.4469 365.687C59.6 370.491 59.0376 380.207 59.0376 380.207Z"
                fill="currentColor"
              />
              <path
                d="M331.173 380.129V399.13L347.926 406.205C367.471 414.493 370.021 416.716 370.021 425.813C370.021 436.122 362.858 442.085 350.597 442.085C344.649 441.984 341.614 440.974 320.855 432.18C302.524 424.398 297.182 421.669 294.997 418.94C292.448 415.605 292.326 414.796 292.326 388.417C292.326 388.417 292.142 370.414 295.989 365.609C299.836 360.805 311.75 361.228 311.75 361.228C311.75 361.228 322.917 360.805 326.764 365.609C330.611 370.414 331.173 380.129 331.173 380.129Z"
                fill="currentColor"
              />
              <path
                d="M136.737 389.816V418.318L118.042 434.085C102.503 447.022 99.1042 450.459 98.0116 453.996C94.0054 466.327 107.723 477.748 122.534 474.413C126.783 473.503 131.153 470.37 149.848 455.007C162.11 444.9 172.914 435.399 173.885 433.883C175.221 431.66 175.585 424.484 175.585 396.184C175.585 396.184 175.012 370.499 171.165 365.695C167.318 360.891 156.161 361.314 156.161 361.314C156.161 361.314 144.237 361.314 140.39 365.695C136.543 370.076 136.737 389.816 136.737 389.816Z"
                fill="currentColor"
              />
              <path
                d="M253.474 389.718V418.22L272.169 433.988C287.708 446.925 291.107 450.361 292.2 453.899C296.206 466.229 282.488 477.65 267.677 474.315C263.428 473.405 259.058 470.272 240.363 454.909C228.102 444.802 217.297 435.301 216.326 433.785C214.991 431.562 214.626 424.386 214.626 396.086C214.626 396.086 215.199 370.401 219.046 365.597C222.893 360.793 234.05 361.216 234.05 361.216C234.05 361.216 245.974 361.216 249.821 365.597C253.668 369.978 253.474 389.718 253.474 389.718Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M184.201 2.12252C177.524 5.45789 154.216 24.9647 143.168 36.3857C79.9831 101.764 41.3722 193.803 31.9168 301.059C30.3043 319.357 37.29 325.72 37.29 325.72C41.1366 329.884 45.7531 332.766 49.9847 334.368L50.0429 334.39C54.3006 336.001 63.5246 339.492 80.1399 339.501L194.762 339.6H309.648C309.648 339.6 329.523 339.655 340.038 334.688L340.135 334.642C345.647 332.038 348.908 330.498 352.732 326.04C356.579 321.557 359.279 314.043 358.041 301.059C357.212 292.365 356.2 283.324 355.129 275.419C340.804 167.677 295.523 76.8142 227.297 18.4961C208.966 2.72893 204.231 0 195.127 0C190.392 0 187.114 0.606438 184.201 2.12252ZM135.606 248.211C135.606 266.784 121.827 281.84 104.831 281.84C87.8343 281.84 74.0559 266.784 74.0559 248.211C74.0559 229.638 87.8343 214.582 104.831 214.582C121.827 214.582 135.606 229.638 135.606 248.211ZM285.628 281.84C302.624 281.84 316.403 266.784 316.403 248.211C316.403 229.638 302.624 214.582 285.628 214.582C268.631 214.582 254.853 229.638 254.853 248.211C254.853 266.784 268.631 281.84 285.628 281.84Z"
                fill="currentColor"
              />
            </svg>
          </Link>
        </div>
      </div>
      {showBackdrop && (
        <div
          className={classnames(
            'lg:hidden fixed inset-0 bg-gray-700 transition-opacity ease-in-out duration-150 z-20',
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
          'lg:hidden fixed inset-0 transition-transform ease-in-out duration-150 flex z-20 pb-16 w-56',
          { '-translate-x-0': showNavbar, '-translate-x-56': !showNavbar },
        )}
      >
        <Navbar removeBackdropAndNavbar={removeBackdropAndNavbar} />
      </div>
    </>
  )
}

export default Navigation
