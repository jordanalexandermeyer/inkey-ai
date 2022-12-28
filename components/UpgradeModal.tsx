import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { useReferral } from 'utils/useReferral'

const UpgradeModal = ({
  setShowUpgradeModal,
}: {
  setShowUpgradeModal: CallableFunction
}) => {
  const router = useRouter()
  const { referralCode } = useReferral()

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto" role="dialog">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-50 opacity-100"></div>
        <div className="relative opacity-100 translate-y-0 sm:scale-100">
          <div className="space-y-5 inline-block w-full px-6 py-8 overflow-hidden text-left align-top transition-all transform bg-white rounded-md shadow-xl sm:my-8 sm:align-middle sm:max-w-sm">
            <div className="flex flex-col">
              <button
                className="w-4 self-end"
                onClick={() => setShowUpgradeModal(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-4 h-4 text-gray-600"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <div className="space-y-3 text-center">
                <h3 className="text-2xl font-bold leading-6 text-gray-900 pb-2">
                  Time to Upgrade!
                </h3>
                <p>
                  You've reached your monthly word generation limit. Please
                  upgrade or share your referral link for more words!
                </p>
              </div>
            </div>
            <button
              className="inline-flex items-center overflow-hidden ease-in-out outline-none focus:outline-none focus:ring-2 justify-center transition-all duration-150 relative font-medium rounded-lg text-gray-700 bg-white border border-black-300 shadow-sm hover:text-gray-500 active:bg-gray-50 active:text-gray-800 px-6 py-4 text-base w-full"
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(
                  'https://www.inkey.ai?referral_code=' + referralCode?.id,
                )
                toast.success('Copied to clipboard!')
              }}
            >
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  fill="currentColor"
                  className="h-4 w-4 opacity-60"
                >
                  <path d="M9 43.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.8h3v30.15h23.7v3Zm6-6q-1.2 0-2.1-.9-.9-.9-.9-2.1v-28q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h22v-28H15v28Zm0 0v-28 28Z" />
                </svg>
                <div>Copy share link</div>
              </div>
            </button>
            <button
              className="inline-flex items-center overflow-hidden ease-in-out outline-none focus:outline-none focus:ring-2 justify-center transition-all duration-150 relative font-medium rounded-lg text-white bg-blue-700 shadow-sm hover:bg-blue-300 active:bg-blue-800 px-6 py-4 text-base w-full"
              type="button"
              onClick={() => router.push('/upgrade')}
            >
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpgradeModal
