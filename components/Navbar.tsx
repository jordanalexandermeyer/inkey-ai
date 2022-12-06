import classNames from 'classnames'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getAuth, signOut } from 'firebase/auth'

const Navbar = ({ id }: { id: string }) => {
  // the navbar id allows the browser to correctly render each logo svg
  const router = useRouter()
  const auth = getAuth()
  return (
    <div className="flex flex-col flex-grow bg-white border-r border-gray-200 overflow-hidden w-72 pt-7">
      <div className="flex-shrink-0 flex flex-col items-start justify-center px-5 space-y-6">
        <a href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2400 500"
            fill="none"
            className="h-10"
          >
            <path
              d="M212.333 0.933197C185.933 3.06656 160.067 12.1332 141 26.1332C110.067 48.7999 92.3333 81.9999 80.3333 139.333C73.5333 172.4 72.2 174.8 41.6666 206C19.9333 228.267 16.3333 232.533 11.9333 241.733C2.46662 261.2 1.53329 267.467 0.733285 314C0.0666187 354.133 0.0666188 355.467 2.73329 358.667C5.39995 362 5.66662 362 31.9333 362.667C67.5333 363.6 68.2 363.867 82.4666 389.867C90.6 404.667 100.867 416.133 110.2 420.667C114.333 422.667 123.4 425.067 132.2 426.667C140.467 428.133 150.067 430.533 153.533 432.267C157.4 434.133 165.133 440.8 174.333 450.133C186.067 462.267 190.733 466 197.667 469.2C215.533 477.467 241.133 477.467 259 469.2C265.933 466 270.6 462.133 282.467 450.133C291.533 440.933 299.667 434 303.267 432.133C306.6 430.533 316.2 428.133 324.467 426.667C333 425.2 342.467 422.667 346.2 420.8C356.067 416 365.4 406.133 372.867 392.533C382.067 375.733 386.333 370.133 392.733 366.533C397.933 363.467 399.933 363.333 424.6 362.667C447.533 362.133 451.267 361.733 453.267 359.6C455.533 357.467 455.667 353.867 455.533 316.267C455.533 272.667 454.867 266.4 448.733 250.667C443 236.267 437 228.4 413.667 204.667C384.2 174.667 383.533 173.333 375.533 136.267C365 87.0666 351 58.1332 327 35.5999C299.133 9.46655 258.867 -2.66678 212.333 0.933197ZM190.467 111.867C196.067 115.2 199.4 122.933 200.067 133.467C201 149.067 193.4 160 181.667 160C170.733 160 163 149.6 163 134.933C163 115.467 177 103.733 190.467 111.867ZM283.667 112C290.2 116 293 122.8 293 134.667C293 150.533 286.467 160 275.267 160C264.733 160 257.8 151.867 256.6 137.867C255 117.2 269.533 103.333 283.667 112Z"
              fill={`url(#${id}`}
            />
            <path
              d="M702.12 364H732.64V257.6H648.36V288.96H696.52V290.08C696.52 312.2 676.08 335.44 645 335.44C610.56 335.44 589 305.48 589 264.6C589 224.84 607.76 193.48 645.56 193.48C671.32 193.48 686.16 207.48 690.64 226.8H730.4C723.96 187.6 695.12 159.88 644.72 159.88C617.84 159.88 596.56 168 580.32 182.84C559.32 202.16 547.56 231.28 547.56 264.6C547.56 294.84 557.08 320.6 573.6 339.08C590.12 357.28 613.64 368.2 643.88 368.2C667.68 368.2 686.44 360.08 700.16 337.12H700.72L702.12 364ZM796.025 163.8H757.945V364H796.025V282.52C796.025 262.92 808.345 249.48 825.145 249.48C841.105 249.48 850.065 260.4 850.065 275.8V364H888.145V270.2C888.145 238.84 868.265 216.44 838.585 216.44C818.985 216.44 807.225 224 796.865 239.12H796.025V163.8ZM979.657 368.2C1024.18 368.2 1054.7 335.16 1054.7 292.32C1054.7 249.48 1024.18 216.44 979.657 216.44C935.137 216.44 904.617 249.48 904.617 292.32C904.617 335.16 935.137 368.2 979.657 368.2ZM979.657 339.08C956.137 339.08 943.257 320.32 943.257 292.32C943.257 264.32 956.137 245.28 979.657 245.28C1002.9 245.28 1016.06 264.32 1016.06 292.32C1016.06 320.32 1002.9 339.08 979.657 339.08ZM1130.64 368.2C1166.48 368.2 1191.12 350.84 1191.12 322C1191.12 288.4 1164.52 281.68 1140.44 276.64C1120 272.44 1100.96 271.32 1100.96 259C1100.96 248.64 1110.76 243.04 1125.6 243.04C1141.84 243.04 1151.64 248.64 1153.32 264.04H1187.76C1184.96 235.2 1163.96 216.44 1126.16 216.44C1093.4 216.44 1067.64 231.28 1067.64 262.36C1067.64 293.72 1092.84 300.72 1118.6 305.76C1138.2 309.68 1156.4 311.08 1156.4 324.8C1156.4 334.88 1146.88 341.32 1130.08 341.32C1113 341.32 1101.24 334.04 1098.72 317.52H1063.44C1065.68 348.04 1088.92 368.2 1130.64 368.2ZM1197.16 245.56H1217.04V329.84C1217.04 357 1237.48 364.28 1255.96 364.28C1271.08 364.28 1279.76 363.72 1279.76 363.72V335.72C1279.76 335.72 1273.32 336 1268.56 336C1260.16 336 1254.28 332.36 1254.28 321.72V245.56H1278.92V220.36H1254.28V175.56H1217.04V220.36H1197.16V245.56ZM1333.43 364H1367.87L1387.47 293.44C1390.55 281.96 1394.19 268.52 1394.19 268.52H1394.75C1394.75 268.52 1398.11 281.96 1401.19 293.44L1420.23 364H1454.95L1497.79 220.36H1460.83L1442.63 287C1439.55 298.76 1436.19 313.88 1436.19 313.88H1435.63C1435.63 313.88 1431.99 298.76 1428.91 286.72L1410.15 220.36H1377.67L1359.75 286.72C1356.67 298.48 1353.59 313.88 1353.59 313.88H1353.03C1353.03 313.88 1349.67 298.76 1346.59 287L1329.23 220.36H1291.43L1333.43 364ZM1547.95 220.36H1511.27V364H1549.35V294C1549.35 263.76 1567.27 250.6 1592.19 253.12H1593.03V219.8C1590.79 218.96 1588.27 218.68 1584.07 218.68C1567.27 218.68 1557.47 227.08 1548.79 243.32H1547.95V220.36ZM1609.43 364H1647.51V220.36H1609.43V364ZM1609.43 197.96H1647.51V163.8H1609.43V197.96ZM1663.65 245.56H1683.53V329.84C1683.53 357 1703.97 364.28 1722.45 364.28C1737.57 364.28 1746.25 363.72 1746.25 363.72V335.72C1746.25 335.72 1739.81 336 1735.05 336C1726.65 336 1720.77 332.36 1720.77 321.72V245.56H1745.41V220.36H1720.77V175.56H1683.53V220.36H1663.65V245.56ZM1753.88 245.56H1773.76V329.84C1773.76 357 1794.2 364.28 1812.68 364.28C1827.8 364.28 1836.48 363.72 1836.48 363.72V335.72C1836.48 335.72 1830.04 336 1825.28 336C1816.88 336 1811 332.36 1811 321.72V245.56H1835.64V220.36H1811V175.56H1773.76V220.36H1753.88V245.56ZM1921.36 368.2C1958.32 368.2 1981 346.64 1986.32 321.16H1948.8C1944.6 332.08 1935.92 338.8 1921.08 338.8C1899.52 338.8 1887.2 325.08 1884.4 302.96H1988.56C1988.56 251.72 1963.92 216.44 1917.72 216.44C1875.72 216.44 1846.88 249.48 1846.88 292.04C1846.88 334.88 1873.76 368.2 1921.36 368.2ZM1918.28 245.84C1935.64 245.84 1947.68 258.44 1948.8 276.64H1884.96C1888.32 257.88 1898.12 245.84 1918.28 245.84ZM2043.43 220.36H2006.19V364H2044.27V282.52C2044.27 262.92 2056.59 249.48 2073.39 249.48C2089.35 249.48 2098.31 260.4 2098.31 275.8V364H2136.39V270.2C2136.39 238.84 2116.51 216.44 2086.83 216.44C2067.23 216.44 2054.07 224.56 2044.27 239.96H2043.43V220.36Z"
              fill="black"
            />
            <defs>
              <linearGradient
                id={id}
                x1="227.966"
                y1="475.4"
                x2="227.966"
                y2="0.312805"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#542DF0" stop-opacity="0.1" />
                <stop offset="1" stop-color="#542DF0" />
              </linearGradient>
            </defs>
          </svg>
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
                    strokeWidth="2"
                  ></path>
                  <path
                    d="M17 17.2747C17 17.704 16.7154 18.0813 16.3026 18.1992L14.4615 18.7253C13.8331 18.9048 13.1669 18.9048 12.5385 18.7253L10.6974 18.1992C10.2846 18.0813 10 17.704 10 17.2747V17.2747C10 16.6359 10.6114 16.1747 11.2257 16.3502L12.8794 16.8227C13.285 16.9386 13.715 16.9386 14.1206 16.8227L15.7743 16.3502C16.3886 16.1747 17 16.6359 17 17.2747V17.2747Z"
                    fill="white"
                  ></path>
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
            >
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className={classNames('mr-2 flex-shrink-0 h-5 w-5', {
                    'text-gray-400 group-hover:text-gray-600': !router.asPath.includes(
                      '/templates',
                    ),
                  })}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  ></path>
                </svg>
                Templates
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
                  aria-hidden="true"
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
            >
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className={classNames('mr-2 flex-shrink-0 h-5 w-5', {
                    'text-gray-400 group-hover:text-gray-600':
                      router.pathname != '/settings',
                  })}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                Settings
              </span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="my-2 flex-2 flex flex-col relative space-y-1 pt-3">
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
                  aria-hidden="true"
                  className="mr-2 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-600"
                >
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h14.55v3H9v30h14.55v3Zm24.3-9.25-2.15-2.15 5.1-5.1h-17.5v-3h17.4l-5.1-5.1 2.15-2.15 8.8 8.8Z"
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
