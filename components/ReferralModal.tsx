const ReferralModal = ({
  setShowReferralModal,
}: {
  setShowReferralModal: CallableFunction
}) => {
  return (
    <div className="fixed inset-0 z-40 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-50 opacity-100"></div>
        <div className="relative opacity-100 translate-y-0 sm:scale-100">
          <div className="space-y-5 inline-block w-full px-6 py-8 overflow-hidden text-left align-top transition-all transform bg-white rounded-md shadow-xl sm:my-8 sm:align-middle sm:max-w-sm">
            <div className="flex flex-col">
              <button
                className="w-4 self-end"
                onClick={() => setShowReferralModal(false)}
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
                  5000 Bonus Words!
                </h3>
                <p>
                  Because you used your friend's referral link, 5000 bonus words
                  were just added to your account. Enjoy!
                </p>
              </div>
            </div>
            <button
              className="inline-flex items-center overflow-hidden ease-in-out outline-none focus:outline-none focus:ring-2 justify-center transition-all duration-150 relative font-medium rounded-lg text-white bg-blue-700 shadow-sm hover:bg-blue-300 active:bg-blue-800 px-6 py-4 text-base w-full"
              type="button"
              onClick={() => setShowReferralModal(false)}
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReferralModal
