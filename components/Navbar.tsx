import classNames from 'classnames'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getAuth, signOut } from 'firebase/auth'
import { useUser } from 'utils/useUser'
import { Role } from 'types'
import { EventName, track } from 'utils/segment'

const Navbar = ({
  removeBackdropAndNavbar,
}: {
  removeBackdropAndNavbar: CallableFunction
}) => {
  const router = useRouter()
  const auth = getAuth()
  const { subscription, percentageUsage } = useUser()

  return (
    <div className="flex flex-col flex-grow bg-white border-r border-gray-200 overflow-x-hidden w-56 pt-7">
      <div className="px-5">
        <a href="/" className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 102 40"
            fill="none"
            className="w-24 h-10 min-w-[96px]"
          >
            <path
              d="M42.456 29V10.41H46.226V29H42.456ZM52.2797 15.662V17.482H52.3577C53.2764 16.026 54.5937 15.298 56.3097 15.298C57.6791 15.298 58.7884 15.766 59.6377 16.702C60.4871 17.6207 60.9117 18.8167 60.9117 20.29V29H57.3757V20.81C57.3757 20.082 57.1677 19.4927 56.7517 19.042C56.3531 18.5913 55.7897 18.366 55.0617 18.366C54.2817 18.366 53.6317 18.652 53.1117 19.224C52.6091 19.796 52.3577 20.5327 52.3577 21.434V29H48.8217V15.662H52.2797ZM71.8793 29L68.1353 22.916L66.6013 24.502V29H63.0913V10.41H66.6013V20.706L71.3333 15.662H75.5713L70.6573 20.732L76.1693 29H71.8793ZM82.6366 29.39C80.4872 29.39 78.7972 28.7313 77.5666 27.414C76.3359 26.0793 75.7206 24.3807 75.7206 22.318C75.7206 20.3247 76.3359 18.6607 77.5666 17.326C78.7972 15.974 80.3746 15.298 82.2986 15.298C84.3959 15.298 86.0166 16.026 87.1606 17.482C88.3046 18.938 88.8766 20.888 88.8766 23.332H79.2046C79.3432 24.3893 79.6986 25.2127 80.2706 25.802C80.8426 26.374 81.6226 26.66 82.6106 26.66C83.9106 26.66 84.7686 26.114 85.1846 25.022H88.6686C88.4086 26.27 87.7499 27.31 86.6926 28.142C85.6352 28.974 84.2832 29.39 82.6366 29.39ZM82.3506 18.028C80.6346 18.028 79.6032 18.9813 79.2566 20.888H85.1846C85.1326 20.0387 84.8466 19.354 84.3266 18.834C83.8066 18.2967 83.1479 18.028 82.3506 18.028ZM90.4183 33.368V30.586H91.6663C92.9836 30.586 93.6423 29.9793 93.6423 28.766C93.6423 28.1767 93.3043 26.972 92.6283 25.152L89.0403 15.662H92.7583L94.7343 21.668L95.5923 24.58H95.6443C95.8869 23.4533 96.1469 22.4827 96.4243 21.668L98.2963 15.662H101.858L97.2043 29.338C96.6843 30.8633 96.0949 31.912 95.4363 32.484C94.7949 33.0733 93.8156 33.368 92.4983 33.368H90.4183Z"
              fill="black"
            />
            <path
              d="M28.8205 11.3049C28.8205 11.3049 28.7489 11.3566 28.6729 11.335C28.6058 11.3159 28.5721 11.2656 28.5721 11.2656C28.5721 11.2656 26.4812 7.9878 25.1557 6.22658C24.3414 5.14446 21.7564 2.27327 21.7564 2.27327C21.7564 2.27327 20.8689 1.41968 21.0765 1.32092C21.4568 1.13998 22.1611 1.39155 22.4929 1.55137C25.873 3.17955 32.8421 6.65301 32.8421 7.61372C32.8421 8.9161 28.8205 11.3049 28.8205 11.3049Z"
              fill="#1A56DB"
            />
            <path
              d="M4.02165 11.3049C4.02165 11.3049 4.09324 11.3566 4.16917 11.335C4.23631 11.3159 4.27005 11.2656 4.27005 11.2656C4.27005 11.2656 6.36095 7.9878 7.68637 6.22658C8.50074 5.14446 11.0857 2.27327 11.0857 2.27327C11.0857 2.27327 11.9732 1.41968 11.7656 1.32092C11.3853 1.13998 10.681 1.39155 10.3492 1.55137C6.9691 3.17955 0 6.65301 0 7.61372C0 8.9161 4.02165 11.3049 4.02165 11.3049Z"
              fill="#1A56DB"
            />
            <path
              d="M4.97159 32.0174V33.6175L3.56082 34.2133C1.91492 34.9112 1.70024 35.0985 1.70024 35.8645C1.70024 36.7326 2.3034 37.2348 3.33592 37.2348C3.83684 37.2263 4.09242 37.1412 5.84054 36.4007C7.38421 35.7453 7.83402 35.5155 8.01804 35.2857C8.23272 35.0048 8.24294 34.9368 8.24294 32.7153C8.24294 32.7153 8.25841 31.1993 7.93447 30.7947C7.61052 30.3902 6.60727 30.4258 6.60727 30.4258C6.60727 30.4258 5.66684 30.3902 5.3429 30.7947C5.01895 31.1993 4.97159 32.0174 4.97159 32.0174Z"
              fill="#1A56DB"
            />
            <path
              d="M27.8883 32.0108V33.611L29.2991 34.2067C30.945 34.9047 31.1596 35.0919 31.1596 35.8579C31.1596 36.7261 30.5565 37.2282 29.524 37.2282C29.023 37.2197 28.7675 37.1346 27.0193 36.3941C25.4757 35.7388 25.0259 35.509 24.8418 35.2792C24.6272 34.9983 24.6169 34.9302 24.6169 32.7088C24.6169 32.7088 24.6015 31.1927 24.9254 30.7882C25.2494 30.3836 26.2526 30.4192 26.2526 30.4192C26.2526 30.4192 27.193 30.3836 27.517 30.7882C27.8409 31.1927 27.8883 32.0108 27.8883 32.0108Z"
              fill="#1A56DB"
            />
            <path
              d="M11.5147 32.8266V35.2268L9.9404 36.5546C8.63186 37.644 8.34561 37.9334 8.25361 38.2313C7.91625 39.2697 9.07144 40.2314 10.3186 39.9506C10.6765 39.874 11.0445 39.6101 12.6188 38.3164C13.6513 37.4653 14.5612 36.6652 14.643 36.5375C14.7554 36.3503 14.7861 35.746 14.7861 33.3628C14.7861 33.3628 14.7378 31.1999 14.4139 30.7954C14.0899 30.3908 13.1504 30.4264 13.1504 30.4264C13.1504 30.4264 12.1463 30.4264 11.8223 30.7954C11.4984 31.1643 11.5147 32.8266 11.5147 32.8266Z"
              fill="#1A56DB"
            />
            <path
              d="M21.3451 32.8184V35.2186L22.9195 36.5463C24.228 37.6358 24.5143 37.9251 24.6063 38.223C24.9436 39.2614 23.7884 40.2232 22.5412 39.9423C22.1834 39.8657 21.8154 39.6019 20.2411 38.3082C19.2085 37.457 18.2987 36.657 18.2169 36.5293C18.1045 36.342 18.0738 35.7377 18.0738 33.3546C18.0738 33.3546 18.1221 31.1917 18.446 30.7871C18.7699 30.3826 19.7095 30.4182 19.7095 30.4182C19.7095 30.4182 20.7136 30.4182 21.0376 30.7871C21.3615 31.1561 21.3451 32.8184 21.3451 32.8184Z"
              fill="#1A56DB"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.5116 0.178738C14.9494 0.459611 12.9866 2.10229 12.0563 3.06406C6.73542 8.56964 3.48398 16.3202 2.68773 25.3523C2.55194 26.8932 3.14021 27.4291 3.14021 27.4291C3.46413 27.7797 3.85289 28.0224 4.20923 28.1573L4.21414 28.1591C4.57268 28.2948 5.34944 28.5888 6.74862 28.5896L16.401 28.5979H26.0756C26.0756 28.5979 27.7493 28.6025 28.6348 28.1842L28.643 28.1804C29.1072 27.9611 29.3817 27.8314 29.7038 27.456C30.0277 27.0784 30.255 26.4457 30.1508 25.3523C30.081 24.6202 29.9958 23.8588 29.9056 23.1932C28.6993 14.1202 24.8861 6.46857 19.1408 1.55756C17.5971 0.229805 17.1984 0 16.4317 0C16.033 0 15.757 0.0510685 15.5116 0.178738ZM11.4194 20.902C11.4194 22.466 10.2591 23.7339 8.82786 23.7339C7.39657 23.7339 6.23628 22.466 6.23628 20.902C6.23628 19.338 7.39657 18.0701 8.82786 18.0701C10.2591 18.0701 11.4194 19.338 11.4194 20.902ZM24.0529 23.7339C25.4841 23.7339 26.6444 22.466 26.6444 20.902C26.6444 19.338 25.4841 18.0701 24.0529 18.0701C22.6216 18.0701 21.4613 19.338 21.4613 20.902C21.4613 22.466 22.6216 23.7339 24.0529 23.7339Z"
              fill="#1A56DB"
            />
          </svg>
        </a>
      </div>
      <nav className="my-5 flex-1 flex flex-col relative gap-2 px-3 pt-1">
        <ul className="p-2">
          <li>
            <Link
              href="/documents/new-essay"
              className="p-2 flex items-center justify-center whitespace-nowrap font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 active:bg-blue-300"
              onClick={() => removeBackdropAndNavbar()}
            >
              Create New Essay
            </Link>
          </li>
        </ul>
        <ul className="">
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
              onClick={() => removeBackdropAndNavbar()}
            >
              <span className="flex items-center">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  strokeWidth="1"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className={classNames('mr-2 flex-shrink-0 h-5 w-5', {
                    'text-gray-400 group-hover:text-gray-600':
                      router.pathname != '/',
                  })}
                >
                  <path
                    fill="currentColor"
                    d="M6 22.5V6h16.5v16.5ZM6 42V25.5h16.5V42Zm19.5-19.5V6H42v16.5Zm0 19.5V25.5H42V42ZM9 19.5h10.5V9H9Zm19.5 0H39V9H28.5Zm0 19.5H39V28.5H28.5ZM9 39h10.5V28.5H9Zm19.5-19.5Zm0 9Zm-9 0Zm0-9Z"
                  />
                </svg>
                Dashboard
              </span>
            </Link>
          </li>
        </ul>
        <ul className="">
          <li>
            <Link
              href="/ask-inkey"
              className={classNames(
                'w-full hover:bg-gray-50 rounded-md group flex items-center justify-between p-2 font-medium',
                {
                  'text-gray-600 hover:text-gray-800': !router.asPath.includes(
                    '/ask-inkey',
                  ),
                  'text-blue-700': router.asPath.includes('/ask-inkey'),
                },
              )}
              onClick={() => removeBackdropAndNavbar()}
            >
              <span className="flex items-center whitespace-nowrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 390 475"
                  strokeWidth="2"
                  stroke="currentColor"
                  className={classNames('mr-2 flex-shrink-0 h-5 w-5', {
                    'text-gray-400 group-hover:text-gray-600': !router.asPath.includes(
                      '/ask-inkey',
                    ),
                  })}
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
                Ask Inkey
              </span>
            </Link>
          </li>
        </ul>
        <ul className="">
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
              onClick={() => removeBackdropAndNavbar()}
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
        <ul className="">
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
              onClick={() => removeBackdropAndNavbar()}
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
        <ul className="border-t border-gray-200"></ul>
        <ul className="">
          <li>
            <Link
              href="/upgrade"
              className="w-full text-blue-700 hover:bg-gray-100 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-md group flex items-center justify-between p-2 font-medium"
              onClick={() => removeBackdropAndNavbar()}
            >
              {!subscription && (
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 48 48"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="mr-2 flex-shrink-0 h-5 w-5"
                  >
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      d="M13.05 23.05q-.45-.45-.45-1.05 0-.6.45-1.05l9.9-9.9q.25-.25.5-.35.25-.1.55-.1.3 0 .55.1.25.1.5.35l9.9 9.9q.45.45.45 1.05 0 .6-.45 1.05-.45.45-1.05.45-.6 0-1.05-.45L24 14.2l-8.85 8.85q-.45.45-1.05.45-.6 0-1.05-.45Zm0 12.65q-.45-.45-.45-1.05 0-.6.45-1.05l9.9-9.9q.25-.25.5-.35.25-.1.55-.1.3 0 .55.1.25.1.5.35l9.9 9.9q.45.45.45 1.05 0 .6-.45 1.05-.45.45-1.05.45-.6 0-1.05-.45L24 26.85l-8.85 8.85q-.45.45-1.05.45-.6 0-1.05-.45Z"
                    />
                  </svg>
                  Upgrade
                </span>
              )}
              {subscription?.role == Role.PREMIUM && (
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 48 48"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="mr-2 flex-shrink-0 h-5 w-5 text-blue-700"
                  >
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      d="M24 40.3q-.65 0-1.25-.25t-1.05-.8L5.25 19.5q-.55-.7-.65-1.575-.1-.875.3-1.675l4.25-8.6q.4-.75 1.125-1.2Q11 6 11.85 6h24.3q.85 0 1.575.45t1.125 1.2l4.25 8.6q.4.8.3 1.675-.1.875-.65 1.575L26.3 39.25q-.45.55-1.05.8-.6.25-1.25.25Zm-6.1-23.8h12.2L26.35 9h-4.7Zm4.6 19.05V19.5H9.15Zm3 0L38.85 19.5H25.5Zm7.95-19.05h6.3L35.95 9H29.7Zm-25.2 0h6.3L18.3 9h-6.25Z"
                    />
                  </svg>
                  Premium
                </span>
              )}
              {subscription?.role == Role.ULTIMATE && (
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="mr-2 flex-shrink-0 h-5 w-5 text-blue-700"
                  >
                    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5m14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1Z" />
                  </svg>
                  Ultimate
                </span>
              )}
              {subscription?.role == Role.UNLIMITED && (
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    stroke="currentColor"
                    viewBox="0 0 48 48"
                    className="mr-2 flex-shrink-0 h-5 w-5 text-blue-700"
                  >
                    <path d="m9.35 20.45 5.3 2.25q.9-1.8 1.925-3.55Q17.6 17.4 18.75 15.8L14.8 15Zm7.7 4.05 6.65 6.65q2.85-1.3 5.35-2.95 2.5-1.65 4.05-3.2 4.05-4.05 5.95-8.3 1.9-4.25 2.05-9.6-5.35.15-9.6 2.05t-8.3 5.95q-1.55 1.55-3.2 4.05-1.65 2.5-2.95 5.35Zm11.45-4.8q-1-1-1-2.475t1-2.475q1-1 2.475-1t2.475 1q1 1 1 2.475t-1 2.475q-1 1-2.475 1t-2.475-1Zm-.75 19.15 5.45-5.45-.8-3.95q-1.6 1.15-3.35 2.175T25.5 33.55Zm16.3-34.7q.45 6.8-1.7 12.4-2.15 5.6-7.1 10.55l-.1.1-.1.1 1.1 5.5q.15.75-.075 1.45-.225.7-.775 1.25l-8.55 8.6-4.25-9.9-8.5-8.5-9.9-4.25 8.6-8.55q.55-.55 1.25-.775.7-.225 1.45-.075l5.5 1.1q.05-.05.1-.075.05-.025.1-.075 4.95-4.95 10.55-7.125 5.6-2.175 12.4-1.725Zm-36.6 27.6Q9.2 30 11.725 29.975 14.25 29.95 16 31.7q1.75 1.75 1.725 4.275Q17.7 38.5 15.95 40.25q-1.3 1.3-4.025 2.15Q9.2 43.25 3.75 44q.75-5.45 1.575-8.2.825-2.75 2.125-4.05Zm2.1 2.15q-.7.75-1.25 2.35t-.95 4.1q2.5-.4 4.1-.95 1.6-.55 2.35-1.25.95-.85.975-2.125.025-1.275-.875-2.225-.95-.9-2.225-.875-1.275.025-2.125.975Z" />
                  </svg>
                  Unlimited
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 mb-2">
        <div>
          <div className="border border-gray-200 p-4 rounded-b-lg bg-gray-50 rounded-t-lg">
            <div className="flex justify-between">
              <div className="flex text-base mb-3 items-center">
                <svg
                  className="h-6"
                  viewBox="0 0 48 48"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    d="M16.05 40q-1.2 0-2.1-.9-.9-.9-.9-2.1v-3.5q0-.65.425-1.075Q13.9 32 14.55 32h4.7v-6.35q-1.9.15-3.8-.525T12.05 23v-2.9h-2.5L4.4 14.95q-.6-.6-.6-1.35 0-.75.6-1.2 1.6-1.2 3.725-1.95T12.4 9.7q1.5 0 3.425.475 1.925.475 3.425 1.525V9.5q0-.65.425-1.075Q20.1 8 20.75 8H40.5q.65 0 1.075.425Q42 8.85 42 9.5v25.25q0 2.2-1.525 3.725T36.75 40Zm6.2-8H33q.65 0 1.075.425.425.425.425 1.075v1.25q0 1 .625 1.625T36.75 37q1 0 1.625-.625T39 34.75V11H22.25v2.85l11.4 11.4q.3.3.475.6t.175.7q0 .65-.425 1.075-.425.425-1.075.425-.4 0-.7-.175-.3-.175-.6-.475l-5.65-5.65-.85 1q-.65.75-1.3 1.15-.65.4-1.45.75ZM10.9 17.1h4.15v4.45q.85.55 1.675.825.825.275 1.675.275 1.25 0 2.55-.675 1.3-.675 1.9-1.375l.85-1-3.45-3.45q-1.6-1.6-3.6-2.525-2-.925-4.25-.925-1.35 0-2.45.325T7.7 13.9ZM16.05 37H32.2q-.3-.3-.5-.825-.2-.525-.2-1.175H16.05Zm0 0v-2 2Z"
                  />
                </svg>
                <span className="pl-2">Credits</span>
              </div>
              <div></div>
            </div>
            <div className="w-full relative pb-2">
              <div className="absolute bg-gray-200 w-full rounded-full h-1"></div>
              <div
                className="absolute rounded-full transition-all h-1 bg-gradient-to-r from-purple-400 to-blue-400"
                style={{
                  width: `${percentageUsage}%`,
                }}
              ></div>
            </div>
            <div className="text-[10px] text-gray-500 font-bold pt-1 whitespace-nowrap">
              {percentageUsage}% of plan credits used
            </div>
            <div className="mt-3 text-blue-600 underline text-sm whitespace-nowrap">
              <Link href="/settings">More details</Link>
            </div>
          </div>
        </div>
      </div>
      <nav className="my-2 flex-2 flex flex-col relative space-y-1">
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
              onClick={() => removeBackdropAndNavbar()}
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
              onClick={() => {
                track(EventName.USER_SIGNED_OUT)
                signOut(auth)
              }}
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
      </nav>
    </div>
  )
}

export default Navbar
