import type { NextPage } from 'next'
import ProtectedPage from '../../components/ProtectedPage'
import Page from '../../components/Page'
import { useState, useRef, KeyboardEvent, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import toast from 'react-hot-toast'

enum Agent {
  USER = 'user',
  INKEY = 'inkey',
}

interface Output {
  agent: Agent
  text: string
}

const Home: NextPage = () => {
  const [prompt, setPrompt] = useState('')
  const [generateIsLoading, setGenerateIsLoading] = useState(false)
  const [outputs, setOutputs] = useState<Output[]>([])
  const auth = getAuth()
  const [user] = useAuthState(auth)
  const formRef = useRef<any>(null)
  const messageElementRef = useRef<any>(null)

  const scrollToBottom = () => {
    messageElementRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (outputs.length > 0) scrollToBottom()
  }, [outputs])

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

      await readStreamIntoOutput(response.body)
    } catch (error) {
      console.log(error)
      toast.error(
        'Oh no! Something went wrong. \nPlease refresh the page and try again.',
      )
      return []
    }
  }

  const disabled = () => {
    return generateIsLoading || prompt.trim() == ''
  }

  async function readStreamIntoOutput(readableStream: any) {
    const reader = readableStream.getReader()
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
  }

  const handleSubmit = async () => {
    setOutputs((outputs) => [...outputs, { agent: Agent.USER, text: prompt }])
    const input = prompt
    setPrompt('')
    const toastId = toast.loading('')
    setGenerateIsLoading(true)
    await getOutput(input, user!.uid)
    setGenerateIsLoading(false)
    toast.dismiss(toastId)
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 13 && !event.shiftKey && prompt.trim() == '') {
      event.preventDefault()
    }
    if (event.keyCode === 13 && !event.shiftKey && !disabled()) {
      // User pressed Enter key
      event.preventDefault()
      const target = event.target as HTMLTextAreaElement
      target.style.height = '24px'
      formRef.current.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true }),
      )
    }
  }

  return (
    <ProtectedPage>
      <Page title={'Ask Inkey - Inkey'}>
        <div className="w-full h-full relative pb-16 lg:pb-0">
          <div className="flex h-full flex-1 flex-col lg:pl-56">
            <main className="relative h-full w-full transition-width flex flex-col items-stretch flex-1">
              <div className="flex-1 overflow-hidden">
                <div className="flex flex-col items-center text-sm h-full">
                  {outputs.map((output, index) => {
                    if (output.agent == Agent.USER) {
                      return (
                        <div
                          key={index}
                          className="w-full border-b border-black/10 text-gray-800 group"
                        >
                          <div className="text-base gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0">
                            <div className="w-[30px] flex flex-col relative items-end">
                              <div className="relative h-[30px] w-[30px] p-1 rounded-sm text-white flex items-center justify-center">
                                <svg
                                  viewBox="0 0 162 157"
                                  fill="black"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                >
                                  <path
                                    xmlns="http://www.w3.org/2000/svg"
                                    d="M81 75.8454C69.8625 75.8454 60.75 72.306 53.6625 65.2271C46.575 58.1482 43.0312 49.0467 43.0312 37.9227C43.0312 26.7987 46.575 17.6973 53.6625 10.6184C60.75 3.53945 69.8625 0 81 0C92.1375 0 101.25 3.53945 108.337 10.6184C115.425 17.6973 118.969 26.7987 118.969 37.9227C118.969 49.0467 115.425 58.1482 108.337 65.2271C101.25 72.306 92.1375 75.8454 81 75.8454V75.8454ZM15.1875 157C10.9688 157 7.38281 155.525 4.42969 152.576C1.47656 149.626 0 146.045 0 141.831V133.235C0 126.83 1.60312 121.353 4.80937 116.802C8.01562 112.251 12.15 108.796 17.2125 106.436C28.5187 101.38 39.3609 97.5878 49.7391 95.0596C60.1172 92.5314 70.5375 91.2673 81 91.2673C91.4625 91.2673 101.841 92.5735 112.134 95.186C122.428 97.7984 133.228 101.549 144.534 106.436C149.766 108.796 153.984 112.251 157.191 116.802C160.397 121.353 162 126.83 162 133.235V141.831C162 146.045 160.523 149.626 157.57 152.576C154.617 155.525 151.031 157 146.812 157H15.1875Z"
                                    fill="black"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="relative flex w-full flex-col lg:w-[calc(100%-115px)]">
                              <div className="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap">
                                {output.text}
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
                          <div className="text-base gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0">
                            <div className="w-[30px] flex flex-col relative items-end">
                              <div className="relative h-[30px] w-[30px] p-1 rounded-sm text-white flex items-center justify-center">
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
                            <div className="relative flex w-full flex-col lg:w-[calc(100%-115px)]">
                              <div className="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap">
                                <div className="markdown prose break-words light">
                                  <p>{output.text}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  })}
                  {outputs.length == 0 && (
                    <div className="text-gray-800 w-full md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col px-6 pt-6">
                      <h1 className="sm:text-3xl sm:truncate text-2xl font-bold lg:mt-[20vh] ml-auto mr-auto">
                        Ask Inkey
                      </h1>
                      <div className="flex items-start text-center gap-3.5 pt-8">
                        <div className="flex flex-col gap-3.5 flex-1">
                          <svg
                            stroke="currentColor"
                            fill="none"
                            stroke-width="1.5"
                            viewBox="0 0 24 24"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="h-6 w-6 m-auto"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line
                              x1="4.22"
                              y1="4.22"
                              x2="5.64"
                              y2="5.64"
                            ></line>
                            <line
                              x1="18.36"
                              y1="18.36"
                              x2="19.78"
                              y2="19.78"
                            ></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line
                              x1="4.22"
                              y1="19.78"
                              x2="5.64"
                              y2="18.36"
                            ></line>
                            <line
                              x1="18.36"
                              y1="5.64"
                              x2="19.78"
                              y2="4.22"
                            ></line>
                          </svg>
                          <h2 className="text-lg font-normal">Examples</h2>
                          <ul className="flex flex-col gap-3.5">
                            <button className="w-full bg-gray-100 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900">
                              "Explain quantum computing in simple terms" →
                            </button>
                            <button className="w-full bg-gray-100 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900">
                              "Got any creative ideas for a 10 year old’s
                              birthday?" →
                            </button>
                            <button className="w-full bg-gray-100 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900">
                              "How do I make an HTTP request in Javascript?" →
                            </button>
                          </ul>
                        </div>
                        <div className="hidden flex flex-col gap-3.5 flex-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="h-6 w-6 m-auto"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                            ></path>
                          </svg>
                          <h2 className="text-lg font-normal">Capabilities</h2>
                          <ul className="flex flex-col gap-3.5">
                            <li className="w-full bg-gray-100 dark:bg-white/5 p-3 rounded-md">
                              Remembers what user said earlier in the
                              conversation
                            </li>
                            <li className="w-full bg-gray-100 dark:bg-white/5 p-3 rounded-md">
                              Allows user to provide follow-up corrections
                            </li>
                            <li className="w-full bg-gray-100 dark:bg-white/5 p-3 rounded-md">
                              Trained to decline inappropriate requests
                            </li>
                          </ul>
                        </div>
                        <div className="flex flex-col gap-3.5 flex-1">
                          <svg
                            stroke="currentColor"
                            fill="none"
                            stroke-width="1.5"
                            viewBox="0 0 24 24"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="h-6 w-6 m-auto"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                          </svg>
                          <h2 className="text-lg font-normal">Limitations</h2>
                          <ul className="flex flex-col gap-3.5">
                            <li className="w-full bg-gray-100 dark:bg-white/5 p-3 rounded-md">
                              May occasionally generate incorrect information
                            </li>
                            <li className="w-full bg-gray-100 dark:bg-white/5 p-3 rounded-md">
                              May occasionally produce harmful instructions or
                              biased content
                            </li>
                            <li className="w-full bg-gray-100 dark:bg-white/5 p-3 rounded-md">
                              Limited knowledge of world and events after 2021
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  <div
                    className="w-full h-48 flex-shrink-0"
                    ref={messageElementRef}
                  ></div>
                </div>
              </div>
              <div
                className="fixed lg:pl-56 pb-16 lg:pb-0 bottom-0 left-0 w-full"
                style={{
                  backgroundImage:
                    'linear-gradient(180deg,hsla(0,0%,100%,0) 13.94%,#fff 54.73%)',
                }}
              >
                <form
                  ref={formRef}
                  className="stretch mx-2 flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6"
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                  }}
                >
                  <div className="relative flex h-full flex-1 flex-col">
                    <div className="flex flex-col w-full py-2 pl-3 md:py-3 md:pl-4 relative border border-black/10 bg-white rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] md:max-w-2xl lg:max-w-2xl xl:max-w-3xl m-auto">
                      <textarea
                        tabIndex={0}
                        style={{
                          maxHeight: '200px',
                          height: 24,
                          overflowY: 'hidden',
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
                  Experimental: Inkey sometimes gives untrue answers. Please use
                  with caution.
                </div>
              </div>
            </main>
          </div>
        </div>
      </Page>
    </ProtectedPage>
  )
}

export default Home
