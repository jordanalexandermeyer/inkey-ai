import axios from 'axios'
import classNames from 'classnames'
import { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import Navigation from '../../components/Navigation'
import ProtectedPage from '../../components/ProtectedPage'
import { PERSUASIVE_ESSAY_ID } from '../../lib/constants'
import Output from './components/Output'
import TemplateTextArea from './components/TemplateTextArea'
import toast, { Toaster } from 'react-hot-toast'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

const getOutputs = async (
  prompt: string,
  numberOfOutputs: number,
  userId: string,
) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: '/api/outputs',
      data: {
        id: PERSUASIVE_ESSAY_ID,
        inputs: {
          prompt,
        },
        numberOfOutputs,
        userId,
      },
    })

    return data.completions
  } catch (error) {
    toast.error(
      'Oh no! Something went wrong. \nPlease refresh the page and try again.',
    )
    return []
  }
}

interface Output {
  text: string
}

const CommonAppEssay: NextPage = () => {
  const [prompt, setPrompt] = useState('')
  const [outputs, setOutputs] = useState<Output[]>([])
  const [numberOfOutputs, setNumberOfOutputs] = useState(1)
  const [generateIsLoading, setGenerateIsLoading] = useState(false)
  const auth = getAuth()
  const [user] = useAuthState(auth)

  const handleGenerate = async () => {
    setGenerateIsLoading(true)
    const toastId = toast.loading('Hold tight! This could take a minute.')
    const responseOutputs = await getOutputs(prompt, numberOfOutputs, user!.uid)
    for (let i = 0; i < responseOutputs.length; i++) {
      outputs.unshift(responseOutputs[i])
    }
    setGenerateIsLoading(false)
    toast.dismiss(toastId)
  }

  const clearInputs = () => {
    setPrompt('')
  }

  const clearOutputs = () => {
    setOutputs([])
  }

  const canSubmit = prompt && numberOfOutputs

  return (
    <ProtectedPage>
      <Head>
        <title>Persuasive Essay - Ghostwritten</title>
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
                        📝
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate">
                      Persuasive Essay
                    </h2>
                    <p className="w-full text-sm text-gray-500">
                      Write a prompt for a persuasive essay and a unique, never
                      before seen essay will be written.
                    </p>
                  </div>
                </div>
                <div className="p-3 xl:p-6 xl:pb-28 flex-1 space-y-6">
                  <TemplateTextArea
                    label="Prompt"
                    placeholder="Write an essay persuading readers that working remotely is superior to working in-person."
                    maxLength={500}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  <button
                    className="inline-flex items-center overflow-hidden ease-in-out outline-none focus:outline-none focus:ring-2 focus:ring-offset-2inline-flex justify-center transition-all duration-150 relative font-medium rounded-lg focusRing text-gray-700 bg-white border border-black-300 shadow-sm hover:text-gray-500 selectionRing active:bg-gray-50 active:text-gray-800 px-3 py-2 text-sm leading-3"
                    type="button"
                    onClick={() =>
                      setPrompt(
                        'Write an essay persuading readers that working remotely is superior to working in-person.',
                      )
                    }
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
                      <input
                        type="number"
                        className="max-w-[80px] mr-3 border focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 block w-full py-2 pr-3 text-gray-700 placeholder-gray-400 transition-shadow duration-150 ease-in-out bg-white border-gray-200 rounded-md shadow-sm outline-none resize-none focus:outline-none focus:ring-blue-700 focus:border-blue-700"
                        max={2}
                        min={1}
                        value={numberOfOutputs}
                        onChange={(e) =>
                          setNumberOfOutputs(Number(e.target.value))
                        }
                      />
                      <button
                        className={classNames(
                          'inline-flex items-center ease-in-out outline-none focus:outline-none focus:ring-2 focus:ring-offset-2inline-flex justify-center transition-all duration-150 relative font-medium rounded-lg focusRing text-white shadow-sm selectionRing px-6 py-4 text-base w-full',
                          {
                            'active:bg-blue-800 hover:bg-blue-400 bg-blue-500':
                              canSubmit && !generateIsLoading,
                            'bg-blue-400 hover:bg-blue-300 cursor-not-allowed':
                              !canSubmit || generateIsLoading,
                          },
                        )}
                        disabled={!canSubmit || generateIsLoading}
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
                      <span className="relative">Outputs</span>
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
                {outputs.length > 0 ? (
                  outputs.map((output) => {
                    return <Output text={output.text} />
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center my-20 py-40 xl:inset-0 xl:absolute xl:mt-0">
                    <div className="max-w-lg relative py-3 pl-8 space-x-2 text-xs text-gray-400 rounded-md ring-1 ring-gray-200">
                      <div className="absolute inset-y-0 left-0 flex items-center justify-center w-8 bg-gray-100 rounded-l-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="block w-4 h-4 text-gray-500 "
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <div className="flex-grow pl-2 pr-4 text-left">
                        <div className="mb-1 text-sm font-medium text-gray-500">
                          Answer the prompts
                        </div>
                        <div>
                          Get the best results by trying multiple inputs and of
                          varying lengths.
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedPage>
  )
}

export default CommonAppEssay
