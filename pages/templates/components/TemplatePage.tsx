import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import ProtectedPage from '../../../components/ProtectedPage'
import Output from './Output'
import OutputEmptyState from './OutputEmptyState'
import Page from '../../../components/Page'
import { Template, TemplateId } from '../templates'
import { logEvent } from '@amplitude/analytics-browser'
import { useUser } from 'utils/useUser'
import { capitalizeFirstLetter } from 'utils/helpers'
import UpgradeModal from 'components/UpgradeModal'
import {
  CodingLanguages,
  EssayLength,
  PoemType,
  PointOfView,
  QuoteMap,
  SummaryMethod,
} from 'types'
import { tones } from './constants'
import { updateUserWordsGenerated } from 'utils/db'
import { EventName, track } from 'utils/segment'

const TemplatePage = ({
  id,
  icon,
  svgIcon,
  title,
  description,
  promptCharacterLimit = 500,
  inputRows = 4,
  promptName = 'Prompt',
  promptPlaceholder = '',
  quotePlaceholder = '"The true sign of intelligence is not knowledge but imagination." - Albert Einstein',
  supportExamplePrompt = true,
  supportQuotes = false,
  supportRequestedLength = true,
  supportTone = true,
  supportPointOfView = true,
  supportCodingLanguages = false,
  supportContent = false,
  contentCharacterLimit = 500,
}: Template) => {
  const [prompt, setPrompt] = useState('')
  const [output, setOutput] = useState('')
  const [numberOfCharacters, setNumberOfCharacters] = useState(0)
  const [numberOfContentCharacters, setNumberOfContentCharacters] = useState(0)
  const [generateIsLoading, setGenerateIsLoading] = useState(false)
  const [addQuotes, setAddQuotes] = useState(false)
  const [quotes, setQuotes] = useState<QuoteMap>({})
  const [requestedLength, setRequestedLength] = useState(EssayLength.SHORT)
  const [tone, setTone] = useState('professional')
  const [codingLanguage, setCodingLanguage] = useState(CodingLanguages.PYTHON)
  const [pointOfView, setPointOfView] = useState(PointOfView.THIRD)
  const [summaryMethod, setSummaryMethod] = useState(SummaryMethod.PARAGRAPH)
  const [poemType, setPoemType] = useState(PoemType.FREE_VERSE)
  const { user, usageDetails, subscription } = useUser()
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [content, setContent] = useState('')
  const bottomElementRef = useRef<any>(null)
  const textElementRef = useRef<any>(null)
  const [reader, setReader] = useState<ReadableStreamDefaultReader<
    Uint8Array
  > | null>(null)

  const scrollToBottom = () => {
    bottomElementRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (output.length > 0) scrollToBottom()
  }, [textElementRef?.current?.clientHeight])

  const getAndSetOutput = async (prompt: string, userId: string) => {
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
          ...(supportRequestedLength && { length: requestedLength }),
          ...(supportTone && { tone: tone }),
          ...(supportPointOfView && { point_of_view: pointOfView }),
          ...(supportCodingLanguages && { coding_language: codingLanguage }),
          ...(supportContent && content.trim() && { content: content.trim() }),
          ...(id == TemplateId.SUMMARIZER_ID && {
            summary_method: summaryMethod,
          }),
          ...(id == TemplateId.POEM_ID && { poem_type: poemType }),
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

  async function readStreamIntoOutput(
    readableStream: ReadableStream<Uint8Array>,
  ) {
    const reader = readableStream.getReader()
    setReader(reader)
    const decoder = new TextDecoder()
    let newOutput = ''
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      newOutput += decoder.decode(value)
      setOutput(newOutput)
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

  const handleGenerateClick = async () => {
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
    logEvent(`generate-${id}`)
    const toastId = toast.loading('✍️')
    setGenerateIsLoading(true)
    await getAndSetOutput(prompt, user!.uid)
    setGenerateIsLoading(false)
    toast.dismiss(toastId)
  }

  const clearInputs = () => {
    setPrompt('')
    setNumberOfCharacters(0)
    setRequestedLength(EssayLength.SHORT)
    setTone('professional')
    setPointOfView(PointOfView.THIRD)
    setSummaryMethod(SummaryMethod.PARAGRAPH)
    setCodingLanguage(CodingLanguages.PYTHON)
    setAddQuotes(false)
    setQuotes({})
    setContent('')
    setNumberOfContentCharacters(0)
  }

  const clearOutputs = () => {
    setOutput('')
  }

  const disabled = () => {
    let isThereEmptyQuote = false

    for (const key in Object.keys(quotes)) {
      if (quotes[key].value.trim() == '') isThereEmptyQuote = true
    }

    return !prompt || isThereEmptyQuote || generateIsLoading
  }

  return (
    <ProtectedPage>
      <Page title={title + ' - Inkey'}>
        {showUpgradeModal && (
          <UpgradeModal setShowUpgradeModal={setShowUpgradeModal} />
        )}
        <div className="relative flex-1 w-full min-h-screen">
          <div className="overflow-y-auto xl:mb-0 xl:absolute xl:w-1/2 xl:inset-y-0 xl:left-0 xl:border-r xl:border-gray-200 bg-gray-50">
            <form
              onSubmit={(e) => {
                e.preventDefault()
              }}
              className="flex flex-col h-full"
            >
              <div className="sticky top-0 flex items-center px-6 py-4 bg-white border-b border-gray-200 z-10">
                <div className="mr-6">
                  <div className="flex items-center justify-center w-10 h-10 text-gray-500">
                    <div className="text-3xl flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-xl ring-2 ring-offset-2 ring-gray-100 group-hover:ring-gray-200 group-focus:ring-gray-300 group-hover:bg-white">
                      {icon && icon}
                      {svgIcon && svgIcon}
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate">
                    {title}
                  </h2>
                  <p className="w-full text-sm text-gray-500">{description}</p>
                </div>
              </div>
              <div className="p-3 xl:p-6 xl:pb-28 flex-1 space-y-6 flex flex-col content-start">
                <div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-end items-center">
                      <div className="flex-grow mb-1 flex items-center">
                        <label className="text-sm font-medium text-gray-700">
                          {promptName}
                        </label>
                      </div>
                      <div className="flex items-center justify-end px-3 py-2 text-xs text-gray-600">
                        <span className="text-xs">
                          {numberOfCharacters}/{promptCharacterLimit}
                        </span>
                      </div>
                    </div>
                    <div className="relative flex items-center mb-2">
                      <textarea
                        autoFocus
                        maxLength={promptCharacterLimit}
                        rows={inputRows}
                        placeholder={promptPlaceholder}
                        className="px-3 py-2 w-full block text-sm text-gray-600 placeholder-gray-400 transition-shadow duration-150 ease-in-out bg-white border border-gray-200 rounded shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500"
                        value={prompt}
                        onChange={(e) => {
                          setPrompt(e.target.value)
                          setNumberOfCharacters(e.target.value.length)
                        }}
                        onClick={() => track(EventName.PROMPT_INPUT_CLICKED)}
                      ></textarea>
                    </div>
                    {supportExamplePrompt && (
                      <div>
                        <button
                          className="inline-flex items-center overflow-hidden ease-in-out outline-none focus:outline-none focus:ring-2 justify-center transition-all duration-150 relative font-medium rounded-lg focusRing text-gray-700 bg-white border border-black-300 shadow-sm hover:text-gray-500 selectionRing active:bg-gray-50 active:text-gray-800 px-3 py-2 text-sm leading-3"
                          type="button"
                          onClick={() => {
                            track(EventName.TRY_EXAMPLE_PROMPT_BUTTON_CLICKED)
                            setPrompt(promptPlaceholder)
                            setNumberOfCharacters(promptPlaceholder.length)
                          }}
                        >
                          Try the example prompt
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {id == TemplateId.POEM_ID && (
                  <div>
                    <label
                      htmlFor="poem-type"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Poem type
                    </label>
                    <select
                      id="poem-type"
                      value={poemType}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(event) => {
                        track(EventName.POEM_TYPE_SELECTED, {
                          value: event.target.value,
                        })
                        const poemType = event.target.value as PoemType
                        setPoemType(poemType)
                      }}
                    >
                      {Object.values(PoemType).map((value, index) => {
                        return (
                          <option key={index} value={value}>
                            {value[0].toUpperCase() + value.slice(1)}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                )}
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
                        track(EventName.LENGTH_SELECTED, {
                          value: event.target.value,
                        })
                        if (!subscription?.role) {
                          setRequestedLength(EssayLength.SHORT)
                        } else {
                          const length = event.target.value as EssayLength
                          setRequestedLength(length)
                        }
                      }}
                    >
                      <option value={EssayLength.SHORT}>
                        Short (~250 words)
                      </option>
                      <option value={EssayLength.LONG}>
                        Long (~500 words){!subscription?.role && ' 💎 Premium'}
                      </option>
                    </select>
                  </div>
                )}
                {supportTone && (
                  <div>
                    <label
                      htmlFor="tone"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Tone
                    </label>
                    <select
                      id="tone"
                      value={tone}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(event) => {
                        track(EventName.TONE_SELECTED, {
                          value: event.target.value,
                        })
                        setTone(event.target.value)
                      }}
                    >
                      {Object.keys(tones).map((key, index) => {
                        return (
                          <option key={index} value={key}>
                            {key[0].toUpperCase() + key.slice(1)}:{' '}
                            {tones[key as keyof typeof tones]}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                )}
                {supportPointOfView && (
                  <div>
                    <label
                      htmlFor="point-of-view"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Point of view
                    </label>
                    <select
                      id="point-of-view"
                      value={pointOfView}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(event) => {
                        track(EventName.POV_SELECTED, {
                          value: event.target.value,
                        })
                        const pov = event.target.value as PointOfView
                        setPointOfView(pov)
                      }}
                    >
                      {Object.values(PointOfView).map((value, index) => {
                        return (
                          <option key={index} value={value}>
                            {value[0].toUpperCase() + value.slice(1)}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                )}
                {id == TemplateId.SUMMARIZER_ID && (
                  <div>
                    <label
                      htmlFor="summary-method"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Summary method
                    </label>
                    <select
                      id="summary-method"
                      value={summaryMethod}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(event) => {
                        track(EventName.SUMMARY_METHOD_SELECTED, {
                          value: event.target.value,
                        })
                        const method = event.target.value as SummaryMethod
                        setSummaryMethod(method)
                      }}
                    >
                      {Object.values(SummaryMethod).map((value, index) => {
                        return (
                          <option key={index} value={value}>
                            {value[0].toUpperCase() + value.slice(1)}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                )}
                {supportCodingLanguages && (
                  <div>
                    <label
                      htmlFor="coding-language"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Coding language
                    </label>
                    <select
                      id="coding-language"
                      value={codingLanguage}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(event) => {
                        track(EventName.CODING_LANGUAGE_SELECTED, {
                          value: event.target.value,
                        })
                        const codingLanguage = event.target
                          .value as CodingLanguages
                        setCodingLanguage(codingLanguage)
                      }}
                    >
                      {Object.keys(CodingLanguages).map((key, index) => {
                        return (
                          <option key={index} value={key}>
                            {capitalizeFirstLetter(
                              CodingLanguages[
                                key as keyof typeof CodingLanguages
                              ],
                            )}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                )}
                {supportQuotes && (
                  <div className="flex flex-col">
                    <div className="inline-flex items-center mb-2">
                      <label
                        htmlFor="add-quotes"
                        className="block text-sm mr-1 font-medium text-gray-900 dark:text-white"
                      >
                        Add quotes
                      </label>
                    </div>
                    <div className="inline-flex relative items-center">
                      <input
                        id="add-quotes"
                        type="checkbox"
                        className="sr-only peer"
                        checked={addQuotes}
                        readOnly={true}
                      />
                      <div
                        onClick={(e) => {
                          track(EventName.ADD_QUOTES_TOGGLE_CLICKED)
                          if (addQuotes) setQuotes({})
                          else setQuotes({ '0': { value: '' } })
                          setAddQuotes(!addQuotes)
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
                        <div
                          key={index}
                          className="relative flex items-center mb-2"
                        >
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
                      {Object.keys(quotes).length < 4 && (
                        <button
                          type="button"
                          disabled={Object.keys(quotes).length > 3}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={() => {
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
                      )}
                      {Object.keys(quotes).length > 1 && (
                        <button
                          type="button"
                          disabled={Object.keys(quotes).length < 2}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={() => {
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
                      )}
                    </div>
                  </div>
                )}
                {supportContent && (
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-end items-center">
                      <div className="flex-grow mb-1 flex items-center">
                        <div className="inline-flex items-center mb-1">
                          <label
                            htmlFor="content"
                            className="block text-sm mr-1 font-medium text-gray-900"
                          >
                            Content to include
                          </label>
                        </div>
                      </div>
                      <div className="flex items-center justify-end px-3 py-2 text-xs text-gray-600">
                        <span className="text-xs">
                          {numberOfContentCharacters}/{contentCharacterLimit}
                        </span>
                      </div>
                    </div>
                    <div className="relative flex items-center mb-2">
                      <textarea
                        maxLength={contentCharacterLimit}
                        rows={5}
                        placeholder={
                          'Write content you want incorporated here.'
                        }
                        className="px-3 py-2 w-full block text-sm text-gray-600 placeholder-gray-400 transition-shadow duration-150 ease-in-out bg-white border border-gray-200 rounded shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500"
                        value={content}
                        onChange={(e) => {
                          setContent(e.target.value)
                          setNumberOfContentCharacters(e.target.value.length)
                        }}
                        onClick={() =>
                          track(EventName.CONTENT_TO_INCLUDE_INPUT_CLICKED)
                        }
                      ></textarea>
                    </div>
                  </div>
                )}
              </div>
              <div className="pointer-events-none xl:bottom-0 xl:sticky xl:w-full xl:left-0 xl:z-20">
                <div className="flex items-center justify-between px-3 pb-3 border-b border-gray-200 pointer-events-auto xl:py-3 bg-gray-50 xl:bg-white xl:border-t xl:border-0 xl:border-gray-200 xl:px-6">
                  <button
                    className="inline-flex items-center overflow-hidden ease-in-out outline-none focus:outline-none focus:ring-2 justify-center transition-all duration-150 relative font-medium rounded-lg focusRing text-gray-700 bg-white border border-black-300 shadow-sm hover:text-gray-500 selectionRing active:bg-gray-50 active:text-gray-800 px-3 py-2 text-sm leading-3"
                    type="button"
                    onClick={() => {
                      track(EventName.CLEAR_INPUTS_BUTTON_CLICKED)
                      clearInputs()
                    }}
                  >
                    Clear inputs
                  </button>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className={classNames(
                        'inline-flex items-center overflow-hidden ease-in-out outline-none focus:outline-none focus:ring-2 justify-center transition-all duration-150 relative font-medium rounded-lg focusRing text-gray-700 bg-white border border-black-300 shadow-sm hover:text-gray-500 selectionRing active:bg-gray-50 active:text-gray-800 px-3 py-2 text-base w-full',
                        {
                          'cursor-not-allowed': !generateIsLoading,
                        },
                      )}
                      disabled={!generateIsLoading}
                      onClick={() => {
                        track(EventName.CANCEL_BUTTON_CLICKED)
                        reader?.cancel()
                      }}
                    >
                      <div>Cancel</div>
                    </button>
                    <button
                      type="submit"
                      className={classNames(
                        'inline-flex items-center ease-in-out outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 justify-center transition-all duration-150 relative font-medium rounded-lg text-white shadow-sm px-6 py-4 text-base w-full',
                        {
                          'active:bg-blue-800 hover:bg-blue-400 bg-blue-500': !disabled(),
                          'bg-blue-400 hover:bg-blue-300 cursor-not-allowed': disabled(),
                        },
                      )}
                      disabled={disabled()}
                      onClick={() => {
                        track(EventName.GENERATE_BUTTON_CLICKED)
                        handleGenerateClick()
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
                    onClick={() => {
                      track(EventName.CLEAR_OUTPUT_BUTTON_CLICKED)
                      clearOutputs()
                    }}
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
                  bottomElementRef={bottomElementRef}
                  textElementRef={textElementRef}
                />
              ) : (
                <OutputEmptyState />
              )}
            </div>
          </div>
        </div>
      </Page>
    </ProtectedPage>
  )
}

export default TemplatePage
