import classNames from 'classnames'
import Head from 'next/head'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import ProtectedPage from '../../../components/ProtectedPage'
import Navigation from '../../../components/Navigation'
import Output from './Output'
import OutputEmptyState from './OutputEmptyState'

interface Output {
  text: string
}

const TemplatePage = ({
  id,
  icon,
  title,
  subtitle,
  promptPlaceholder,
}: {
  id: string
  icon: string
  title: string
  subtitle: string
  promptPlaceholder: string
}) => {
  const [prompt, setPrompt] = useState('')
  const [output, setOutput] = useState('')
  const [numberOfCharacters, setNumberOfCharacters] = useState(0)
  const [generateIsLoading, setGenerateIsLoading] = useState(false)
  const auth = getAuth()
  const [user] = useAuthState(auth)

  const getOutputs = async (prompt: string, userId: string) => {
    try {
      const response = await fetch('/api/outputs', {
        method: 'post',
        body: JSON.stringify({
          id: id,
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

  async function readStreamIntoOutput(readableStream: any) {
    const reader = readableStream.getReader()

    const decoder = new TextDecoder()
    let newOutput = ''
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      newOutput += decoder.decode(value)
      setOutput(newOutput)
    }
  }

  const handleGenerate = async () => {
    const toastId = toast.loading('Hold tight! This could take a minute.')
    setGenerateIsLoading(true)
    await getOutputs(prompt, user!.uid)
    setGenerateIsLoading(false)
    toast.dismiss(toastId)
  }

  const clearInputs = () => {
    setPrompt('')
    setNumberOfCharacters(0)
  }

  const clearOutputs = () => {
    setOutput('')
  }

  return (
    <ProtectedPage>
      <Head>
        <title>{title} - Ghostwritten</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <Toaster />
        <Navigation />
        <div className="relative lg:ml-72">
          <div className="relative flex-1 w-full min-h-screen">
            <div className="overflow-y-auto xl:mb-0 xl:absolute xl:w-1/2 xl:inset-y-0 xl:left-0 xl:border-r xl:border-gray-200 bg-gray-50">
              <form className="flex flex-col h-full">
                <div className="sticky top-0 flex items-center px-6 py-4 bg-white border-b border-gray-200 z-10">
                  <div className="mr-6">
                    <div className="flex items-center justify-center w-10 h-10 text-gray-500">
                      <div className="text-3xl flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-xl ring-2 ring-offset-2 ring-gray-100 group-hover:ring-gray-200 group-focus:ring-gray-300 group-hover:bg-white">
                        {icon}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate">
                      {title}
                    </h2>
                    <p className="w-full text-sm text-gray-500">{subtitle}</p>
                  </div>
                </div>
                <div className="p-3 xl:p-6 xl:pb-28 flex-1 space-y-6">
                  <div>
                    <div className="mb-6 last:mb-1">
                      <div className="flex flex-col flex-1">
                        <div className="flex justify-end items-center">
                          <div className="flex-grow mb-1 flex items-center">
                            <label className="text-sm font-medium dark:text-gray-300 text-gray-700">
                              Prompt
                            </label>
                          </div>
                          <div className="flex items-center justify-end px-3 py-2 text-xs text-gray-600">
                            <span className="text-xs">
                              {numberOfCharacters}/{250}
                            </span>
                          </div>
                        </div>
                        <div className="relative flex items-center">
                          <textarea
                            maxLength={250}
                            rows={4}
                            placeholder={promptPlaceholder}
                            className="px-3 py-2 w-full block text-sm text-gray-600 placeholder-gray-400 transition-shadow duration-150 ease-in-out bg-white border border-gray-200 rounded shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500"
                            value={prompt}
                            onChange={(e) => {
                              setPrompt(e.target.value)
                              setNumberOfCharacters(e.target.value.length)
                            }}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="inline-flex items-center overflow-hidden ease-in-out outline-none focus:outline-none focus:ring-2 focus:ring-offset-2inline-flex justify-center transition-all duration-150 relative font-medium rounded-lg focusRing text-gray-700 bg-white border border-black-300 shadow-sm hover:text-gray-500 selectionRing active:bg-gray-50 active:text-gray-800 px-3 py-2 text-sm leading-3"
                    type="button"
                    onClick={() => {
                      setPrompt(promptPlaceholder)
                      setNumberOfCharacters(promptPlaceholder.length)
                    }}
                  >
                    Try the example prompt
                  </button>
                </div>
                <div className="pointer-events-none xl:bottom-0 xl:sticky xl:w-full xl:left-0 xl:z-20">
                  <div className="flex items-center justify-between px-3 pb-3 border-b border-gray-200 pointer-events-auto xl:py-3 bg-gray-50 xl:bg-white xl:border-t xl:border-0 xl:border-gray-200 xl:px-6">
                    <button
                      className="inline-flex items-center overflow-hidden ease-in-out outline-none focus:outline-none focus:ring-2 focus:ring-offset-2inline-flex justify-center transition-all duration-150 relative font-medium rounded-lg focusRing text-gray-700 bg-white border border-black-300 shadow-sm hover:text-gray-500 selectionRing active:bg-gray-50 active:text-gray-800 px-3 py-2 text-sm leading-3"
                      type="button"
                      onClick={clearInputs}
                    >
                      Clear inputs
                    </button>
                    <div className="flex">
                      <button
                        className={classNames(
                          'inline-flex items-center ease-in-out outline-none focus:outline-none focus:ring-2 focus:ring-offset-2inline-flex justify-center transition-all duration-150 relative font-medium rounded-lg focusRing text-white shadow-sm selectionRing px-6 py-4 text-base w-full',
                          {
                            'active:bg-blue-800 hover:bg-blue-400 bg-blue-500':
                              prompt && !generateIsLoading,
                            'bg-blue-400 hover:bg-blue-300 cursor-not-allowed':
                              !prompt || generateIsLoading,
                          },
                        )}
                        disabled={!prompt || generateIsLoading}
                        onClick={(event) => {
                          event.preventDefault()
                          handleGenerate()
                        }}
                      >
                        <div
                          className={classNames({
                            invisible: generateIsLoading,
                          })}
                        >
                          Generate
                        </div>
                        <svg
                          role="status"
                          className={classNames(
                            'absolute inline w-6 h-6 text-white animate-spin',
                            {
                              invisible: !generateIsLoading,
                            },
                          )}
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="overflow-y-auto xl:absolute xl:w-1/2 xl:inset-y-0 xl:right-0">
              <div className="mb-24 lg:mb-auto">
                <div className="sticky top-0 z-10 flex items-center px-3 bg-white border-b border-gray-200">
                  <nav
                    className="flex flex-grow py-1 space-x-3"
                    aria-label="Tabs"
                  >
                    <button className="relative transition-all duration-150 before:transition-all before:duration-150 before:absolute before:inset-0 whitespace-nowrap py-2 px-3 text-xs font-medium before:bg-gray-100 before:rounded-lg before:scale-100 before:opacity-100 text-gray-600">
                      <span className="relative">Output</span>
                    </button>
                  </nav>
                  <div>
                    <button
                      onClick={clearOutputs}
                      className="relative transition-all duration-150 before:transition-all before:duration-150 before:absolute before:inset-0 px-3 py-2 text-xs font-medium leading-4 text-gray-400 hover:text-gray-600 before:bg-gray-100 before:rounded-lg before:scale-50 before:opacity-0 hover:before:scale-100 hover:before:opacity-100"
                    >
                      <span className="relative">Clear</span>
                    </button>
                  </div>
                </div>
                {output.length > 0 ? (
                  <Output
                    toast={toast}
                    text={output}
                    isLoading={generateIsLoading}
                  />
                ) : (
                  <OutputEmptyState />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedPage>
  )
}

export default TemplatePage
