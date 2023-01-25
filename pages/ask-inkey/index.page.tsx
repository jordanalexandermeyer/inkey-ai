import type { NextPage } from 'next'
import ProtectedPage from '../../components/ProtectedPage'
import Page from '../../components/Page'
import { useState, useRef, KeyboardEvent, useEffect } from 'react'
import toast from 'react-hot-toast'
import { logEvent } from '@amplitude/analytics-browser'
import { useUser } from 'utils/useUser'
import UpgradeModal from 'components/UpgradeModal'
import { Agent, Output } from 'types'
import { updateUserWordsGenerated } from 'utils/db'
import { EventName, track } from 'utils/segment'

const Home: NextPage = () => {
  const [prompt, setPrompt] = useState('')
  const [generateIsLoading, setGenerateIsLoading] = useState(false)
  const [outputs, setOutputs] = useState<Output[]>([])
  const formRef = useRef<any>(null)
  const messageElementRef = useRef<any>(null)
  const bottomElementRef = useRef<any>(null)
  const { user, usageDetails } = useUser()
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [reader, setReader] = useState<ReadableStreamDefaultReader<
    Uint8Array
  > | null>(null)
  const inputRef = useRef<any>()

  const scrollToBottom = () => {
    bottomElementRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (outputs.length > 0) scrollToBottom()
  }, [messageElementRef?.current?.clientHeight])

  const getOutput = async (prompt: string, userId: string) => {
    try {
      const response = await fetch('/api/outputs', {
        method: 'post',
        body: JSON.stringify({
          id: 'ask-inkey',
          inputs: {
            prompt,
          },
          userId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      await readStreamIntoOutput(response.body!)
    } catch (error) {
      toast.error(
        'Oh no! Something went wrong. \nPlease refresh the page and try again.',
      )
      return []
    }
  }

  const disabled = () => {
    return generateIsLoading || prompt.trim() == ''
  }

  async function readStreamIntoOutput(
    readableStream: ReadableStream<Uint8Array>,
  ) {
    const reader = readableStream.getReader()
    setReader(reader)
    const decoder = new TextDecoder()
    setOutputs((outputs) => [...outputs, { agent: Agent.INKEY, text: '' }])
    let newOutput = ''
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      newOutput += decoder.decode(value)
      setOutputs((outputs) => {
        return [
          ...outputs.slice(0, outputs.length - 1),
          { agent: Agent.INKEY, text: newOutput },
        ]
      })
    }
    setReader(null)
    track(EventName.OUTPUT_GENERATED, {
      output: newOutput,
    })
    await updateUserWordsGenerated(
      user!.uid,
      Math.round(newOutput.split(' ').length),
    )
  }

  const getPrompt = (outputs: Output[]) => {
    let output = ''
    for (let i = 0; i < outputs.length; i++) {
      const text = outputs[i].text
      output += text + '\n\n'
    }

    return output
  }

  const handleSubmit = async (prompt: string) => {
    if (
      usageDetails &&
      usageDetails?.monthly_usage >=
        usageDetails?.monthly_allowance + usageDetails.bonus_allowance &&
      usageDetails?.monthly_allowance >= 0 // negative allowance means unlimited
    ) {
      setShowUpgradeModal(true)
      return
    }
    track(EventName.PROMPT_SUBMITTED, {
      prompt,
    })
    logEvent(`ask-inkey`)
    let context: Output[] = [...outputs, { agent: Agent.USER, text: prompt }]
    setOutputs((outputs) => {
      return [...outputs, { agent: Agent.USER, text: prompt }]
    })
    setPrompt('')
    inputRef.current.style.height = '24px'
    setGenerateIsLoading(true)
    await getOutput(getPrompt(context), user!.uid)
    setGenerateIsLoading(false)
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 13 && !event.shiftKey && prompt.trim() == '') {
      event.preventDefault()
    }
    if (event.keyCode === 13 && !event.shiftKey && !disabled()) {
      // User pressed Enter key
      event.preventDefault()
      formRef.current.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true }),
      )
    }
  }

  return (
    <ProtectedPage>
      <Page title="Ask Inkey - Inkey">
        {showUpgradeModal && (
          <UpgradeModal setShowUpgradeModal={setShowUpgradeModal} />
        )}
        <div className="pb-16 lg:pb-0">
          <div
            className="flex flex-col items-center text-sm h-full"
            ref={messageElementRef}
          >
            {outputs.map((output, index) => {
              if (output.agent == Agent.USER) {
                return (
                  <div
                    key={index}
                    className="w-full border-b border-black/10 text-gray-800 group"
                  >
                    <div className="flex flex-col md:flex-row text-base gap-4 md:gap-6 m-auto md:max-w-2xl xl:max-w-3xl p-4 md:py-6 lg:px-0">
                      <div className="w-[30px] flex flex-col relative items-end">
                        <div className="relative h-[30px] w-[30px] md:p-1 rounded-sm flex items-center md:justify-center">
                          <div className="text-2xl">🧑</div>
                        </div>
                      </div>
                      <div className="relative flex flex-col w-full lg:w-[calc(100%-115px)]">
                        <div className="min-h-[20px] flex flex-col items-start gap-4">
                          <div className="break-words whitespace-pre-wrap w-full">
                            {output.text}
                          </div>
                        </div>
                        <div className="flex self-end lg:self-center justify-center mt-2 gap-4 lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(output.text)
                              toast.success('Copied to clipboard!')
                            }}
                            className="p-1 rounded-md hover:bg-gray-100 text-gray-500"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 48 48"
                              fill="currentColor"
                              className="w-5 h-5"
                            >
                              <path d="M9 43.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.8h3v30.15h23.7v3Zm6-6q-1.2 0-2.1-.9-.9-.9-.9-2.1v-28q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h22v-28H15v28Zm0 0v-28 28Z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              } else {
                return (
                  <div
                    key={index}
                    className="w-full border-b border-black/10 text-gray-800 group bg-gray-100"
                  >
                    <div className="flex flex-col md:flex-row text-base gap-4 md:gap-6 m-auto md:max-w-2xl xl:max-w-3xl p-4 md:py-6 lg:px-0">
                      <div className="w-[30px] flex flex-col relative items-end">
                        <div className="relative h-[30px] w-[30px] md:p-1 rounded-sm flex items-center md:justify-center">
                          <svg
                            viewBox="0 0 390 475"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
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
                        </div>
                      </div>
                      <div className="relative flex flex-col w-full lg:w-[calc(100%-115px)]">
                        <div className="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap">
                          <div className="break-words whitespace-pre-wrap w-full">
                            {output.text}
                          </div>
                        </div>
                        <div className="flex self-end lg:self-center justify-center mt-2 gap-4 lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(output.text)
                              toast.success('Copied to clipboard!')
                            }}
                            className="p-1 rounded-md hover:bg-gray-200 text-gray-500"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 48 48"
                              fill="currentColor"
                              className="w-5 h-5"
                            >
                              <path d="M9 43.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.8h3v30.15h23.7v3Zm6-6q-1.2 0-2.1-.9-.9-.9-.9-2.1v-28q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h22v-28H15v28Zm0 0v-28 28Z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            })}
            {outputs.length == 0 && (
              <div className="w-full md:max-w-2xl lg:max-w-3xl flex flex-col px-6 md:gap-4">
                <div className="mt-[5vh] md:mt-[15vh] flex flex-col items-center gap-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 390 475"
                    fill="none"
                    className="w-8"
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
                  <h1 className="text-2xl font-semibold leading-7 text-gray-900 md:text-3xl">
                    Ask Inkey
                  </h1>
                  <p className="text-center max-w-sm md:text-lg">
                    Inkey is an artificially intelligent assistant. You can ask
                    Inkey to do just about anything! Click one of the examples
                    below to try it out.
                  </p>
                </div>
                <div className="flex flex-col md:flex-row items-center md:items-start text-center gap-6 pt-6">
                  <div className="flex flex-col gap-3.5 flex-1 w-full max-w-md md:max-w-none md:w-auto">
                    <div className="text-2xl">☀️</div>
                    <h2 className="text-lg">Examples</h2>
                    <ul className="flex flex-col gap-3.5">
                      <button
                        className="w-full bg-gray-100 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900"
                        onClick={() => {
                          setPrompt('Write an essay about investing money.')
                          handleSubmit('Write an essay about investing money.')
                        }}
                      >
                        "Write an essay about investing money." →
                      </button>
                      <button
                        className="w-full bg-gray-100 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900"
                        onClick={() => {
                          setPrompt(
                            "List 5 ideas for a college student's date?",
                          )
                          handleSubmit(
                            "List 5 ideas for a college student's date?",
                          )
                        }}
                      >
                        "List 5 date ideas for a college student." →
                      </button>
                      <button
                        className="w-full bg-gray-100 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900"
                        onClick={() => {
                          setPrompt('How do I make an HTTP request in Python?')
                          handleSubmit(
                            'How do I make an HTTP request in Python?',
                          )
                        }}
                      >
                        "How do I make an HTTP request in Python?" →
                      </button>
                    </ul>
                  </div>
                  <div className="flex flex-col gap-3.5 flex-1 w-full max-w-md">
                    <div className="text-2xl">☢️</div>
                    <h2 className="text-lg font-normal">Limitations</h2>
                    <ul className="flex flex-col gap-3.5">
                      <li className="w-full bg-gray-100 p-3 rounded-md">
                        May occasionally generate incorrect information
                      </li>
                      <li className="w-full bg-gray-100 p-3 rounded-md">
                        Quotes and references may be incorrect
                      </li>
                      <li className="w-full bg-gray-100 p-3 rounded-md">
                        Grammar checks may be incorrect
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            <div
              className="w-full h-48 flex-shrink-0"
              ref={bottomElementRef}
            ></div>
          </div>
          <div
            className="fixed lg:pl-56 pb-16 lg:pb-0 bottom-0 left-0 w-full"
            style={{
              backgroundImage:
                'linear-gradient(180deg,hsla(0,0%,100%,0) 0%,#fff 50%)',
            }}
          >
            <form
              ref={formRef}
              className="stretch mx-2 flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6"
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(prompt.trim())
              }}
            >
              <div className="relative flex h-full flex-1 flex-col">
                {outputs.length != 0 && !generateIsLoading && (
                  <div className="w-full flex gap-2 justify-center mb-3">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        setOutputs([])
                      }}
                      className="flex justify-center gap-2 items-center p-2 border rounded bg-white hover:bg-gray-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 48 48"
                      >
                        <path
                          xmlns="http://www.w3.org/2000/svg"
                          d="M13.05 42q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.5H9.5q-.65 0-1.075-.425Q8 9.65 8 9q0-.65.425-1.075Q8.85 7.5 9.5 7.5h7.9q0-.65.425-1.075Q18.25 6 18.9 6h10.2q.65 0 1.075.425.425.425.425 1.075h7.9q.65 0 1.075.425Q40 8.35 40 9q0 .65-.425 1.075-.425.425-1.075.425h-.55V39q0 1.2-.9 2.1-.9.9-2.1.9Zm0-31.5V39h21.9V10.5Zm5.3 22.7q0 .65.425 1.075.425.425 1.075.425.65 0 1.075-.425.425-.425.425-1.075V16.25q0-.65-.425-1.075-.425-.425-1.075-.425-.65 0-1.075.425-.425.425-.425 1.075Zm8.3 0q0 .65.425 1.075.425.425 1.075.425.65 0 1.075-.425.425-.425.425-1.075V16.25q0-.65-.425-1.075-.425-.425-1.075-.425-.65 0-1.075.425-.425.425-.425 1.075Zm-13.6-22.7V39 10.5Z"
                        />
                      </svg>
                      Clear chat
                    </button>
                  </div>
                )}
                <div className="flex flex-col w-full py-2 pl-3 md:py-3 md:pl-4 relative border border-black/10 bg-white rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] md:max-w-2xl lg:max-w-2xl xl:max-w-3xl m-auto">
                  <textarea
                    ref={inputRef}
                    autoFocus
                    tabIndex={0}
                    style={{
                      maxHeight: '200px',
                      height: 24,
                    }}
                    rows={1}
                    placeholder=""
                    className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0"
                    value={prompt}
                    onChange={(e) => {
                      setPrompt(e.target.value)
                    }}
                    onInput={(event) => {
                      const target = event.target as HTMLTextAreaElement
                      target.style.height = ''
                      target.style.height = target.scrollHeight + 'px'
                    }}
                    onKeyDown={handleKeyDown}
                  ></textarea>
                  <button
                    type="submit"
                    className="absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 disabled:hover:bg-transparent"
                    disabled={disabled()}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      className="h-4 w-4 rotate-90"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
            <div className="px-3 pt-2 pb-3 text-center text-xs text-black/50 md:px-4 md:pt-3 md:pb-6">
              This feature is experimental. Please use with caution.
            </div>
          </div>
        </div>
      </Page>
    </ProtectedPage>
  )
}

export default Home
