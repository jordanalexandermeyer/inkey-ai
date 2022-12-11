import classNames from 'classnames'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getAuth, signOut } from 'firebase/auth'

const Navbar = ({
  removeBackdropAndNavbar,
}: {
  removeBackdropAndNavbar: CallableFunction
}) => {
  // the navbar id allows the browser to correctly render each logo svg
  const router = useRouter()
  const auth = getAuth()
  return (
    <div className="flex flex-col flex-grow bg-white border-r border-gray-200 overflow-hidden w-72 pt-7">
      <div className="px-5">
        <a href="/" className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 390 475"
            fill="none"
            className="w-8 min-w-[2rem]"
          >
            <path
              d="M342.243 134.246C342.243 134.246 341.393 134.86 340.491 134.603C339.694 134.376 339.293 133.779 339.293 133.779C339.293 133.779 314.464 94.8552 298.724 73.9407C289.054 61.0904 258.357 26.9951 258.357 26.9951C258.357 26.9951 247.818 16.8587 250.283 15.686C254.8 13.5373 263.163 16.5246 267.103 18.4226C307.242 37.7572 390 79.0045 390 90.4129C390 105.879 342.243 134.246 342.243 134.246Z"
              fill="#1A56DB"
            />
            <path
              d="M47.7571 134.246C47.7571 134.246 48.6072 134.86 49.5089 134.603C50.3062 134.376 50.7069 133.779 50.7069 133.779C50.7069 133.779 75.5362 94.8552 91.2757 73.9407C100.946 61.0904 131.643 26.9951 131.643 26.9951C131.643 26.9951 142.182 16.8587 139.717 15.686C135.2 13.5373 126.837 16.5246 122.897 18.4226C82.7581 37.7572 0 79.0045 0 90.4129C0 105.879 47.7571 134.246 47.7571 134.246Z"
              fill="#1A56DB"
            />
            <path
              d="M59.0376 380.207V399.208L42.2848 406.283C22.7397 414.571 20.1904 416.794 20.1904 425.891C20.1904 436.2 27.3528 442.163 39.614 442.163C45.5625 442.062 48.5974 441.052 69.3565 432.258C87.6875 424.476 93.029 421.747 95.2142 419.018C97.7635 415.683 97.8849 414.874 97.8849 388.494C97.8849 388.494 98.0686 370.491 94.2218 365.687C90.3749 360.883 78.4613 361.306 78.4613 361.306C78.4613 361.306 67.2937 360.883 63.4469 365.687C59.6 370.491 59.0376 380.207 59.0376 380.207Z"
              fill="#1A56DB"
            />
            <path
              d="M331.173 380.129V399.13L347.926 406.205C367.471 414.493 370.021 416.716 370.021 425.813C370.021 436.122 362.858 442.085 350.597 442.085C344.649 441.984 341.614 440.974 320.855 432.18C302.524 424.398 297.182 421.669 294.997 418.94C292.448 415.605 292.326 414.796 292.326 388.417C292.326 388.417 292.142 370.414 295.989 365.609C299.836 360.805 311.75 361.228 311.75 361.228C311.75 361.228 322.917 360.805 326.764 365.609C330.611 370.414 331.173 380.129 331.173 380.129Z"
              fill="#1A56DB"
            />
            <path
              d="M136.737 389.816V418.318L118.042 434.085C102.503 447.022 99.1042 450.459 98.0116 453.996C94.0054 466.327 107.723 477.748 122.534 474.413C126.783 473.503 131.153 470.37 149.848 455.007C162.11 444.9 172.914 435.399 173.885 433.883C175.221 431.66 175.585 424.484 175.585 396.184C175.585 396.184 175.012 370.499 171.165 365.695C167.318 360.891 156.161 361.314 156.161 361.314C156.161 361.314 144.237 361.314 140.39 365.695C136.543 370.076 136.737 389.816 136.737 389.816Z"
              fill="#1A56DB"
            />
            <path
              d="M253.474 389.718V418.22L272.169 433.988C287.708 446.925 291.107 450.361 292.2 453.899C296.206 466.229 282.488 477.65 267.677 474.315C263.428 473.405 259.058 470.272 240.363 454.909C228.102 444.802 217.297 435.301 216.326 433.785C214.991 431.562 214.626 424.386 214.626 396.086C214.626 396.086 215.199 370.401 219.046 365.597C222.893 360.793 234.05 361.216 234.05 361.216C234.05 361.216 245.974 361.216 249.821 365.597C253.668 369.978 253.474 389.718 253.474 389.718Z"
              fill="#1A56DB"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M184.201 2.12252C177.524 5.45789 154.216 24.9647 143.168 36.3857C79.9831 101.764 41.3722 193.803 31.9168 301.059C30.3043 319.357 37.29 325.72 37.29 325.72C41.1366 329.884 45.7531 332.766 49.9847 334.368L50.0429 334.39C54.3006 336.001 63.5246 339.492 80.1399 339.501L194.762 339.6H309.648C309.648 339.6 329.523 339.655 340.038 334.688L340.135 334.642C345.647 332.038 348.908 330.498 352.732 326.04C356.579 321.557 359.279 314.043 358.041 301.059C357.212 292.365 356.2 283.324 355.129 275.419C340.804 167.677 295.523 76.8142 227.297 18.4961C208.966 2.72893 204.231 0 195.127 0C190.392 0 187.114 0.606438 184.201 2.12252ZM135.606 248.211C135.606 266.784 121.827 281.84 104.831 281.84C87.8343 281.84 74.0559 266.784 74.0559 248.211C74.0559 229.638 87.8343 214.582 104.831 214.582C121.827 214.582 135.606 229.638 135.606 248.211ZM285.628 281.84C302.624 281.84 316.403 266.784 316.403 248.211C316.403 229.638 302.624 214.582 285.628 214.582C268.631 214.582 254.853 229.638 254.853 248.211C254.853 266.784 268.631 281.84 285.628 281.84Z"
              fill="#1A56DB"
            />
          </svg>
          <span className="text-2xl font-medium ml-2 whitespace-nowrap">
            Inkey
          </span>
        </a>
      </div>
      <nav className="my-5 flex-1 flex flex-col relative space-y-1 pt-3">
        <ul className="pb-1 px-3">
          <li>
            <Link
              href="/"
              className={classNames(
                'w-full hover:bg-gray-50 rounded-md group flex items-center justify-between p-2 font-medium',
                {
                  'text-gray-600 hover:text-gray-800': router.pathname != '/',
                  'text-blue-700': router.pathname === '/',
                },
              )}
              onClick={() => removeBackdropAndNavbar(false)}
            >
              <span className="flex items-center">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  strokeWidth="2"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className={classNames('mr-2 flex-shrink-0 h-5 w-5', {
                    'text-gray-400 group-hover:text-gray-600':
                      router.pathname != '/',
                  })}
                >
                  <path
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    d="M11 39h7.5V26.5h11V39H37V19.5L24 9.75 11 19.5Zm-3 3V18L24 6l16 12v24H26.5V29.5h-5V42Zm16-17.65Z"
                  />
                </svg>
                Dashboard
              </span>
            </Link>
          </li>
        </ul>
        <ul className="pb-1 px-3">
          <li>
            <Link
              href="/templates"
              className={classNames(
                'w-full hover:bg-gray-50 rounded-md group flex items-center justify-between p-2 font-medium',
                {
                  'text-gray-600 hover:text-gray-800': !router.asPath.includes(
                    '/templates',
                  ),
                  'text-blue-700': router.asPath.includes('/templates'),
                },
              )}
              onClick={() => removeBackdropAndNavbar(false)}
            >
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 48 48"
                  strokeWidth="2"
                  stroke="currentColor"
                  className={classNames('mr-2 flex-shrink-0 h-5 w-5', {
                    'text-gray-400 group-hover:text-gray-600': !router.asPath.includes(
                      '/templates',
                    ),
                  })}
                >
                  <path
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    d="M9 22.5q-1.25 0-2.125-.875T6 19.5V9q0-1.25.875-2.125T9 6h10.5q1.25 0 2.125.875T22.5 9v10.5q0 1.25-.875 2.125T19.5 22.5ZM9 42q-1.25 0-2.125-.875T6 39V28.5q0-1.25.875-2.125T9 25.5h10.5q1.25 0 2.125.875T22.5 28.5V39q0 1.25-.875 2.125T19.5 42Zm19.5-19.5q-1.25 0-2.125-.875T25.5 19.5V9q0-1.25.875-2.125T28.5 6H39q1.25 0 2.125.875T42 9v10.5q0 1.25-.875 2.125T39 22.5Zm0 19.5q-1.25 0-2.125-.875T25.5 39V28.5q0-1.25.875-2.125T28.5 25.5H39q1.25 0 2.125.875T42 28.5V39q0 1.25-.875 2.125T39 42ZM9 19.5h10.5V9H9Zm19.5 0H39V9H28.5Zm0 19.5H39V28.5H28.5ZM9 39h10.5V28.5H9Zm19.5-19.5Zm0 9Zm-9 0Zm0-9Z"
                  />
                </svg>
                Templates
              </span>
            </Link>
          </li>
        </ul>
        <ul className="pb-1 px-3">
          <li>
            <Link
              href="/paraphraser"
              className={classNames(
                'w-full hover:bg-gray-50 rounded-md group flex items-center justify-between p-2 font-medium',
                {
                  'text-gray-600 hover:text-gray-800': !router.asPath.includes(
                    '/paraphraser',
                  ),
                  'text-blue-700': router.asPath.includes('/paraphraser'),
                },
              )}
              onClick={() => removeBackdropAndNavbar(false)}
            >
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 48 48"
                  strokeWidth="2"
                  stroke="currentColor"
                  className={classNames('mr-2 flex-shrink-0 h-5 w-5', {
                    'text-gray-400 group-hover:text-gray-600': !router.asPath.includes(
                      '/paraphraser',
                    ),
                  })}
                >
                  <path
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    d="M17.75 18q.25.15.575.075.325-.075.475-.325l4.05-6.7-2.95-4.9q-.6-1-1.725-1t-1.725 1l-4.5 7.5q-.15.25-.075.575.075.325.325.475Zm20 14-4.05-6.75q-.15-.25-.075-.575.075-.325.325-.475l5.65-3.25q.25-.15.575-.05.325.1.475.35l2.8 4.7q.55.85.575 1.925.025 1.075-.425 1.925-.5 1-1.475 1.6-.975.6-2.125.6ZM30.7 44.7l-6.15-6.15q-.25-.25-.25-.55 0-.3.25-.55l6.15-6.15q.35-.35.825-.175T32 31.8V34h9.5l-2.9 5.8q-.55 1-1.5 1.6-.95.6-2.1.6h-3v2.2q0 .5-.475.675-.475.175-.825-.175ZM12.65 42q-1 0-1.825-.525T9.6 40.1q-.4-.8-.375-1.675.025-.875.475-1.625l1.7-2.8h7.85q.3 0 .525.225.225.225.225.525v6.5q0 .3-.225.525-.225.225-.525.225ZM7.7 36.3l-3.25-6.5q-.45-.9-.425-1.925.025-1.025.575-1.925l.8-1.35-1.85-1.1q-.45-.25-.375-.775.075-.525.575-.625L12.2 20q.3-.1.575.075.275.175.375.475l2.1 8.5q.05.25-.025.45-.075.2-.25.325t-.4.15q-.225.025-.425-.125l-1.9-1.15ZM33.95 19l-8.45-2.1q-.5-.1-.575-.625-.075-.525.375-.775l1.9-1.1L20.95 4H28q1.05 0 1.975.525T31.45 5.95l2.6 4.35 1.85-1.15q.2-.15.425-.125.225.025.4.175.175.15.25.35.075.2.025.45l-2.1 8.45q-.1.3-.375.475T33.95 19Z"
                  />
                </svg>
                Paraphraser
              </span>
            </Link>
          </li>
        </ul>
        <ul className="pb-1 px-3">
          <li>
            <Link
              href="/summarizer"
              className={classNames(
                'w-full hover:bg-gray-50 rounded-md group flex items-center justify-between p-2 font-medium',
                {
                  'text-gray-600 hover:text-gray-800': !router.asPath.includes(
                    '/summarizer',
                  ),
                  'text-blue-700': router.asPath.includes('/summarizer'),
                },
              )}
              onClick={() => removeBackdropAndNavbar(false)}
            >
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 48 48"
                  strokeWidth="2"
                  stroke="currentColor"
                  className={classNames('mr-2 flex-shrink-0 h-5 w-5', {
                    'text-gray-400 group-hover:text-gray-600': !router.asPath.includes(
                      '/summarizer',
                    ),
                  })}
                >
                  <path
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    d="M8.55 26.5q-1.05 0-1.8-.725T6 24q0-1.05.75-1.775.75-.725 1.8-.725 1 0 1.725.75Q11 23 11 24t-.725 1.75q-.725.75-1.725.75ZM8.5 14q-1.05 0-1.775-.725Q6 12.55 6 11.5q0-1.05.725-1.775Q7.45 9 8.5 9q1.05 0 1.775.725Q11 10.45 11 11.5q0 1.05-.725 1.775Q9.55 14 8.5 14Zm.05 25q-1.05 0-1.8-.725T6 36.55q0-1.05.75-1.8t1.8-.75q1 0 1.725.75.725.75.725 1.8 0 1-.725 1.725Q9.55 39 8.55 39Zm8.95-1q-.65 0-1.075-.425Q16 37.15 16 36.5q0-.65.425-1.075Q16.85 35 17.5 35h23q.65 0 1.075.425Q42 35.85 42 36.5q0 .65-.425 1.075Q41.15 38 40.5 38Zm0-12.5q-.65 0-1.075-.425Q16 24.65 16 24q0-.65.425-1.075.425-.425 1.075-.425h23q.65 0 1.075.425Q42 23.35 42 24q0 .65-.425 1.075-.425.425-1.075.425Zm0-12.5q-.65 0-1.075-.425Q16 12.15 16 11.5q0-.65.425-1.075Q16.85 10 17.5 10h23q.65 0 1.075.425Q42 10.85 42 11.5q0 .65-.425 1.075Q41.15 13 40.5 13Z"
                  />
                </svg>
                Summarizer
              </span>
            </Link>
          </li>
        </ul>
        {/* <ul className="pb-1 px-3">
          <li>
            <Link
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
                  strokeWidth="2"
                  stroke="currentColor"
                  
                  className={classNames('mr-2 flex-shrink-0 h-5 w-5', {
                    'text-gray-400 group-hover:text-gray-600':
                      router.pathname != '/documents',
                  })}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  ></path>
                </svg>
                Documents
              </span>
            </Link>
          </li>
        </ul> */}
      </nav>
      <div className="my-2 flex-2 flex flex-col relative space-y-1 pt-3">
        <ul className="pb-1 px-3">
          <li>
            <Link
              href="/settings"
              className={classNames(
                'w-full hover:bg-gray-50 rounded-md group flex items-center justify-between p-2 font-medium',
                {
                  'text-gray-600 hover:text-gray-800':
                    router.pathname != '/settings',
                  'text-blue-700': router.pathname === '/settings',
                },
              )}
              onClick={() => removeBackdropAndNavbar(false)}
            >
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 48 48"
                  strokeWidth="2"
                  stroke="currentColor"
                  className={classNames('mr-2 flex-shrink-0 h-5 w-5', {
                    'text-gray-400 group-hover:text-gray-600':
                      router.pathname != '/settings',
                  })}
                >
                  <path
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    d="M27.3 44h-6.6q-.55 0-.975-.35-.425-.35-.525-.9l-.8-5.05q-.95-.35-2-.95t-1.85-1.25L9.9 37.65q-.55.25-1.1.075T7.95 37l-3.3-5.85q-.3-.5-.15-1.05t.6-.9l4.3-3.15q-.1-.45-.125-1.025Q9.25 24.45 9.25 24q0-.45.025-1.025T9.4 21.95L5.1 18.8q-.45-.35-.6-.9-.15-.55.15-1.05L7.95 11q.3-.55.85-.725.55-.175 1.1.075l4.65 2.15q.8-.65 1.85-1.25t2-.9l.8-5.1q.1-.55.525-.9Q20.15 4 20.7 4h6.6q.55 0 .975.35.425.35.525.9l.8 5.05q.95.35 2.025.925Q32.7 11.8 33.45 12.5l4.65-2.15q.55-.25 1.1-.075t.85.725l3.3 5.8q.3.5.175 1.075t-.625.925l-4.3 3.05q.1.5.125 1.075.025.575.025 1.075t-.025 1.05q-.025.55-.125 1.05l4.3 3.1q.45.35.6.9.15.55-.15 1.05L40.05 37q-.3.55-.85.725-.55.175-1.1-.075l-4.65-2.15q-.8.65-1.825 1.275-1.025.625-2.025.925l-.8 5.05q-.1.55-.525.9-.425.35-.975.35ZM24 30.5q2.7 0 4.6-1.9 1.9-1.9 1.9-4.6 0-2.7-1.9-4.6-1.9-1.9-4.6-1.9-2.7 0-4.6 1.9-1.9 1.9-1.9 4.6 0 2.7 1.9 4.6 1.9 1.9 4.6 1.9Zm0-3q-1.45 0-2.475-1.025Q20.5 25.45 20.5 24q0-1.45 1.025-2.475Q22.55 20.5 24 20.5q1.45 0 2.475 1.025Q27.5 22.55 27.5 24q0 1.45-1.025 2.475Q25.45 27.5 24 27.5Zm0-3.5Zm-2.2 17h4.4l.7-5.6q1.65-.4 3.125-1.25T32.7 32.1l5.3 2.3 2-3.6-4.7-3.45q.2-.85.325-1.675.125-.825.125-1.675 0-.85-.1-1.675-.1-.825-.35-1.675L40 17.2l-2-3.6-5.3 2.3q-1.15-1.3-2.6-2.175-1.45-.875-3.2-1.125L26.2 7h-4.4l-.7 5.6q-1.7.35-3.175 1.2-1.475.85-2.625 2.1L10 13.6l-2 3.6 4.7 3.45q-.2.85-.325 1.675-.125.825-.125 1.675 0 .85.125 1.675.125.825.325 1.675L8 30.8l2 3.6 5.3-2.3q1.2 1.2 2.675 2.05Q19.45 35 21.1 35.4Z"
                  />
                </svg>
                Settings
              </span>
            </Link>
          </li>
        </ul>
        <ul className="pb-1 px-3">
          <li>
            <button
              onClick={() => signOut(auth)}
              className="w-full hover:bg-gray-50 rounded-md group flex items-center justify-between p-2 font-medium text-gray-600 hover:text-gray-800"
            >
              <span className="flex items-center whitespace-nowrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 48 48"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="mr-2 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-600"
                >
                  <path
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    d="M32.25 31.65q-.45-.45-.45-1.1 0-.65.45-1.05l4-4h-16q-.65 0-1.075-.425-.425-.425-.425-1.075 0-.65.425-1.075.425-.425 1.075-.425h15.9l-4.05-4.05q-.4-.4-.4-1.025 0-.625.45-1.075.45-.45 1.075-.45t1.075.45L40.95 23q.25.25.35.5.1.25.1.55 0 .3-.1.55-.1.25-.35.5l-6.6 6.6q-.4.4-1.025.4-.625 0-1.075-.45ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h13.05q.65 0 1.075.425.425.425.425 1.075 0 .65-.425 1.075Q22.7 9 22.05 9H9v30h13.05q.65 0 1.075.425.425.425.425 1.075 0 .65-.425 1.075Q22.7 42 22.05 42Z"
                  />
                </svg>
                Sign out
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
