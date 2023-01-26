import Modal from './Modal'

const ReferralModal = ({
  setShowReferralModal,
}: {
  setShowReferralModal: CallableFunction
}) => {
  return (
    <Modal setShowModal={setShowReferralModal}>
      <div className="max-w-md flex flex-col gap-3 px-6 pb-6">
        <div className="space-y-3 text-center pb-3">
          <h3 className="text-2xl font-bold leading-6 text-gray-900 pb-2">
            5000 Bonus Words!
          </h3>
          <p>
            Because you used your friend's referral link, 5000 bonus words were
            just added to your account. Enjoy!
          </p>
        </div>
        <button
          className="inline-flex items-center overflow-hidden ease-in-out outline-none focus:outline-none focus:ring-2 justify-center transition-all duration-150 relative font-medium rounded-lg text-white bg-blue-700 shadow-sm hover:bg-blue-300 active:bg-blue-800 px-6 py-4 text-base w-full"
          type="button"
          onClick={() => setShowReferralModal(false)}
        >
          Get started
        </button>
      </div>
    </Modal>
  )
}

export default ReferralModal
