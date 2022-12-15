import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

const SettingsBody = () => {
  const auth = getAuth()
  const [user] = useAuthState(auth)

  return (
    <div className="mt-1 pt-6">
      <article>
        <div className="mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mb-2">
              Settings
            </h2>
          </div>
          <div className="mt-12 pb-2">
            <h1 className="text-xl font-semibold text-gray-900">
              Profile Information
            </h1>
          </div>
          <form>
            <div className="mt-6 w-full max-w-xl flex flex-col md:flex-row mb-6 md:flex md:space-x-3 md:items-center">
              <div className="flex flex-col flex-1">
                <div className="flex justify-end items-center">
                  <div className="flex-grow mb-1 flex items-center">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium dark:text-gray-300 text-gray-700"
                    >
                      Email
                    </label>
                  </div>
                </div>
                <div className="relative flex items-center">
                  <input
                    id="email"
                    className="border focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 block w-full py-2 pr-3 text-gray-700 placeholder-gray-400 transition-shadow duration-150 ease-in-out bg-gray-100 border-gray-200 rounded-md shadow-sm outline-none resize-none focus:outline-none focus:ring-blue-700 focus:border-blue-700 text-sm"
                    type="text"
                    disabled={true}
                    value={user?.email!}
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="mb-32 lg:mb-16"></div>
        </div>
      </article>
    </div>
  )
}

export default SettingsBody
