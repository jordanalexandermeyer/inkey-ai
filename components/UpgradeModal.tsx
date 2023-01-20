import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { useReferral } from 'utils/useReferral'
import Modal from './Modal'

const UpgradeModal = ({
  setShowUpgradeModal,
}: {
  setShowUpgradeModal: CallableFunction
}) => {
  const router = useRouter()
  const { referralCode } = useReferral()

  return (
    <Modal setShowModal={setShowUpgradeModal}>
      <div className="max-w-md flex flex-col gap-3 px-6 pb-6">
        <div className="space-y-3 text-center pb-3">
          <h3 className="text-2xl font-bold leading-6 text-gray-900 pb-2">
            Time to Upgrade!
          </h3>
          <p>
            You've reached your monthly word generation limit. Please upgrade or
            share your referral link with a friend for more words!
          </p>
        </div>
        <button
          className="flex items-center overflow-hidden ease-in-out justify-center transition-all duration-150 relative font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:text-gray-500 active:bg-gray-50 active:text-gray-800 px-6 py-4 text-base w-full"
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(
              'https://app.inkey.ai/signup?referral_code=' + referralCode?.id,
            )
            toast.success('Copied to clipboard!')
          }}
        >
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              stroke="currentColor"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M9 43.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.8h3v30.15h23.7v3Zm6-6q-1.2 0-2.1-.9-.9-.9-.9-2.1v-28q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h22v-28H15v28Zm0 0v-28 28Z" />
            </svg>
            <div>Copy share link</div>
          </div>
        </button>
        <button
          className="flex items-center overflow-hidden ease-in-out outline-none justify-center transition-all duration-150 font-medium rounded-lg text-white bg-blue-700 hover:bg-blue-300 active:bg-blue-800 px-6 py-4 text-base w-full"
          type="button"
          onClick={() => router.push('/upgrade')}
        >
          Upgrade
        </button>
      </div>
    </Modal>
  )
}

export default UpgradeModal
