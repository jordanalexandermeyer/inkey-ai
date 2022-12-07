import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import ProtectedPage from '../../../components/ProtectedPage'
import Output from './Output'
import OutputEmptyState from './OutputEmptyState'
import Page from '../../../components/Page'
import ReactTooltip from 'react-tooltip'
import { Template } from '../templates'

export interface Output {
  text: string
}

export enum EssayLength {
  SHORT = 'short',
  LONG = 'long',
}

export interface Quote {
  value: string
}

export interface QuoteMap {
  [key: string]: Quote
}

const TemplatePage = ({
  id,
  icon,
  title,
  description,
  promptPlaceholder,
  quotePlaceholder,
  supportQuotes,
  supportReferences,
  supportRequestedLength,
}: Template) => {
  const [prompt, setPrompt] = useState('')
  const [output, setOutput] = useState('')
  const [numberOfCharacters, setNumberOfCharacters] = useState(0)
  const [generateIsLoading, setGenerateIsLoading] = useState(false)
  const [addQuotes, setAddQuotes] = useState(false)
  const [quotes, setQuotes] = useState<QuoteMap>({})
  const [generateReferences, setGenerateReferences] = useState(false)
  const [requestedLength, setRequestedLength] = useState(EssayLength.SHORT)
  const textEditorReference: React.Ref<any> = useRef(null)
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
          ...(supportQuotes && addQuotes && { quotes: quotes }),
          ...(supportReferences && { references: generateReferences }),
          ...(supportRequestedLength && { length: requestedLength }),
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
    textEditorReference.current.focus()
    toast.dismiss(toastId)
  }

  const clearInputs = () => {
    setPrompt('')
    setAddQuotes(false)
    setQuotes({ '0': { value: '' } })
    setGenerateReferences(false)
    setRequestedLength(EssayLength.SHORT)
    setNumberOfCharacters(0)
  }

  const clearOutputs = () => {
    setOutput('')
  }

  return (
    <ProtectedPage>
      <Page title={title}>
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
                    <p className="w-full text-sm text-gray-500">
                      {description}
                    </p>
                  </div>
                </div>
                <div className="p-3 xl:p-6 xl:pb-28 flex-1 space-y-6 flex flex-col content-start">
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
                              {numberOfCharacters}/{500}
                            </span>
                          </div>
                        </div>
                        <div className="relative flex items-center">
                          <textarea
                            maxLength={500}
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
                  <div>
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
                  {supportRequestedLength && (
                    <div>
                      <label
                        htmlFor="length"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Length
                      </label>
                      <select
                        id="length"
                        value={requestedLength}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(event) => {
                          const length = event.target.value as EssayLength
                          setRequestedLength(length)
                        }}
                      >
                        <option value={EssayLength.SHORT}>
                          Short (~250 words)
                        </option>
                        <option value={EssayLength.LONG}>
                          Long (~500 words)
                        </option>
                      </select>
                    </div>
                  )}
                  {supportQuotes && (
                    <div className="flex flex-col">
                      <div className="inline-flex items-center mb-2">
                        <label
                          htmlFor="length"
                          className="block text-sm mr-1 font-medium text-gray-900 dark:text-white"
                        >
                          Add quotes
                        </label>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 48 48"
                          fill="grey"
                          className="w-5"
                          data-tip="Add real quotes to have them included in the generated essay."
                          data-type="info"
                        >
                          <path
                            xmlns="http://www.w3.org/2000/svg"
                            d="M22.65 34h3V22h-3ZM24 18.3q.7 0 1.175-.45.475-.45.475-1.15t-.475-1.2Q24.7 15 24 15q-.7 0-1.175.5-.475.5-.475 1.2t.475 1.15q.475.45 1.175.45ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 23.95q0-4.1 1.575-7.75 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24.05 4q4.1 0 7.75 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm.05-3q7.05 0 12-4.975T41 23.95q0-7.05-4.95-12T24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24.05 41ZM24 24Z"
                          />
                        </svg>
                        <ReactTooltip effect="solid" place="right" />
                      </div>
                      <div className="inline-flex relative items-center">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={addQuotes}
                          readOnly={true}
                        />
                        <div
                          onClick={(e) => {
                            setAddQuotes(!addQuotes)
                            setQuotes({ '0': { value: '' } })
                          }}
                          className="cursor-pointer w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                        ></div>
                      </div>
                    </div>
                  )}
                  {addQuotes && (
                    <div className="flex flex-col">
                      <div className="flex justify-end items-center">
                        <div className="flex-grow mb-1 flex items-center">
                          <label className="text-sm font-medium dark:text-gray-300 text-gray-700">
                            Quotes
                          </label>
                        </div>
                        <div className="flex items-center justify-end px-3 py-2 text-xs text-gray-600">
                          <span className="text-xs">
                            {Object.keys(quotes).length}/{4}
                          </span>
                        </div>
                      </div>
                      {Object.keys(quotes).map((index) => {
                        return (
                          <div className="relative flex items-center mb-2">
                            <input
                              maxLength={250}
                              placeholder={quotePlaceholder || ''}
                              className="px-3 py-2 w-full block text-sm text-gray-600 placeholder-gray-400 transition-shadow duration-150 ease-in-out bg-white border border-gray-200 rounded shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500"
                              value={quotes[index].value}
                              onChange={(e) => {
                                setQuotes((quotes) => {
                                  const newQuote = quotes
                                  delete newQuote[index]
                                  return {
                                    [index]: {
                                      value: e.target.value,
                                    },
                                    ...newQuote,
                                  }
                                })
                              }}
                            ></input>
                          </div>
                        )
                      })}
                      <div className="flex justify-center">
                        <button
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={() => {
                            if (Object.keys(quotes).length > 3) return
                            setQuotes((quotes) => {
                              return {
                                ...quotes,
                                [String(Object.keys(quotes).length)]: {
                                  value: '',
                                },
                              }
                            })
                          }}
                        >
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              xmlns="http://www.w3.org/2000/svg"
                              d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={() => {
                            if (Object.keys(quotes).length < 2) return
                            setQuotes((quotes) => {
                              const newQuotes = quotes
                              delete newQuotes[
                                String(Object.keys(quotes).length - 1)
                              ]
                              return { ...newQuotes }
                            })
                          }}
                        >
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              xmlns="http://www.w3.org/2000/svg"
                              d="M10 25.5v-3h28v3Z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                  {supportReferences && (
                    <div className="flex flex-col">
                      <div className="inline-flex items-center mb-2">
                        <label
                          htmlFor="length"
                          className="block text-sm mr-1 font-medium text-gray-900 dark:text-white"
                        >
                          Generate references
                        </label>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 48 48"
                          fill="red"
                          className="w-5"
                          data-tip="This feature is experimental and may add fake data and references."
                          data-type="error"
                        >
                          <path
                            xmlns="http://www.w3.org/2000/svg"
                            d="M2 42 24 4l22 38Zm5.2-3h33.6L24 10Zm17-2.85q.65 0 1.075-.425.425-.425.425-1.075 0-.65-.425-1.075-.425-.425-1.075-.425-.65 0-1.075.425Q22.7 34 22.7 34.65q0 .65.425 1.075.425.425 1.075.425Zm-1.5-5.55h3V19.4h-3Zm1.3-6.1Z"
                          />
                        </svg>
                        <ReactTooltip effect="solid" place="right" />
                      </div>
                      <div className="inline-flex relative items-center">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={generateReferences}
                          readOnly={true}
                        />
                        <div
                          onClick={(e) => {
                            setGenerateReferences(!generateReferences)
                          }}
                          className="cursor-pointer w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                        ></div>
                      </div>
                    </div>
                  )}
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
                    textEditorReference={textEditorReference}
                  />
                ) : (
                  <OutputEmptyState />
                )}
              </div>
            </div>
          </div>
        </div>
      </Page>
    </ProtectedPage>
  )
}

export default TemplatePage
