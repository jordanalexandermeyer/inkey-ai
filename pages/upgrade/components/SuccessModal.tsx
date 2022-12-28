const SuccessModal = () => {
  return (
    <div className="fixed inset-0 z-40 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-50 opacity-100"
          id="headlessui-dialog-overlay-115"
          aria-hidden="true"
        ></div>
        <div className="relative opacity-100 translate-y-0 sm:scale-100">
          <div className="space-y-8 inline-block w-full px-6 py-8 overflow-hidden text-left align-top transition-all transform bg-white rounded-md shadow-xl sm:my-8 sm:align-middle sm:max-w-sm">
            <div className="flex flex-col">
              <div className="space-y-3 text-center">
                <h3 className="text-2xl font-bold leading-6 text-gray-900 pb-2">
                  Success!
                </h3>
                <p>
                  Thank you for upgrading! I hope you enjoy using Inkey and find
                  it helpful. If you need anything at all, please email me at{' '}
                  <b>jordan@inkey.ai</b>
                </p>
                <p>Sincerely, Jordan</p>
              </div>
            </div>
            <button
              className="inline-flex items-center overflow-hidden ease-in-out outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex justify-center transition-all duration-150 relative font-medium rounded-lg focusRing text-white bg-blue-700 shadow-sm hover:bg-blue-300 selectionRing active:bg-blue-800 px-6 py-4 text-base w-full"
              type="button"
              onClick={() => window.location.assign('/')}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessModal
